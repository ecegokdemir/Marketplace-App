package tr.com.obss.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.model.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findUserById(UUID uuid);

    List<User> findUsersByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(String name, String surname, Pageable pageable);

    @Query("from User")
    List<User> findAllUsers(Pageable pageable);

    Optional<User> findUserByUsername(String roleAdmin);
}
