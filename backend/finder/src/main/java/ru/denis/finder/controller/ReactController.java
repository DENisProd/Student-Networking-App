package ru.denis.finder.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.denis.finder.dto.react.ReactDTO;
import ru.denis.finder.model.React;
import ru.denis.finder.service.ReactService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/profiles/reacts")
@RequiredArgsConstructor
public class ReactController {
    private final ReactService reactService;

    @PostMapping
    public ResponseEntity<Boolean> createReact(@RequestBody ReactDTO react) {
        Boolean createdReact = reactService.reactAtProfile(react);
        return ResponseEntity.ok(createdReact);
    }

    @GetMapping("/{id}")
    public React getReact(@PathVariable Long id) {
        return reactService.getReactById(id)
                .orElseThrow(() -> new RuntimeException("React not found"));
    }

    @GetMapping
    public List<React> getAllReacts() {
        return reactService.getAllReacts();
    }

    @DeleteMapping("/{id}")
    public void deleteReact(@PathVariable Long id) {
        reactService.deleteReact(id);
    }
}
