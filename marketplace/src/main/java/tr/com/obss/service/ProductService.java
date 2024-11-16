package tr.com.obss.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import tr.com.obss.model.Product;
import tr.com.obss.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public interface ProductService {

    ProductDto addProduct(Long categoryId, Product product);

    ProductDto getProductById(Long productId);

   Page<ProductDto> searchProducts(String search, Integer size, Integer page, String sort);

    List<ProductDto> getProductsByCategory(User user,Long categoryId, Integer size, Integer page, String sort);

    List<ProductDto> getProductsBySeller(User user,Long sellerId, Integer size, Integer page, String sort);

    ProductDto updateProduct(Long productId, ProductDto productDto);

  //  ProductDto updateProductImage(Long productId, MultipartFile image) throws IOException;

    String deleteProduct(Long productId);

    void generateSampleProducts(int targetUserSize);

    Page<ProductDto> getVisibleProductsForUser(User user, String search, Integer size, Integer page, String sort);

}
