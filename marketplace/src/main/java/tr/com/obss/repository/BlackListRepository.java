package tr.com.obss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.model.BlackList;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;

import java.util.List;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {

    List<BlackList> findByUser(User user);

    BlackList findByUserAndSeller(User user, Seller seller);

    boolean existsByUserAndSeller(User user, Seller seller);
}
