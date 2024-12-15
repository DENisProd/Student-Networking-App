package ru.denis.finder.dto.user;

import ru.denis.category.CategoryDTO;
import ru.denis.finder.model.Media;
import ru.denis.finder.model.SexType;

import java.util.List;

public record UserProfileResponseDTO(
        Long id,
        Long userId,
        String name,
        String about,
        String description,
        Integer age,
        SexType sex,
        List<CategoryDTO> interests,
        CategoryDTO target,
        List<Media> mediaList
) {
}
