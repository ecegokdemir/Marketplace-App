package tr.com.obss.service;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import tr.com.obss.model.User;
import tr.com.obss.dto.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserDto> searchUsers(String search, Integer size, Integer page, String sort);

    UserDto findByUserId(String userId);

    UserDto createNewUser(UserDto userDto);

    UserDto updateExistingUser(String userId, UserDto userDto);

    UserDto deleteUserById(String userId);

    void generateSampleUsers(int targetUserSize);

    void checkAndCreateAdminUser();

    void createTestUser();

    Optional<User> findByUsername(String username);

    void updateExistingUserAsAdmin(String userId);
}