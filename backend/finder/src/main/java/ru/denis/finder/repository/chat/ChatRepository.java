package ru.denis.finder.repository.chat;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.model.chat.Chat;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRepository extends JpaRepository<Chat, UUID> {

    @EntityGraph(attributePaths = "members")
    Page<Chat> findByIdIn(List<UUID> ids, Pageable pageable);
    @Query("""
        SELECT cm.chat FROM ChatMember cm
        WHERE cm.userId = :userId AND cm.chat.type = 'PRIVATE'
    """)
    List<Chat> findPrivateChatsByUserId(@Param("userId") Long userId);

    @EntityGraph(attributePaths = "members")
    Optional<Chat> findWithMembersById(UUID id);
}
