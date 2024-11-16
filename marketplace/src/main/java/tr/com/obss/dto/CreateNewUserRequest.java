package tr.com.obss.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateNewUserRequest {

    @NotBlank(message = "Name cannot be empty or null")
    @Size(min = 2,max = 50)
    private String name;

    @NotBlank
    @Size(min = 2,max = 50)
    private String surname;

    @NotBlank
    @Email
    private String email;

    private String username;


}