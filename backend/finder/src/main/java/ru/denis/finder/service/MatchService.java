package ru.denis.finder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.finder.dto.match.MatchShortResponseDTO;
import ru.denis.finder.dto.match.MatchUserProfileDTO;
import ru.denis.finder.model.Match;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.repository.MatchRepository;
import ru.denis.media.FileSize;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchService {
    private final MatchRepository matchRepository;

    public Match createMatch(UserProfile user1, UserProfile user2) {
        List<Match> existedMatch = matchRepository.findByUser1AndUser2(user1, user2);
        if (!existedMatch.isEmpty()) return null;

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

    public List<MatchShortResponseDTO> getMatchesByUserId(Long userId) {
        var matches = matchRepository.findByUserId(userId);

        return matches.stream()
                .map(match -> {
                    MatchShortResponseDTO dto;
                    if (match.getUser1().getUserId().equals(userId))
                        dto = new MatchShortResponseDTO(match.getId(), convertToMatchUserProfile(match.getUser2()));
                    else 
                        dto = new MatchShortResponseDTO(match.getId(), convertToMatchUserProfile(match.getUser1()));

                    if (!hasActiveSubscription(userId)) {

                    } else {

                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    private MatchUserProfileDTO convertToMatchUserProfile(UserProfile user) {
        return new MatchUserProfileDTO(
                user.getId(),
                user.getAbout(),
                user.getDescription(),
                user.getInterests().stream().toList(),
                user.getTarget(),
                user.getMediaList().stream().filter(media -> media.getSize().equals(FileSize.BLUR)).toList().get(0)
        );
    }

    private boolean hasActiveSubscription(Long userId) {
        // TODO: Check subscription status logic
        return false;
    }
}
