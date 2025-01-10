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
@RequestMapping("/api/v2/categories")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCategories(@RequestParam("type") String type, Pageable pageable) {
        CategoryType _type = CategoryType.CATEGORY;

        if (type != null && !type.isEmpty()) {
            try {
                _type = CategoryType.valueOf(type.toUpperCase());
            } catch (IllegalArgumentException e) {

            }
        }

        Page<CategoryDTO> categories = categoryService.findAll(_type, pageable);
        return ResponseEntity.ok(categories);
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
    public ResponseEntity<CategoryDTO> createCategory(
            @RequestHeader(value = "X-User-ID") String userId,
            @RequestBody CategoryDTO category
    ) {
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
    public ResponseEntity<CategoryDTO> updateCategory(
            @RequestHeader(value = "X-User-ID") String userId,
            @PathVariable Long id,
            @RequestBody CategoryDTO categoryDetails
    ) {
        return categoryService.updateCategory(id, categoryDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(
            @RequestHeader(value = "X-User-ID") String userId,
            @PathVariable Long id
    ) {
        try {
            categoryService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
