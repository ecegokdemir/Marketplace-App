package tr.com.obss.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.model.Product;
import tr.com.obss.model.User;
import tr.com.obss.security.UserAuthDetails;
import tr.com.obss.service.ProductService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public BaseResponse<ProductDto> addProduct(@RequestParam Long categoryId, @RequestBody Product product) {
        return new BaseResponse<>(productService.addProduct(categoryId, product));
    }

    @GetMapping("/{id}")
    public BaseResponse<ProductDto> getProductById(@PathVariable Long id) {
        return new BaseResponse<>(productService.getProductById(id));
    }

    @GetMapping
    public BaseResponse<List<ProductDto>> searchProducts(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                             @RequestParam(name="search", required = false) String search,
                                                             @RequestParam(value="size", required = false, defaultValue = "10") Integer size,
                                                             @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                             @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        User user = userAuthDetails.getUser();
        Page<ProductDto> productPage = productService.getVisibleProductsForUser(user, search, size, page, sort);

        return new BaseResponse<>(
                productPage.getContent(),
                productPage.getTotalPages(),
                productPage.getTotalElements(),
                page
        );
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public BaseResponse<List<ProductDto>> searchProducts(@RequestParam(name="search", required = false) String search,
                                                           @RequestParam(value="size", required = false, defaultValue = "10") Integer size,
                                                           @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                           @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        Page<ProductDto> productPage = productService.searchProducts(search, size, page, sort);
        return new BaseResponse<>(
                productPage.getContent(),
                productPage.getTotalPages(),
                productPage.getTotalElements(),
                page
        );
    }

    @GetMapping("/category/{categoryId}")
    public BaseResponse<List<ProductDto>> getProductsByCategory(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                                @PathVariable Long categoryId,
                                                           @RequestParam(value="size", required = false, defaultValue = "10") Integer size,
                                                           @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                           @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        User user = userAuthDetails.getUser();
        return new BaseResponse<>(productService.getProductsByCategory(user,categoryId, size, page, sort));
    }

    @GetMapping("/seller/{sellerId}")
    public BaseResponse<List<ProductDto>> getProductsBySeller(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                              @PathVariable Long sellerId,
                                                           @RequestParam(value="size", required = false, defaultValue = "10") Integer size,
                                                           @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                           @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        User user = userAuthDetails.getUser();
        return new BaseResponse<>(productService.getProductsBySeller(user,sellerId, size, page, sort));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public BaseResponse<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {

        ProductDto updatedProduct = ProductDto.builder()
                .productName(productDto.getProductName())
                .description(productDto.getDescription())
                .price(productDto.getPrice())
                .category(productDto.getCategory())
                .seller(productDto.getSeller())
                .image(productDto.getImage())
                .build();

        return new BaseResponse<>(productService.updateProduct(id, updatedProduct));
    }


//TO-DO image update

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteProduct(@PathVariable Long id) {
        return new BaseResponse<>(productService.deleteProduct(id));
    }
}
