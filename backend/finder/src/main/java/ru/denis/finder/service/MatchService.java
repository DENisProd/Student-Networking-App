package ru.denis.finder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.finder.model.Match;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.repository.MatchRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;

    public Match createMatch(UserProfile user1, UserProfile user2) {
        Match match = new Match();
        match.setUser1(user1);
        match.setUser2(user2);

        return matchRepository.save(match);
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Match updateMatch(Long id, Match updatedMatch) {
        return matchRepository.findById(id)
                .map(existingMatch -> {
                    existingMatch.setUser1(updatedMatch.getUser1());
                    existingMatch.setUser2(updatedMatch.getUser2());
                    existingMatch.setMatchedAt(updatedMatch.getMatchedAt());
                    return matchRepository.save(existingMatch);
                })
                .orElseThrow(() -> new RuntimeException("Match not found with id " + id));
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}
