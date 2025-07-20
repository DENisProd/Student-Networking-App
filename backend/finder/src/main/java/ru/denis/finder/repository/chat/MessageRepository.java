package ru.denis.finder.repository.chat;

import com.jayway.jsonpath.JsonPath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.chat.Message;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
    Page<Message> findByChatIdOrderBySentAtAsc(UUID chatId, Pageable pageable);

    List<Message> findByChatId(UUID chatId);

    Optional<Message> findFirstByChatIdOrderBySentAtDesc(UUID chatId);
}
