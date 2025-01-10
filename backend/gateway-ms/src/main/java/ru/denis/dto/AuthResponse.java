package ru.denis.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

public record AuthResponse (
        ProfileResponse data
) {

}
