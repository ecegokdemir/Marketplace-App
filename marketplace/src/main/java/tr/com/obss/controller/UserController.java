package tr.com.obss.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.annotation.PreDestroy;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.common.Constants;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.CreateNewUserRequest;
import tr.com.obss.dto.UserDto;
import tr.com.obss.model.Role;
import tr.com.obss.model.User;
import tr.com.obss.security.UserAuthDetails;
import tr.com.obss.service.UserService;

import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;


    @GetMapping("/role")
    public BaseResponse<String> getCurrentUser(@AuthenticationPrincipal UserAuthDetails userAuthDetails) {
        User user = userAuthDetails.getUser();
        String role = "USER";
        for (Role r : user.getRoles()) {
            if (r.getName().equals(Constants.Roles.ADMIN)) {
                role = "ADMIN";
            }
        }  return new BaseResponse<>(role);
    }



    @Operation(summary = "get users by parameters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "400", description = "Invalid parameter")
    })
    @GetMapping
    public BaseResponse<List<UserDto>> searchUsers(@RequestParam(name="search", required = false) String search,
                                                    @RequestParam(value="size", required = false, defaultValue = "5") Integer size,
                                                    @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                    @RequestParam(value="sort", required = false) String sort){

        return new BaseResponse<>(userService.searchUsers(search, size, page, sort));

    }

    @GetMapping("/{UserId}")
    public BaseResponse<UserDto> getUserDetail(@PathVariable("UserId") String UserId){
        return new BaseResponse<>(userService.findByUserId(UserId));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping()
    public BaseResponse<UserDto> createNewUser(@RequestBody @Valid CreateNewUserRequest createNewUserRequest){
        final UserDto userDto = UserDto.builder()
                .id(UUID.randomUUID().toString()) // Sonra bunu incele bu satıra gerek olmayabilir
                .surname(createNewUserRequest.getSurname())
                .name(createNewUserRequest.getName())
                .email(createNewUserRequest.getEmail())
                .username(createNewUserRequest.getUsername())
                .build();

        return new BaseResponse<>(userService.createNewUser(userDto));
    }

    @PutMapping("/{UserId}")
    public BaseResponse<UserDto> updateUser(@PathVariable("UserId") String UserId,@RequestBody UserDto updateUserDto){

        UserDto userDto = UserDto.builder()
                .id(UserId)
                .name(updateUserDto.getName())
                .email(updateUserDto.getEmail())
                .surname(updateUserDto.getSurname())
                .username(updateUserDto.getUsername())
                .build();

        return new BaseResponse<>(userService.updateExistingUser(UserId,userDto));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{UserId}")
    public BaseResponse<UserDto> deleteUser(@PathVariable("UserId") String UserId) {
        return new BaseResponse<>(userService.deleteUserById(UserId));
    }

    @PutMapping("/{UserId}/assign-as-admin")
    public BaseResponse<Boolean> updateUserAsAdmin(@PathVariable("UserId") String UserId) {
        userService.updateExistingUserAsAdmin(UserId);
        return new BaseResponse<>(Boolean.TRUE);
    }

}
