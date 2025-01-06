package ru.denis.category;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.denis.category.configuration.EnvInitializer;

@SpringBootApplication
public class CategoryApplication
{
    public static void main( String[] args )
    {
        new EnvInitializer();
        SpringApplication.run(CategoryApplication.class, args);
    }
}
