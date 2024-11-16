package tr.com.obss.dto;

import lombok.*;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UserDto {

    @EqualsAndHashCode.Include
    private String id;
    private String name;
    private String email;
    private String surname;
    private String username;


}