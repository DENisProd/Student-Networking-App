package ru.denis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.denis.configuration.EnvInitializer;

@SpringBootApplication
public class GatewayApplication
{
    public static void main( String[] args )
    {
        new EnvInitializer();
        SpringApplication.run(GatewayApplication.class, args);
    }
}
