package ru.denis.finder.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private Long userId;

    @Column(length = 25)
    private String name;

    private String about = "";
    private String description = "";

    private Float rating = 0f;
    private Integer age = 0;

    private Boolean isDeleted = false;
    private Boolean isBlocked = false;
    private Boolean isOnline = false;

    @Enumerated(EnumType.STRING)
    private SexType sex = SexType.MALE;

    private Set<Long> interests = new HashSet<>();
    private Long target;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastActivityAt = LocalDateTime.now();

    @OneToMany(fetch = FetchType.EAGER)
    private List<Media> mediaList = new ArrayList<>();

    // organization, location, skills
}
