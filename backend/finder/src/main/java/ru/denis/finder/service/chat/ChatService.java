package ru.denis.finder.service.chat;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.denis.finder.dto.chat.ChatDTO;
import ru.denis.finder.dto.chat.ChatMemberDTO;
import ru.denis.finder.dto.chat.MessageDTO;
import ru.denis.finder.dto.user.UserProfileChatDTO;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.model.chat.Chat;
import ru.denis.finder.model.chat.ChatMember;
import ru.denis.finder.model.chat.ChatType;
import ru.denis.finder.repository.chat.ChatMemberRepository;
import ru.denis.finder.repository.chat.ChatRepository;
import ru.denis.finder.service.UserProfileService;
import ru.denis.media.FileSize;

import javax.print.attribute.standard.MediaSize;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatMemberRepository chatMemberRepository;
    private final UserProfileService userProfileService;

     public Chat createChat(Chat chat) {
         return chatRepository.save(chat);
     }

     public Optional<Chat> getChatById(UUID chatId) {
         return chatRepository.findById(chatId);
     }

    public Page<ChatDTO> getUserChats(Long userId, Pageable pageable) {
        List<ChatMember> chatMembers = chatMemberRepository.findByUserId(userId);
        List<UUID> chatIds = chatMembers.stream()
                .map(cm -> cm.getChat().getId())
                .toList();

        Page<Chat> chats = chatRepository.findByIdIn(chatIds, pageable);

        // Получаем всех участников для всех чатов одним запросом
        List<ChatMember> allMembers = chatMemberRepository.findByChatIdIn(chatIds);
        Map<UUID, List<ChatMember>> chatIdToMembers = allMembers.stream()
                .collect(Collectors.groupingBy(cm -> cm.getChat().getId()));

        return chats.map(chat -> new ChatDTO(
                chat.getId(),
                chat.getName(),
                chat.getIcon(),
                chat.getType().toString(),
                chatIdToMembers.getOrDefault(chat.getId(), List.of()).stream()
                        .map(member -> new ChatMemberDTO(
                                member.getId(),
                                member.getChat().getId(),
                                member.getUserId(),
                                member.getUserProfile() != null ? new UserProfileChatDTO(
                                        member.getUserProfile().getId(),
                                        member.getUserProfile().getUserId(),
                                        member.getUserProfile().getName(),
                                        member.getUserProfile().getSex(),
                                        member.getUserProfile().getLastActivityAt(),
                                        member.getUserProfile().getMediaList().stream().filter(media -> media.getSize().equals(FileSize.SMALL)).toList().get(0)
                                ) : null,
                                member.getJoinedAt()
                        ))
                        .toList(),
                null
        ));
    }

    @Transactional
    public Chat getOrCreatePrivateChat(Long senderId, Long recipientProfileId) {
        // Проверим, существует ли уже такой 1-на-1 чат
        List<Chat> senderChats = chatRepository.findPrivateChatsByUserId(senderId);
        for (Chat chat : senderChats) {
            if (chat.getType() == ChatType.PRIVATE) {
                // Получаем всех участников этого чата
                List<ChatMember> members = chatMemberRepository.findByChatId(chat.getId());
                Set<Long> memberIds = members.stream()
                        .map(cm -> cm.getUserProfile().getId())
                        .collect(Collectors.toSet());
                if (memberIds.contains(recipientProfileId) && memberIds.contains(senderId) && memberIds.size() == 2) {
                    return chat; // уже есть такой чат
                }
            }
        }

        UserProfile senderProfile = userProfileService.getByUserIdWithoutCategories(senderId);
        UserProfile recipientProfile = userProfileService.getByIdWithoutCategories(recipientProfileId);

        // Создаём новый чат
        Chat chat = new Chat();
        chat.setType(ChatType.PRIVATE);
        chat.setName(null); // для личных чатов можно не задавать имя
        chat = chatRepository.save(chat);

        ChatMember senderMember = new ChatMember(null, chat, senderId, senderProfile, LocalDateTime.now());
        ChatMember recipientMember = new ChatMember(null, chat, recipientProfile.getUserId(), recipientProfile, LocalDateTime.now());
        chatMemberRepository.saveAll(List.of(senderMember, recipientMember));

        return chat;
    }

     public void deleteChat(UUID chatId) {
         chatRepository.deleteById(chatId);
     }
}
