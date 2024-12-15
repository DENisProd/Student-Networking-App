package ru.denis.category.models;

import jakarta.persistence.*;
import lombok.Data;
import ru.denis.category.CategoryType;

@Entity
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 25)
    private String name;

    @Column(length = 6)
    private String color = "FFFFFF";
    @Lob
    @Column(columnDefinition = "TEXT")
    private String icon = "";
    private Boolean isCustomize = true;
    private Boolean isModerated = false;

    @Enumerated(EnumType.STRING)
    private CategoryType type;
}
