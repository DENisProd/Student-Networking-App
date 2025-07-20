package ru.denis.finder.dto.chat;

import ru.denis.finder.model.chat.Message;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageDTO(
        UUID id,
        UUID chatId,
        Long senderId,
        String content,
        String type,
        LocalDateTime sentAt
) {
    public static MessageDTO fromMessage(Message message) {
        return new MessageDTO(
                message.getId(),
                message.getChat().getId(),
                message.getSenderId(),
                message.getContent(),
                message.getType().toString(),
                message.getSentAt()
        );
    }
}
