package ru.denis.category;

public record CategoryDTO(
        Long id,
        String name,
        String color,
        CategoryType type,
        String icon,
        boolean isCustomize
) {
}
