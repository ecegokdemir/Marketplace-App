package tr.com.obss.mapper;

import org.springframework.stereotype.Component;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.model.Category;

@Component
public class CategoryMapper {

    public  Category toModel(CategoryDto categoryDto) {
        if (categoryDto == null) {
            return null;
        }

        Category category = new Category();
        category.setId(categoryDto.getCategoryId());
        category.setCategoryName(categoryDto.getCategoryName());
        category.setImage(categoryDto.getImage());

        return category;
    }

    public  CategoryDto toDto(Category category) {

        if (category == null) {
            return null;
        }

        return CategoryDto.builder()
                .categoryId(category.getId())
                .categoryName(category.getCategoryName())
                .image(category.getImage())
                .build();
    }
}
