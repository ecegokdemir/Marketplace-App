package tr.com.obss.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.common.Constants;
import tr.com.obss.dto.UserDto;
import tr.com.obss.exception.UserNotFoundException;
import tr.com.obss.mapper.UserMapper;
import tr.com.obss.model.Role;
import tr.com.obss.model.User;
import tr.com.obss.repository.UserRepository;
import tr.com.obss.service.RoleService;
import tr.com.obss.service.UserService;
import tr.com.obss.utils.StringUtils;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public List<UserDto> searchUsers(String search, Integer size, Integer page, String sort) {
        String sortField = sort;

        if(StringUtils.isBlank(sort)){
            sortField = "name";
        }

        final PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));
        //final PageRequest pageRequest = PageRequest.of(page, size);

        List<User> users = null;
        if(StringUtils.isBlank(search)){
            users = userRepository.findAllUsers(pageRequest);
        }else{
            users = userRepository.findUsersByNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(search, search,pageRequest);
        }
        return users.stream().map(userMapper::toDto).toList();

    }

    @Override
    public UserDto findByUserId(String userId) {
        Objects.requireNonNull(userId, "userId cannot be null");
        return userMapper.toDto(userRepository.findUserById(UUID.fromString(userId)).
                orElseThrow(() -> new UserNotFoundException(userId)));
    }

    @Transactional
    @Override
    public UserDto createNewUser(UserDto userDto) {
        Objects.requireNonNull(userDto,"userDto cannot be null");
        Objects.requireNonNull(userDto.getName(),"name cannot be null");
        Objects.requireNonNull(userDto.getSurname(),"surname cannot be null");
        Objects.requireNonNull(userDto.getEmail(),"email cannot be null");
        userDto.setId(UUID.randomUUID().toString());

        if(StringUtils.isBlank(userDto.getUsername())){
            userDto.setUsername(generateUserName(userDto));
        }

        final User user = userMapper.toModel(userDto);
        user.setPassword(passwordEncoder.encode("pass"));
        final Role userRole = roleService.findByName(Constants.Roles.USER);
        user.addRole(userRole);
        return userMapper.toDto(userRepository.save(user));
    }


    public String generateUserName(UserDto userDto){
        Objects.requireNonNull(userDto, "userDto must not be null");
        Objects.requireNonNull(userDto.getName(), "userDto.name must not be null");
        Objects.requireNonNull(userDto.getSurname(), "userDto.surname must not be null");

        String name = userDto.getName().replaceAll("\\s+", "");
        return String.format("%s.%s", name, userDto.getSurname());
    }


    @Transactional
    @Override
    public void generateSampleUsers(int targetUserSize) {
        List<User> users = new ArrayList<>();
        final Role userRole = roleService.findByName(Constants.Roles.USER);
        for (int i = 0; i < targetUserSize; i++) {
            final UserDto userDto = UserDto.builder()
                    .name(StringUtils.geneateRandomString(20))
                    .surname(StringUtils.geneateRandomString(15))
                    .email(StringUtils.geneateRandomString(10) + "@gmail.com")
                    .build();

            userDto.setUsername(generateUserName(userDto));
            final User userModel = userMapper.toModel(userDto);
            userModel.addRole(userRole);
            userModel.setPassword(passwordEncoder.encode("pass"));
            users.add(userModel);

        }
        userRepository.saveAll(users);
    }

    @Override
    public UserDto updateExistingUser(String userId, UserDto updateUserDto) {
        Objects.requireNonNull(userId,"userId cannot be null");

        final User user = userRepository.findUserById(UUID.fromString(userId)).orElseThrow(() -> new UserNotFoundException("User not found"));

        if(StringUtils.isNotBlank((updateUserDto.getEmail()))){
            user.setEmail(updateUserDto.getEmail());
        }
        if(StringUtils.isNotBlank((updateUserDto.getName()))){
            user.setName(updateUserDto.getName());
        }
        if(StringUtils.isNotBlank((updateUserDto.getSurname()))){
            user.setSurname(updateUserDto.getSurname());
        }
        if(StringUtils.isNotBlank((updateUserDto.getUsername()))){
            user.setUsername(updateUserDto.getUsername());
        }

        return userMapper.toDto(userRepository.save(user));
    }


    @Override
    public UserDto deleteUserById(String userId) {
        Objects.requireNonNull(userId,"userId cannot be null");
        final User user = userRepository.findUserById(UUID.fromString(userId)).orElseThrow(() -> new UserNotFoundException("User not found"));
        for (Role role : user.getRoles()) {
            role.getUsers().remove(user);
        }
        user.getRoles().clear();
        userRepository.delete(user);
        return userMapper.toDto(user);
    }

    @Transactional
    @Override
    public void checkAndCreateAdminUser() {
        userRepository.findUserByUsername(Constants.ADMIN_USER).orElseGet(() -> {
            final Role adminRole = roleService.findByName(Constants.Roles.ADMIN);
            User user = new User();
            user.setName("Admin");
            user.setSurname("Admin");
            user.setEmail("admin@admin.com");
            user.setUsername(Constants.ADMIN_USER);
            user.addRole(adminRole);
            user.setPassword(passwordEncoder.encode("pass"));
            user.setEnabled(Boolean.TRUE);
            userRepository.save(user);
            return user;
        });
    }

    @Transactional
    @Override
    public void createTestUser() {
            final Role userRole = roleService.findByName(Constants.Roles.USER);
            User user = new User();
            user.setName("ece");
            user.setSurname("gokdemir");
            user.setEmail("ece@gmail.com");
            user.setUsername("eceTest");
            user.addRole(userRole);
            user.setPassword(passwordEncoder.encode("pass"));
            user.setEnabled(Boolean.TRUE);
            userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        return userRepository.findUserByUsername(username);
    }

    @Transactional //işlemler ya tamamen başarılı olmalı ya da tamamen geri alınmalı
    @Override
    public void updateExistingUserAsAdmin(String userId) {
        Objects.requireNonNull(userId, "userId cannot be null");
        final User user = userRepository.findUserById(UUID.fromString(userId)).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.addRole(roleService.findByName(Constants.Roles.ADMIN));
        userRepository.save(user);
    }
}
