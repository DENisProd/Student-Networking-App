package ru.denis.finder.dto.react;

public record ReactDTO(
        Long userId,
        Long targetProfileId,
        Boolean isLike
) {
}
