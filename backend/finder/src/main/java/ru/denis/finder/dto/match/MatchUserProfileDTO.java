package ru.denis.finder.dto.match;

import ru.denis.category.CategoryDTO;
import ru.denis.finder.model.Media;
import ru.denis.finder.model.SexType;

import java.util.List;

public record MatchUserProfileDTO(
        Long id,
        String about,
        String description,
        List<Long> interests,
        Long target,
        List<Media> mediaList
) {
}
