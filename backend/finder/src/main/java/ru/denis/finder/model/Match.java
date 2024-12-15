package ru.denis.finder.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserProfile user1;
    @ManyToOne
    private UserProfile user2;

    private LocalDateTime matchedAt = LocalDateTime.now();
}
