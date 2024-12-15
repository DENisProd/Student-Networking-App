package ru.denis.media.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ru.denis.media.FileSize;
import ru.denis.media.MediaDTO;
import ru.denis.media.MediaResponse;
import ru.denis.media.dto.FileDTO;
import ru.denis.media.models.*;
import ru.denis.media.models.File;
import ru.denis.media.repository.FileRepository;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaService {
    @Value("${s3.bucketName}")
    private String bucketName;

    private final MessageSenderService messageSenderService;
    private final FileRepository fileRepository;

    private final ImageProcessorService imageProcessorService;
    private final VideoProcessorService videoProcessorService;
    private final MinioService utils;

    @Async
    public void saveMedia(InputStream inputStream, MediaTypes mediaType, FileOrientation orientation, String callbackTopic, Long entityId) throws IOException {
        int[] smallResolution = getResolution(orientation, 320, 180);
        int[] largeResolution = getResolution(orientation, 1280, 720);

        String smallFileName = generateFileName(smallResolution);
        String largeFileName = generateFileName(largeResolution);

        MediaDTO[] response = new MediaDTO[2];

        byte[] data = toByteArray(inputStream);

        try (ByteArrayInputStream smallStream = new ByteArrayInputStream(data);
             ByteArrayInputStream largeStream = new ByteArrayInputStream(data)) {

            if (mediaType == MediaTypes.IMAGE) {
                var smallFile = saveImage(smallStream, smallFileName + ".jpg", smallResolution, FileSize.SMALL);
                var largeFile = saveImage(largeStream, largeFileName + ".jpg", largeResolution, FileSize.LARGE);

                response[0] = new MediaDTO(smallFile, FileSize.SMALL);
                response[1] = new MediaDTO(largeFile, FileSize.LARGE);
            } else if (mediaType == MediaTypes.VIDEO) {
                var smallFile = saveVideo(smallStream, smallFileName + ".mp4", smallResolution, FileSize.SMALL);
                var largeFile = saveVideo(largeStream, largeFileName + ".mp4", largeResolution, FileSize.LARGE);

                response[0] = new MediaDTO(smallFile, FileSize.SMALL);
                response[1] = new MediaDTO(largeFile, FileSize.LARGE);
            } else {
                throw new IllegalArgumentException("Unsupported media type: " + mediaType);
            }
        }

        MediaResponse mediaResponse = MediaResponse.builder()
                .mediaList(Arrays.stream(response).toList())
                .entityId(entityId)
                .build();

        messageSenderService.sendMessage(callbackTopic, mediaResponse);
    }


    private String saveImage(InputStream inputStream, String fileName, int[] resolution, FileSize size) throws IOException {
        ByteArrayOutputStream imageOutputStream = new ByteArrayOutputStream();
        imageProcessorService.resizeAndCompress(inputStream, imageOutputStream, resolution[0], resolution[1]);

        utils.uploadFile(imageOutputStream, fileName, bucketName, "image/jpeg");
        createMedia(fileName, MediaTypes.IMAGE, size);

        return fileName;
    }

    private byte[] toByteArray(InputStream inputStream) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        byte[] temp = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(temp)) != -1) {
            buffer.write(temp, 0, bytesRead);
        }
        return buffer.toByteArray();
    }

    private String saveVideo(InputStream inputStream, String fileName, int[] resolution, FileSize size) {
        try {
            Path tempFile = videoProcessorService.saveToTempFile(inputStream, "video_input", ".mp4");
            Path filePath = Files.createTempFile("video_small", ".mp4");

            videoProcessorService.processVideo(tempFile.toString(), filePath.toString(), resolution);
            log.info("End processing file: " + filePath.toString());

            utils.uploadFile(Files.newInputStream(filePath), fileName, bucketName, "video/mp4");
            createMedia(fileName, MediaTypes.VIDEO, size);

            videoProcessorService.deleteTempFiles(tempFile, filePath);

            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Error processing video", e);
        }
    }

    private void createMedia(String name, MediaTypes type, FileSize size) {
        File newFile = new File();
        newFile.setFilename(name);
        newFile.setStatus(FileStatus.COMPRESSED);
        newFile.setType(type);
        newFile.setSize(size);

        fileRepository.save(newFile);
    }

    public FileDTO getMedia(String name) {
        File existFile = fileRepository.findByFilename(name).orElseThrow(() -> new NoSuchElementException("File does not exists"));
        byte[] file = utils.getFile(bucketName, name);

        return new FileDTO(file, existFile.getType());
    }

    private int[] getResolution(FileOrientation orientation, int landscapeWidth, int portraitHeight) {
        return orientation == FileOrientation.LANDSCAPE ? new int[]{landscapeWidth, portraitHeight} : new int[]{portraitHeight, landscapeWidth};
    }

    private String generateFileName(int[] resolution) {
        return UUID.randomUUID() + "_" + resolution[0] + "x" + resolution[1];
    }
}
