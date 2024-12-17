package ru.denis;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import javax.crypto.SecretKey;
import java.security.Key;

@Component
public class JwtUserIdFilter extends AbstractGatewayFilterFactory<JwtUserIdFilter.Config> {

    private final SecretKey secretKey = Keys.hmacShaKeyFor("mySuperSecureAndLongSecretKey123456789012".getBytes());

    public JwtUserIdFilter() {
        super(Config.class);
    }

    public static class Config {

    }

    // TODO: change method of verify to remote auth server
    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            HttpCookie accessTokenCookie = request.getCookies().getFirst("accessToken");
            if (accessTokenCookie != null) {
                String accessToken = accessTokenCookie.getValue();

                try {
                    Claims claims = Jwts.parser()
                            .verifyWith(secretKey)
                            .build()
                            .parseSignedClaims(accessToken)
                            .getPayload();

                    String userId = claims.getSubject();


                    ServerHttpRequest modifiedRequest = request.mutate()
                            .header("X-User-Id", userId)
                            .build();

                    ServerWebExchange modifiedExchange = exchange.mutate()
                            .request(modifiedRequest)
                            .build();

                    return chain.filter(modifiedExchange);
                } catch (Exception e) {
                    System.err.println("Invalid JWT Token: " + e.getMessage());
                }
            }

            return chain.filter(exchange);
        };
    }
}
