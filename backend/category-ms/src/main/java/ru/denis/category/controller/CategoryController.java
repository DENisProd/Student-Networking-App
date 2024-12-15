package ru.denis.category.controller;


import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.denis.category.CategoryDTO;
import ru.denis.category.CategoryType;
import ru.denis.category.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/")
    public Page<CategoryDTO> getAllCategories(@RequestParam("type") String type, Pageable pageable) {
        return categoryService.findAll(CategoryType.valueOf(type), pageable);
    }

    @GetMapping("/search")
    public Page<CategoryDTO> searchCategories(
            @RequestParam("name") String name,
            @RequestParam("type") CategoryType type,
            Pageable pageable
    ) {
        return categoryService.findByNameAndType(name, type, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(categoryService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO category) {
        CategoryDTO createdCategory = categoryService.save(category);
        return ResponseEntity.ok(createdCategory);
    }

    @GetMapping("/ids")
    public ResponseEntity<?> getCategoriesByIds(@RequestParam("ids") List<Long> ids) {
        try {
            return ResponseEntity.ok(categoryService.findCategoriesByIds(ids));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDetails) {
        return categoryService.updateCategory(id, categoryDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
