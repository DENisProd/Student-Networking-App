package ru.darksecrets.post.dto;

import java.util.List;

public record PostCreateDTO (
        String title,
        String content,
        List<Long> categories,
        Long organizationId
) {
}
