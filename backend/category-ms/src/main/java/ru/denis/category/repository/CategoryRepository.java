package ru.denis.category.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.denis.category.CategoryType;
import ru.denis.category.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findByType(CategoryType type, Pageable pageable);
    Page<Category> findByNameContainingIgnoreCaseAndType(String name, CategoryType type, Pageable pageable);
}
