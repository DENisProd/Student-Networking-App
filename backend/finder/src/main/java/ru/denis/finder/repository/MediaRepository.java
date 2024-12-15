package ru.denis.finder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.denis.finder.model.Media;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
}
