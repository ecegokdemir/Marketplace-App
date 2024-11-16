package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tr.com.obss.repository.FavoriteListRepository;
import tr.com.obss.service.FavoriteListService;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.mapper.ProductMapper;
import tr.com.obss.model.FavoriteList;
import tr.com.obss.model.Product;
import tr.com.obss.model.User;
import tr.com.obss.repository.ProductRepository;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class FavoriteListServiceImpl implements FavoriteListService {

    private final FavoriteListRepository favoriteListRepository;

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    @Override
    public String addProductToFavorites(User user, Product product) {
        Objects.requireNonNull(user, "User cannot be null");
        Objects.requireNonNull(product, "Product cannot be null");

        FavoriteList favoriteList = favoriteListRepository.findByUser(user)
                .orElseGet(() -> {
                    FavoriteList newFavoriteList = new FavoriteList();
                    newFavoriteList.setUser(user);
                    return favoriteListRepository.save(newFavoriteList);
                });
        favoriteList.addProduct(product);
        favoriteListRepository.save(favoriteList);
        return "Product added to favorites";
    }

    @Override
    public String removeProductFromFavorites(User user, Product product) {
        Objects.requireNonNull(user, "User cannot be null");
        Objects.requireNonNull(product, "Product cannot be null");

        FavoriteList favoriteList = favoriteListRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Favorite list not found for user"));

        favoriteList.removeProduct(product);
        favoriteListRepository.save(favoriteList);
        return "Product removed from favorites";
    }

    @Override
    public List<ProductDto> getFavoriteProducts(User user) {
        Objects.requireNonNull(user, "User cannot be null");

        FavoriteList favoriteList = favoriteListRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Favorite list not found for user"));

        return favoriteList.getProducts().stream()
                .map(productMapper::toDto)
                .toList();
    }
}
