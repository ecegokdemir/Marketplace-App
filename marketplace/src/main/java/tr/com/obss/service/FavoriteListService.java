package tr.com.obss.service;

import org.springframework.stereotype.Service;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.model.Product;
import tr.com.obss.model.User;

import java.util.List;

@Service
public interface FavoriteListService {

    String addProductToFavorites(User user, Product product);

    String removeProductFromFavorites(User user, Product product);

    List<ProductDto> getFavoriteProducts(User user);
}
