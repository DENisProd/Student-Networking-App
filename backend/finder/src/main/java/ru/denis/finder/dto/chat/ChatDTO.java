package ru.denis.finder.dto.chat;

import ru.denis.finder.model.chat.ChatMember;

import java.util.List;
import java.util.UUID;

public record ChatDTO(
        UUID id,
        String name,
        String icon,
        String type,
        List<ChatMemberDTO> members,
        MessageDTO lastMessage
) {}
