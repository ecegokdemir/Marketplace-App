package tr.com.obss.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

@Getter
@Setter
@Entity
public class Category extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 3, message = "Category name must contain at least 3 characters")
    private String categoryName;

    private String image;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL , fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Product> products;

    public void addProduct(Product product) {
        products.add(product);
        product.setCategory(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setCategory(null);
    }
}


