package tr.com.obss.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.model.Category;
import tr.com.obss.model.User;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("from Category")
    List<Category> findAllCategories(Pageable pageable);

    List<Category> findCategoriesByCategoryNameContainingIgnoreCase(String name,Pageable pageable);
}
