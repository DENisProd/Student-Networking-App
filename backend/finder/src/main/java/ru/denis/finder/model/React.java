package ru.denis.finder.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class React {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserProfile profile;
    @ManyToOne
    private UserProfile targetProfile;

    private Boolean liked;

    private LocalDateTime createdAt = LocalDateTime.now();
}
