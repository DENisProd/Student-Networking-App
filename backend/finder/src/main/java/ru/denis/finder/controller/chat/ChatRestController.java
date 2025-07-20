package ru.denis.finder.controller.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.denis.finder.dto.chat.ChatDTO;
import ru.denis.finder.dto.chat.request.CreateChatRequest;
import ru.denis.finder.model.chat.Chat;
import ru.denis.finder.service.chat.ChatService;
import ru.denis.finder.service.chat.MessageService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/profiles/chat")
public class ChatRestController {
    private final ChatService chatService;
    private final MessageService messageService;

    @GetMapping("/")
    public ResponseEntity<?> getChats(
            @RequestHeader(value = "X-User-ID") Long userId,
            Pageable pageable) {
        var chats = chatService.getUserChats(userId, pageable);
        chats = chats.map(chat -> {
            var lastMessage = messageService.getLastMessageByChatId(chat.id());
            return new ChatDTO(
                    chat.id(),
                    chat.name(),
                    chat.icon(),
                    chat.type(),
                    chat.members(),
                    lastMessage
            );
        });

        return ResponseEntity.ok(chats);
    }

    @PostMapping("/")
    public ResponseEntity<?> createChat(@RequestBody CreateChatRequest chat) {
        Chat createdChat = chatService.getOrCreatePrivateChat(chat.senderId(), chat.recipientId());
        return ResponseEntity.ok(createdChat);
    }
}
