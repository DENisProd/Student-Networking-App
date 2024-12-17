package ru.denis.dev;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class AuthService {
    private final SecretKey secretKey = Keys.hmacShaKeyFor("mySuperSecureAndLongSecretKey123456789012".getBytes());
    private final long expirationMs = 3600000;

    public String generateToken(Long userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .signWith(secretKey)
                .compact();
    }
}
