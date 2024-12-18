package ru.denis.finder.dto.match;

import ru.denis.finder.model.UserProfile;

public record MatchShortResponseDTO(
        Long id,
        MatchUserProfileDTO user
) {
}
