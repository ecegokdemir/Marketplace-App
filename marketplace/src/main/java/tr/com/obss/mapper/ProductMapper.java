package tr.com.obss.mapper;

import org.hibernate.proxy.HibernateProxy;
import org.springframework.stereotype.Component;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.model.Product;
import tr.com.obss.model.Seller;

@Component
public class ProductMapper {

    public Product toModel(ProductDto productDto) {

        if (productDto == null) {
            return null;
        }
        Product product = new Product();
        product.setId(productDto.getProductId());
        product.setProductName(productDto.getProductName());
        product.setImage(productDto.getImage());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());

        // Eğer seller ve category nesneleri var ise uygun şekilde set edilmeli
        if (productDto.getSeller() != null) {
            product.setSeller(productDto.getSeller());
        }
        // if (productDto.getCategory() != null) {
        //     product.setCategory(productDto.getCategory());
        // }

        return product;
    }

    public ProductDto toDto(Product product) {

        if (product == null) {
            return null;
        }

        // Lazy loaded fields handling
        if (product.getSeller() instanceof HibernateProxy) {
            HibernateProxy proxy = (HibernateProxy) product.getSeller();
            product.setSeller((Seller) proxy.getHibernateLazyInitializer().getImplementation());
        }

        return ProductDto.builder()
                .productId(product.getId())
                .productName(product.getProductName())
                .image(product.getImage())
                .description(product.getDescription())
                .price(product.getPrice())
                .seller(product.getSeller())
                // .category(product.getCategory())
                .build();
    }
}
