package ru.denis.media.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
@Slf4j
public class FFmpegChecker {
    @Value("${ffmpeg_path}")
    private String FFMPEG_PATH;

    @Bean
    private void checkFfmpeg() {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(FFMPEG_PATH, "-version");
            processBuilder.redirectErrorStream(true);
                log.info("Check FFmpeg availability : {}", String.join(" ", processBuilder.command()));
                Process process = processBuilder.start();

//            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//
//            String line;
//            while ((line = reader.readLine()) != null) {
////                System.out.println(line); // Вывод информации о ffmpeg в консоль
//            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                log.info("FFmpeg is available.");
            } else {
                throw new RuntimeException("FFmpeg is not available. Exit code: " + exitCode);
            }

        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("FFmpeg is not available.");
        }
    }
}
