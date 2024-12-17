package ru.denis.finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.Match;
import ru.denis.finder.model.UserProfile;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByUser1AndUser2(UserProfile user1, UserProfile user2);
    List<Match> findByUser1Id (Long user1Id);
}
