package ru.darksecrets.post.model;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import ru.denis.media.MediaDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private Long organizationId;
    private String organizationName;
    private String title;
    private String content;
    private List<MediaDTO> cover = new ArrayList<>();
    private LocalDateTime createdAt = LocalDateTime.now();
    private List<Reaction> reactions = new ArrayList<>();
    private Set<String> uniqueViews = new HashSet<>();
    private Set<Long> categories = new HashSet<>();

    private Boolean isModerated = true;
    private Boolean isDeleted = false;
    private Float rating = 0f;
}
