package tr.com.obss.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> findSellerById(Long uuid);

    @Query("SELECT s FROM Seller s WHERE s.id NOT IN :blockedSellerIds")
    List<Seller> findAllSellersExcludingBlocked(@Param("blockedSellerIds") List<Long> blockedSellerIds, Pageable pageable);

    @Query("SELECT s FROM Seller s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) AND s.id NOT IN :blockedSellerIds")
    List<Seller> findSellersByNameContainingIgnoreCaseAndIdNotIn(@Param("search") String search, @Param("blockedSellerIds") List<Long> blockedSellerIds, Pageable pageable);


    List<Seller> findSellersByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query("from Seller")
    List<Seller> findAllSellers(Pageable pageable);


}