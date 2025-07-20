package ru.denis.finder.controller.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import ru.denis.finder.service.chat.ChatService;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
}
