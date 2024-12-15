package ru.denis.finder.dto.user;

import java.util.List;

public record UpdateUserProfileDTO (
        Long id,
        String name,
        String about,
        String description,
        String sex,
        Integer age,
        Long targetId,
        List<Long> interests
) {}
