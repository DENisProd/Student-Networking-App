package ru.denis.media.dto;

import ru.denis.media.models.MediaTypes;

public record FileDTO(
        byte[] content,
        MediaTypes type
) {
}
