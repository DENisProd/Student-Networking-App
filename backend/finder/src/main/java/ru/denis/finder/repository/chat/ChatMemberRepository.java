package ru.denis.finder.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.chat.ChatMember;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {
    List<ChatMember> findByUserId(Long userId);
    List<ChatMember> findByChatId(UUID chatId);
    boolean existsByUserIdAndChatId(Long userId, UUID chatId);

    List<ChatMember> findByChatIdIn(List<UUID> chatIds);
}
