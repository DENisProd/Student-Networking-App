package ru.denis.media.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.denis.media.dto.FileDTO;
import ru.denis.media.models.FileOrientation;
import ru.denis.media.models.MediaTypes;
import ru.denis.media.service.FileProcessingService;
import ru.denis.media.service.MediaService;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/v1/media")
@AllArgsConstructor
@CrossOrigin(value = "*")
public class MediaController {
    private final FileProcessingService fileProcessingService;
    private final MediaService mediaService;

    @PostMapping()
    public ResponseEntity<?> saveMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") MediaTypes mediaType,
            @RequestParam("orientation") FileOrientation orientation,
            @RequestParam("callbackTopic") String callbackTopic,
            @RequestParam("entityId") String entityId
    ) throws IOException {
        try (InputStream inputStream = file.getInputStream()) {
            fileProcessingService.addFileForProcessing(inputStream, mediaType, orientation, callbackTopic, Long.valueOf(entityId));
            return ResponseEntity.accepted().build();
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }

    @GetMapping("/{filename}")
    public ResponseEntity<?> getMedia(@PathVariable("filename") String filename) {
        byte[] foundedMedia;

        try {
            FileDTO foundedFile = mediaService.getMedia(filename);

            if (foundedFile == null) {
                return ResponseEntity.notFound().build();
            }

            foundedMedia = foundedFile.content();

            var mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (foundedFile.type() == MediaTypes.IMAGE) mediaType = MediaType.IMAGE_JPEG;
            if (foundedFile.type() == MediaTypes.VIDEO) mediaType = MediaType.valueOf("video/mp4");

            return ResponseEntity.ok().contentType(mediaType).body(foundedMedia);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
