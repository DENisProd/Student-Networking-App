package ru.denis.finder.model;

import jakarta.persistence.*;
import lombok.Data;
import ru.denis.media.FileSize;

@Entity
@Data
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;

    @Enumerated(EnumType.STRING)
    private FileSize size;
}
