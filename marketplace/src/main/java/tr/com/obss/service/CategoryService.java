package tr.com.obss.service;

import org.springframework.web.multipart.MultipartFile;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.model.Category;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    void generateSampleCategories(int targetCategorySize);

    CategoryDto createCategory(Category category);

    CategoryDto getCategory(Long categoryId);

    List<CategoryDto> searchCategories (String search, Integer size, Integer page, String sort);

    CategoryDto updateCategory(Long categoryId, Category category);

 //   CategoryDto updateCategoryImage(Long productId, MultipartFile image) throws IOException;

    String deleteCategory(Long categoryId);

    CategoryDto addProductToCategory(Long id, Long productId);

    CategoryDto removeProductFromCategory(Long id, Long productId);
}
