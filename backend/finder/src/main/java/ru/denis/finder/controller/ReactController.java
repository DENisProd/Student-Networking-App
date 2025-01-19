package ru.denis.finder.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.denis.finder.dto.react.ReactDTO;
import ru.denis.finder.dto.react.ReactResponseDTO;
import ru.denis.finder.model.React;
import ru.denis.finder.service.ReactService;

import java.util.List;

@RestController
@RequestMapping("/api/v2/profiles/reacts")
@RequiredArgsConstructor
public class ReactController {
    private final ReactService reactService;

    @PostMapping
    public ResponseEntity<Boolean> createReact(@RequestBody ReactDTO react) {
        Boolean createdReact = reactService.reactAtProfile(react);
        return ResponseEntity.ok(createdReact);
    }

    @GetMapping()
    public List<ReactResponseDTO> getReacts(@RequestHeader(value = "X-User-ID") Long userId) {
        return reactService.getReactsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteReact(@PathVariable Long id) {
        reactService.deleteReact(id);
    }
}
