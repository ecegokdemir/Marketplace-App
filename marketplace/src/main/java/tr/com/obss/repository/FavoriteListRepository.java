package tr.com.obss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tr.com.obss.model.FavoriteList;
import tr.com.obss.model.User;

import java.util.Optional;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {

    Optional<FavoriteList> findByUser(User user);

}
