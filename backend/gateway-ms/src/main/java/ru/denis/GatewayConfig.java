package ru.denis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class GatewayConfig {

    @Bean
    public JwtUserIdFilter jwtUserIdFilter(WebClient.Builder webClientBuilder) {
        return new JwtUserIdFilter(webClientBuilder);
    }
}