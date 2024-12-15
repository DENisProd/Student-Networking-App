package ru.denis.media.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Slf4j
public class VideoProcessorService {
    private final int BITRATE_TRASHOLD = 800;
    @Value("${ffmpeg_path}")
    private String FFMPEG_PATH;

    public void processVideo(String inputFile, String outputFile, int[] resolution) {
        int width = resolution[0];
        int height = resolution[1];

        ProcessBuilder processBuilder = new ProcessBuilder(
                FFMPEG_PATH,
                "-y",
                "-i",
                inputFile,
                "-vf",
                "scale=(iw*sar)*max(" + width + "/(iw*sar)\\," + height + "/ih):ih*max(" + width + "/(iw*sar)\\," + height + "/ih), crop=" + width + ":" + height,
                "-crf",
                (resolution[0] < BITRATE_TRASHOLD ? 36 : 28) + "",
                "-c:v",
                "libx264",
                "-r",
                "24",
                "-b:v",
                (resolution[0] < BITRATE_TRASHOLD ? 300 : 600) + "k",
                outputFile
        );

        processBuilder.redirectErrorStream(true);
        try {
            log.info("Starting FFmpeg process with the command: {}", String.join(" ", processBuilder.command()));
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
//                log.info(line); // Логируем вывод FFmpeg
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("FFmpeg exited with error code: " + exitCode);
            }
        } catch (IOException e) {
            throw new RuntimeException("FFmpeg video processing failed", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Восстанавливаем статус прерывания
            throw new RuntimeException("Process was interrupted", e);
        }
    }

    public Path saveToTempFile(InputStream inputStream, String prefix, String suffix) throws IOException {
        Path tempFile = Files.createTempFile(prefix, suffix);
        Files.copy(inputStream, tempFile, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
        return tempFile;
    }

    public void deleteTempFiles(Path... files) {
        for (Path file : files) {
            try {
                Files.delete(file);
            } catch (IOException e) {
                // Log or ignore cleanup error
            }
        }
    }
}
