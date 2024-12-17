package ru.denis.finder.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.denis.finder.dto.react.ReactDTO;
import ru.denis.finder.model.Match;
import ru.denis.finder.model.React;
import ru.denis.finder.model.UserProfile;
import ru.denis.finder.repository.ReactRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReactService {

    private final ReactRepository reactRepository;
    private final MatchService matchService;
    private final UserProfileService userProfileService;

    public Boolean reactAtProfile(ReactDTO reactDTO) {
        try {
            UserProfile profile = userProfileService.getByUserIdWithoutCategories(reactDTO.userId());
            UserProfile targetProfile = userProfileService.getByIdWithoutCategories(reactDTO.targetProfileId());
            if (profile == null || targetProfile == null) throw new NoSuchElementException("User profile is not found");

            Optional<React> existingReact = reactRepository.findByProfileIdAndTargetProfileId(profile.getId(), targetProfile.getId());
            if (existingReact.isPresent()) return false;

            createReact(profile, targetProfile, reactDTO.isLike());

            if (checkReciprocal(profile.getId(), targetProfile.getId()) && reactDTO.isLike()) {
                matchService.createMatch(profile, targetProfile);
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void createReact (UserProfile profile, UserProfile targetProfile, Boolean isLiked) {
        React react = new React();
        react.setProfile(profile);
        react.setTargetProfile(targetProfile);
        react.setLiked(isLiked);

        reactRepository.save(react);
    }

    // Проверяем взаимность лайка
    private boolean checkReciprocal(Long profileId, Long targetProfileId) {
        Optional<React> reciprocalReact = reactRepository.findByProfileIdAndTargetProfileIdAndLiked(
                targetProfileId,
                profileId,
                true
        );

        return reciprocalReact.isPresent() && (!Objects.equals(profileId, targetProfileId));
    }

    private ReactDTO convertToReactDTO(React react) {
        return new ReactDTO(
                react.getId(),
                react.getTargetProfile().getId(),
                react.getLiked()
        );
    }

    public Optional<React> getReactById(Long id) {
        return reactRepository.findById(id);
    }

    public List<React> getAllReacts() {
        return reactRepository.findAll();
    }

    public React updateReact(Long id, React updatedReact) {
        return reactRepository.findById(id)
                .map(existingReact -> {
                    existingReact.setProfile(updatedReact.getProfile());
                    existingReact.setTargetProfile(updatedReact.getTargetProfile());
                    existingReact.setLiked(updatedReact.getLiked());
                    existingReact.setCreatedAt(updatedReact.getCreatedAt());
                    return reactRepository.save(existingReact);
                })
                .orElseThrow(() -> new RuntimeException("React not found with id " + id));
    }

    public void deleteReact(Long id) {
        reactRepository.deleteById(id);
    }
}
