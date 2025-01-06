package ru.darksecrets.post.dto;

import ru.darksecrets.post.model.Reaction;
import ru.denis.category.CategoryDTO;
import ru.denis.media.MediaDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public record PostResponseDTO (
        String id,
        Long organizationId,
        String organizationName,
        String title,
        String content,
        List<MediaDTO> cover,
        LocalDateTime createdAt,
        Map<String, Integer> reactions,
        List<Reaction> userReactions,
        Integer views,
        List<CategoryDTO> categories
) {
}
