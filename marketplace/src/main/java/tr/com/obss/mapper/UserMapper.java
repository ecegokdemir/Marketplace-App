package tr.com.obss.mapper;

import org.springframework.stereotype.Component;
import tr.com.obss.dto.UserDto;
import tr.com.obss.model.User;
import tr.com.obss.utils.StringUtils;

import java.util.Objects;
import java.util.UUID;

@Component
public class UserMapper {

    public User toModel(UserDto userDto) {
        User user = new User();
        if(StringUtils.isNotBlank(userDto.getId())){
            user.setId(UUID.fromString(userDto.getId()));
        }
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setEnabled(Boolean.TRUE);
        return user;
    }

    //TODO: Bu method nerede çağrılıyor kontrol et, çağrılmıyorsa sil
    public void toModel(UserDto userDto, User user) {
        if(StringUtils.isNotBlank(userDto.getId()) && StringUtils.isNotBlank(userDto.getId())){
            user.setId(UUID.fromString(userDto.getId()));
        }
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setEnabled(Boolean.TRUE);
    }

    public UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setName(user.getName());
        userDto.setSurname(user.getSurname());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setId(user.getId().toString());
        return userDto;
    }
}
