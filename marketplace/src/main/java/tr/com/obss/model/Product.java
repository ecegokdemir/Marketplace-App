package tr.com.obss.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, message = "Product name must contain at least 3 characters")
    private String productName;

    @NotBlank
    @Size(min = 6, message = "Product description must contain at least 6 characters")
    private String description;

    private Double price;

    private String image;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Seller seller;

    //TO-DO
//    public void setSeller(Seller seller) {
//        this.seller = seller;
//        if (seller != null && !seller.getProducts().contains(this)) {
//            seller.getProducts().add(this);
//        }
//    }
}
