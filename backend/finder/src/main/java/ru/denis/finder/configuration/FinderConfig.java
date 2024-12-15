package ru.denis.finder.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class FinderConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
