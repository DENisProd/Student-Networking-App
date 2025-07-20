package ru.denis.finder.dto.chat.response;

import ru.denis.finder.dto.chat.MessageDTO;

import java.util.List;
import java.util.UUID;

public record MessagesListResponse(
        List<MessageDTO> messages,
        int size,
        int page,
        UUID chatId
) {
}
