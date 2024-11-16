package tr.com.obss.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.exception.UserNotFoundException;
import tr.com.obss.mapper.ProductMapper;
import tr.com.obss.model.Product;
import tr.com.obss.model.User;
import tr.com.obss.repository.UserRepository;
import tr.com.obss.security.UserAuthDetails;
import tr.com.obss.service.FavoriteListService;
import tr.com.obss.service.ProductService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/favorites")
public class FavoriteListController {

    private final FavoriteListService favoriteListService;

    private final ProductService productService;

    private final UserRepository userRepository;

    private final ProductMapper productMapper;

    @PostMapping("/{productId}")
    public BaseResponse<String>  addProductToFavorites(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                       @PathVariable Long productId) {
        User user = userAuthDetails.getUser();
        System.out.println(user);
        ProductDto productDto = productService.getProductById(productId);
        Product product = productMapper.toModel(productDto);
        return new BaseResponse<>(favoriteListService.addProductToFavorites(user, product));
    }

    @DeleteMapping("/{productId}")
    public BaseResponse<String> removeProductFromFavorites(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                           @PathVariable Long productId) {
        User user = userAuthDetails.getUser();
        ProductDto productDto = productService.getProductById(productId);
        Product product = productMapper.toModel(productDto);;
        return new BaseResponse<>(favoriteListService.removeProductFromFavorites(user, product));
    }

    @GetMapping()
    public BaseResponse<List<ProductDto>> getFavoriteProducts(@AuthenticationPrincipal UserAuthDetails userAuthDetails) {
        User user = userAuthDetails.getUser();
        return new BaseResponse<>(favoriteListService.getFavoriteProducts(user)) ;
    }
}
