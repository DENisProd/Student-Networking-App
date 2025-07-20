package ru.denis.finder.controller.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.denis.finder.dto.chat.MessageDTO;
import ru.denis.finder.dto.chat.request.MessageSendRequest;
import ru.denis.finder.service.chat.MessageService;

import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/{chatId}/send")
    public void sendMessage(@DestinationVariable("chatId") UUID chatId, @Payload MessageSendRequest request) {
        MessageDTO saved = messageService.saveMessage(request);

        messagingTemplate.convertAndSend("/topic/chat." + chatId, saved);
    }

    @MessageMapping("/chat/{chatId}/history")
    public void getMessages(@DestinationVariable("chatId") UUID chatId) {
        List<MessageDTO> messages = messageService.getMessagesByChatId(chatId);

        messagingTemplate.convertAndSend("/topic/chat." + chatId + ".history", messages);
    }
}
