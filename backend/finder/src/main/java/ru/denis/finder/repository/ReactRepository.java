package ru.denis.finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.React;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactRepository extends JpaRepository<React, Long> {
    List<React> findByProfileId(Long profileId);
    Optional<React> findByProfileIdAndTargetProfileIdAndLiked(Long profileId, Long targetProfileId, Boolean liked);
    Optional<React> findByProfileIdAndTargetProfileId(Long profileId, Long targetProfileId);
}
