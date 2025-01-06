package ru.denis.finder.dto.react;

import ru.denis.finder.dto.match.MatchUserProfileDTO;

public record ReactResponseDTO(
        Long id,
        MatchUserProfileDTO profile
) {
}
