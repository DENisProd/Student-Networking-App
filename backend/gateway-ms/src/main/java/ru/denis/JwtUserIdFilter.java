package ru.denis;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import ru.denis.dto.AuthResponse;

@Component
public class JwtUserIdFilter extends AbstractGatewayFilterFactory<JwtUserIdFilter.Config> {
    @Value("${app.auth_server}")
    private String authServerUrl;
    private final WebClient webClient;

    public JwtUserIdFilter(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClient = webClientBuilder.baseUrl(authServerUrl).build();
    }

    public static class Config {
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            String accessToken = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (accessToken != null && accessToken.startsWith("Bearer ")) {
                accessToken = accessToken.substring(7); // Убираем "Bearer "
                System.out.println("sending request...");
                return webClient.get()
                        .uri(authServerUrl+"api/v1/user/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                        .retrieve()
                        .onStatus(
                                HttpStatusCode::is4xxClientError,  // Проверка на 4xx статус
                                response -> {
                                    if (response.statusCode() == HttpStatus.UNAUTHORIZED) {
                                        // Игнорируем ошибку 401 и продолжаем выполнение
                                        System.out.println("Unauthorized access. Ignoring error.");
                                        return Mono.empty(); // Просто игнорируем ошибку и продолжаем
                                    }
                                    System.out.println("Other error");
                                    // Если другая ошибка, выбрасываем исключение
                                    return Mono.empty();
                                })

                        .bodyToMono(AuthResponse.class)
                        .flatMap(authResponse -> {
                            System.out.println(authResponse);
                            ServerHttpRequest modifiedRequest = request.mutate()
                                    .header("X-User-Id", authResponse.data().id().toString())
                                    .header("X-User-Role", authResponse.data().role())
                                    .build();

                            ServerWebExchange modifiedExchange = exchange.mutate()
                                    .request(modifiedRequest)
                                    .build();

                            return chain.filter(modifiedExchange);
                        })
                        .onErrorResume(e -> {
                            // Логгирование ошибки, если необходимо
                            System.out.println("Error: " + e.getMessage());
                            // Продолжаем без изменения запроса
                            return chain.filter(exchange);
                        })
                        .switchIfEmpty(chain.filter(exchange));
            }

            return chain.filter(exchange);
        };
    }
}
