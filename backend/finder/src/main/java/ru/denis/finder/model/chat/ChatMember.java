package ru.denis.finder.model.chat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.denis.finder.model.UserProfile;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMember {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserProfile userProfile;

    private LocalDateTime joinedAt = LocalDateTime.now();
}

