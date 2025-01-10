package ru.denis.media;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.denis.media.configuration.EnvInitializer;

import javax.imageio.spi.IIORegistry;

@SpringBootApplication
public class MediaApplication {
    public static void main(String[] args) {
        new EnvInitializer();
        SpringApplication.run(MediaApplication.class, args);
    }
}
