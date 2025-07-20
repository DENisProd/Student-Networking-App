package ru.denis.finder.dto.chat.request;

import java.util.UUID;

public record MessageSendRequest(
        UUID chatId,
        Long senderId,
        Long recipientId,
        String content,
        String type
) {}
