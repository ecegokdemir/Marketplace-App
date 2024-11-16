package tr.com.obss.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.model.Category;
import tr.com.obss.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("from Product")
    Page<Product> findAllProducts(Pageable pageable);


    Page<Product> findByProductNameContainingIgnoreCase(String search, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.seller.id NOT IN :blockedSellerIds " +
            "AND (:search IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND p.seller.id IS NOT NULL")
    Page<Product> findAllBySellerIdNotInAndSearch(@Param("blockedSellerIds") List<Long> blockedSellerIds,
                                                  @Param("search") String search,
                                                  Pageable pageable);


    @Query("SELECT p FROM Product p WHERE LOWER(p.productName) LIKE LOWER(CONCAT('%', :name, '%')) AND p.seller.id IS NULL")
    List<Product> findByProductNameContainingIgnoreCaseAndSellerIdIsNull(@Param("name") String name, Pageable pageable);

    @Query("select p from Product p where p.category.id = :categoryId")
    List<Product> findByCategoryId(Long categoryId, PageRequest pageRequest);

    @Query("select p from Product p where p.seller.id = :sellerId")
    List<Product> findBySellerId(Long sellerId, PageRequest pageRequest);

    @Query("select p from Product p where p.seller.id NOT IN :sellerIds")
    List<Product> findBySellerIdNotIn(@Param("sellerIds") List<Long> sellerIds, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId AND(:blockedSellerIds IS NULL OR p.seller.id NOT IN :blockedSellerIds)")
    List<Product> findByCategoryIdAndSellerIdNotIn(@Param("categoryId") Long categoryId, @Param("blockedSellerIds") List<Long> blockedSellerIds, Pageable pageable);


}
