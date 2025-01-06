package ru.denis.category.configuration;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvInitializer {

    static {
        String envFile = ".env";

        Dotenv dotenv = Dotenv.configure()
                .filename(envFile)
                .load();

        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        System.out.println("Переменные окружения успешно загружены из " + envFile);
    }
}
