package tr.com.obss.dto;

import lombok.*;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class CategoryDto {

    @EqualsAndHashCode.Include
    private Long categoryId;
    private String categoryName;
    private String image;
}
