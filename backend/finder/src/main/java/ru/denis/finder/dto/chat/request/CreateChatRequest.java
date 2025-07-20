package ru.denis.finder.dto.chat.request;

public record CreateChatRequest(
        Long senderId,
        Long recipientId
) {
}
