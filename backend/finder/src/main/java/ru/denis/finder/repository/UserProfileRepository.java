package ru.denis.finder.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.UserProfile;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query("SELECT u FROM UserProfile u WHERE " +
            "u.userId <> :currentUserId AND " +
            "NOT EXISTS (SELECT r FROM React r WHERE (r.targetProfile.userId <> :currentUserId AND r.profile.userId = :currentUserId)) " +
            "ORDER BY function('RANDOM')")
    Page<UserProfile> findRandom(
            @Param("currentUserId") Long currentUserId,
            Pageable pageable);

    @Query("SELECT u FROM UserProfile u WHERE " +
            "u.userId <> :currentUserId AND " +
            "NOT EXISTS (SELECT r FROM React r WHERE (r.targetProfile.userId <> :currentUserId AND r.profile.userId = :currentUserId)) AND " +
            "(:filtered = false OR EXISTS (SELECT interest FROM u.interests interest WHERE interest IN :interests)) " +
            "ORDER BY function('RANDOM')")
    Page<UserProfile> findRandomByMatchingInterests(
            @Param("currentUserId") Long currentUserId,
            @Param("interests") List<String> interests,
            @Param("filtered") boolean filtered,
            Pageable pageable);

    Optional<UserProfile> findByUserId (Long userId);
}
