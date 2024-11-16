package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.exception.CategoryNotFoundException;
import tr.com.obss.mapper.CategoryMapper;
import tr.com.obss.model.Category;
import tr.com.obss.model.Product;
import tr.com.obss.repository.CategoryRepository;
import tr.com.obss.repository.ProductRepository;
import tr.com.obss.service.CategoryService;
import tr.com.obss.utils.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService{

    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void generateSampleCategories(int targetCategorySize) {
        List<Category> categories = new ArrayList<>();
        for (int i = 0; i < targetCategorySize; i++) {
            final CategoryDto categoryDto = CategoryDto.builder()
                    .categoryName("Category " + i)
                    .image("https://res.cloudinary.com/dxguqzge7/image/upload/v1682838911/Shoe_e2yc1d.jpg") //TO-DO: Implement logic to generate random image
                    .build();

            final Category categoryModel = categoryMapper.toModel(categoryDto);
            categories.add(categoryModel);
        }
        categoryRepository.saveAll(categories);
    }

    @Override
    public CategoryDto createCategory(Category category) {
        Objects.requireNonNull(category, "Category cannot be null");
        Objects.requireNonNull(category.getCategoryName(), "Category name cannot be null");
        Objects.requireNonNull(category.getImage(), "Category image cannot be null");

        return categoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public CategoryDto getCategory(Long categoryId) {
        Objects.requireNonNull(categoryId, "Category Id cannot be null");

        return categoryRepository.findById(categoryId)
                .map(categoryMapper::toDto)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
    }

    @Override
    public List<CategoryDto> searchCategories(String search, Integer size, Integer page, String sort) {

        String sortField = StringUtils.isBlank(sort) ? "categoryName" : sort;
        final PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));

        List<Category> categories = null;
        if(StringUtils.isBlank(search)){
            categories = categoryRepository.findAllCategories(pageRequest);
        }else{
            categories = categoryRepository.findCategoriesByCategoryNameContainingIgnoreCase(search,pageRequest);
        }
        return categories.stream().map(categoryMapper::toDto).toList();

    }

    @Override
    public CategoryDto updateCategory(Long id, Category category) {
        Objects.requireNonNull(id, "Category Id cannot be null");

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        if(StringUtils.isNotBlank((category.getCategoryName()))){
            existingCategory.setCategoryName(category.getCategoryName());
        }
        if(StringUtils.isNotBlank((category.getImage()))){
            existingCategory.setCategoryName(category.getImage());
        }

        Category updatedCategory = categoryRepository.save(existingCategory);
        return categoryMapper.toDto(updatedCategory);
    }

//    @Override
//    public CategoryDto updateCategoryImage(Long categoryId, MultipartFile image) throws IOException {
//        Category category = categoryRepository.findById(categoryId)
//                .orElseThrow(() -> new CategoryNotFoundException(categoryId));
//
//          String fileName = fileService.uploadImage(path, image);
//
//          category.setImage(fileName);
//
//          Category updatedCategory = categoryRepository.save(category);
//
//          return categoryMapper.toDto(updatedCategory);
//
//    }

    @Override
    public String deleteCategory(Long categoryId) {
        Objects.requireNonNull(categoryId, "Category Id cannot be null");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        categoryRepository.delete(category);
        return "Category deleted successfully";
    }

    @Override
    public CategoryDto addProductToCategory(Long id, Long productId) {
        Objects.requireNonNull(id, "id cannot be null");
        Objects.requireNonNull(productId, "productId cannot be null");

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        category.addProduct(product);
        product.setCategory(category);
        categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryDto removeProductFromCategory(Long id, Long productId) {
        Objects.requireNonNull(id, "id cannot be null");
        Objects.requireNonNull(productId, "productId cannot be null");

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        category.removeProduct(product);
        product.setCategory(null);
        categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }
}