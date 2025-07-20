package ru.denis.finder.model.projects;

import jakarta.persistence.*;
import lombok.Data;
import ru.denis.finder.model.UserProfile;

import java.time.LocalDate;

@Entity
@Data
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    private boolean isPublic = true;
}
