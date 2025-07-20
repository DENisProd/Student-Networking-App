package ru.denis.finder.dto.chat;

import ru.denis.finder.dto.user.UserProfileChatDTO;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChatMemberDTO(
        Long id,
        UUID chatId,
        Long userId,
        UserProfileChatDTO userProfile,
        LocalDateTime joinedAt
) {
}
