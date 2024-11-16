package tr.com.obss.exception;

public class CategoryNotFoundException extends BaseException {

    public CategoryNotFoundException(Long categoryId) {
        super(String.format("Category with id %s not found", categoryId));
    }
}
