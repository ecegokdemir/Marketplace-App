package tr.com.obss.dto;

import lombok.*;
import tr.com.obss.model.Seller;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ProductDto {

    @EqualsAndHashCode.Include
    private Long productId;
    private String productName;
    private String image;
    private String description;
    private Double price;
    private CategoryDto category;
    private Seller seller;
}
