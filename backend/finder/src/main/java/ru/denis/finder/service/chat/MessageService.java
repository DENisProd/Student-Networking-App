package ru.denis.finder.service.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.finder.dto.chat.MessageDTO;
import ru.denis.finder.dto.chat.request.MessageSendRequest;
import ru.denis.finder.model.chat.Chat;
import ru.denis.finder.model.chat.Message;
import ru.denis.finder.model.chat.MessageType;
import ru.denis.finder.repository.chat.ChatRepository;
import ru.denis.finder.repository.chat.MessageRepository;
import ru.denis.finder.service.UserProfileService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserProfileService userProfileService;
    private final ChatService chatService;

    public Message writeMessage(Message message) {
        return messageRepository.save(message);
    }


    public MessageDTO saveMessage(MessageSendRequest request) {
        Chat chat = null;
        if (request.recipientId() != null)
            chat = chatService.getOrCreatePrivateChat(request.senderId(), request.recipientId());
        else if (request.chatId() != null)
            chat = chatService.getChatById(request.chatId())
                    .orElseThrow(() -> new IllegalArgumentException("Chat not found with ID: " + request.chatId()));

        Message message = new Message();
        message.setChat(chat);
        message.setSenderId(request.senderId());
        message.setContent(request.content());
        message.setType(MessageType.valueOf(request.type()));
        message.setSentAt(LocalDateTime.now());
        message = messageRepository.save(message);

        userProfileService.updateActivity(request.senderId(), true);

        return new MessageDTO(
                message.getId(),
                chat.getId(),
                message.getSenderId(),
                message.getContent(),
                message.getType().name(),
                message.getSentAt()
        );
    }

    public MessageDTO getLastMessageByChatId(UUID chatId) {
        return messageRepository.findFirstByChatIdOrderBySentAtDesc(chatId)
                .map(MessageDTO::fromMessage)
                .orElse(null);
    }

    public List<MessageDTO> getMessagesByChatId(UUID chatId) {
        List<Message> messages = messageRepository.findByChatId(chatId);
        return messages.stream()
                .map(MessageDTO::fromMessage)
                .toList();
    }
}
