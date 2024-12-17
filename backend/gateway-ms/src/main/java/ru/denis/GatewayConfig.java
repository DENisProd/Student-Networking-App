package ru.denis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public JwtUserIdFilter jwtUserIdFilter() {
        return new JwtUserIdFilter();
    }
}
