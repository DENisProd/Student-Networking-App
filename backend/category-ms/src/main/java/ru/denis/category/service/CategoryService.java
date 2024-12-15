package ru.denis.category.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.denis.category.CategoryDTO;
import ru.denis.category.CategoryType;
import ru.denis.category.models.Category;
import ru.denis.category.repository.CategoryRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public Page<CategoryDTO> findAll(CategoryType type, Pageable pageable) {
        return categoryRepository.findByType(type, pageable)
                .map(category -> new CategoryDTO(
                        category.getId(),
                        category.getName(),
                        category.getColor(),
                        category.getType(),
                        category.getIcon(),
                        category.getIsCustomize()
                ));
    }

    @Transactional
    public CategoryDTO findById(Long id) {
        var existedCategory = categoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Category not found"));

        return convertToCategoryDTO(existedCategory);
    }

    @Transactional
    public Page<CategoryDTO> findByNameAndType(String name, CategoryType type, Pageable pageable) {
        return categoryRepository.findByNameContainingIgnoreCaseAndType(name, type, pageable)
                .map(this::convertToCategoryDTO);
    }

    @Transactional
    public CategoryDTO save(CategoryDTO categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.name());

        if (categoryDto.icon() != null && !categoryDto.icon().isEmpty()) {
            category.setIcon(categoryDto.icon());
        }

        if (categoryDto.color() != null && !categoryDto.color().isEmpty()) {
            category.setColor(categoryDto.color());
        }

        category.setIsCustomize(categoryDto.isCustomize());
        category.setType(categoryDto.type());

        Category savedCategory = categoryRepository.save(category);
        return convertToCategoryDTO(savedCategory);
    }

    public Optional<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDto) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(categoryDto.name());
            category.setColor(categoryDto.color());
            category.setIcon(categoryDto.icon());
            category.setIsCustomize(categoryDto.isCustomize());
            category.setType(categoryDto.type());

            Category updatedCategory = categoryRepository.save(category);
            return convertToCategoryDTO(updatedCategory);
        });
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO convertToCategoryDTO (Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getColor(),
                category.getType(),
                category.getIcon(),
                category.getIsCustomize()
        );
    }

    public List<CategoryDTO> findCategoriesByIds(List<Long> ids) {
        List<Category> categories = categoryRepository.findAllById(ids);

        return categories.stream()
                .map(this::convertToCategoryDTO)
                .toList();
    }
}
