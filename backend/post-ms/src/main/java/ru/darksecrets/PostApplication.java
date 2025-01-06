package ru.darksecrets;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.darksecrets.post.config.EnvInitializer;

@SpringBootApplication
public class PostApplication
{
    public static void main( String[] args )
    {
        new EnvInitializer();
        SpringApplication.run(PostApplication.class, args);
    }
}
