package ru.denis.finder.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.denis.finder.service.MatchService;

@RestController
@RequestMapping("/api/v1/profiles/matches")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

    @GetMapping()
    public ResponseEntity<?> fetchMatchesByProfileId (@RequestParam("profile") Long profileId) {
        return ResponseEntity.ok(matchService.getMatchesByProfileId(profileId));
    }
}
