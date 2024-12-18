package ru.denis.finder.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.denis.finder.model.UserProfile;

import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query("SELECT u FROM UserProfile u ORDER BY function('RANDOM')")
    Page<UserProfile> findRandom(Pageable pageable);

    @Query("SELECT u FROM UserProfile u WHERE " +
            "u.userId <> :currentUserId AND " +
            "NOT EXISTS (SELECT r FROM React r WHERE r.targetProfile.id = u.id AND r.profile.userId = :currentUserId) AND " +
            "(:filtered = false OR EXISTS (SELECT interest FROM u.interests interest WHERE interest IN :interests)) " +
            "ORDER BY function('RANDOM')")
    Page<UserProfile> findRandomByMatchingInterests(Long currentUserId, List<String> interests, Pageable pageable);

    Optional<UserProfile> findByUserId (Long userId);
}
