package ru.denis.finder.dto.user;

import ru.denis.finder.model.Media;
import ru.denis.finder.model.SexType;

import java.time.LocalDateTime;

public record UserProfileChatDTO(
        Long id,
        Long userId,
        String name,
        SexType sex,
        LocalDateTime lastActivityAt,
        Media avatar
) {
}
