package ru.denis.finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.Match;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
}
