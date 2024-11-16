package tr.com.obss.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.model.Category;
import tr.com.obss.service.CategoryService;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/categories")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public BaseResponse<CategoryDto> createCategory(@RequestBody Category category) {
        return new BaseResponse<>(categoryService.createCategory(category));
    }

    @GetMapping("/{id}")
    public BaseResponse<CategoryDto> getCategory(@PathVariable Long id) {
        return new BaseResponse<>( categoryService.getCategory(id));
    }

    @GetMapping
    public BaseResponse<List<CategoryDto>> searchCategories(@RequestParam(name="search", required = false) String search,
                                                            @RequestParam(value="size", required = false, defaultValue = "10") Integer size,
                                                            @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                            @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        return new BaseResponse<>(categoryService.searchCategories(search, size, page, sort));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public BaseResponse<CategoryDto> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return new BaseResponse<>(categoryService.updateCategory(id, category));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteCategory(@PathVariable Long id) {
        return new BaseResponse<>(categoryService.deleteCategory(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{categoryId}/products/{productId}")
    public BaseResponse<CategoryDto> addProductToCategory(@PathVariable Long categoryId, @PathVariable Long productId) {
        CategoryDto categoryDto = categoryService.addProductToCategory(categoryId, productId);
        return new BaseResponse<>(categoryDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{categoryId}/remove-product")
    public BaseResponse<CategoryDto> removeProductFromCategory(@PathVariable Long categoryId, @PathVariable Long productId) {
        CategoryDto categoryDto = categoryService.removeProductFromCategory(categoryId, productId);
        return new BaseResponse<>(categoryDto);
    }
}
