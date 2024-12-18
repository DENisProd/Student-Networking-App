package ru.denis.finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.Match;
import ru.denis.finder.model.UserProfile;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByUser1AndUser2(UserProfile user1, UserProfile user2);
    @Query("SELECT m FROM Match m WHERE (m.user1.userId = :userId OR m.user2.userId = :userId) ORDER BY m.matchedAt ASC")
    List<Match> findByUserId(@Param("userId") Long userId);
}
