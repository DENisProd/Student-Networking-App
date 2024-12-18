package ru.denis.finder.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.denis.finder.service.MatchService;

@RestController
@RequestMapping("/api/v1/profiles/matches")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @GetMapping("")
    public ResponseEntity<?> fetchMatchesByProfileId (@RequestHeader(value = "X-User-Id") Long userId) {
//        try {
            return ResponseEntity.ok(matchService.getMatchesByUserId(userId));
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
    }
}
