package ru.denis.category;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import ru.denis.category.configuration.EnvInitializer;

@SpringBootApplication
@EnableAspectJAutoProxy
public class CategoryApplication
{
    public static void main( String[] args )
    {
        new EnvInitializer();
        SpringApplication.run(CategoryApplication.class, args);
    }
}
