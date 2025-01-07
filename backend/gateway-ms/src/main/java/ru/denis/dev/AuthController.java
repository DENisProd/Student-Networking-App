package ru.denis.dev;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2/auth")
@RequiredArgsConstructor
public class AuthController {
//    private final AuthService jwtService;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam("userId") Long userId, ServerHttpResponse response) {
//        String accessToken = jwtService.generateToken(userId);
//
//        ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
//                .httpOnly(true)
//                .secure(false)
//                .path("/")
//                .maxAge(3600)
//                .build();
//
//        response.addCookie(cookie);
//
//        return ResponseEntity.ok("Access token успешно создан и установлен в cookie");
//    }
}
