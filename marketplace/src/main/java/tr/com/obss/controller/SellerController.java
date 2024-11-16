package tr.com.obss.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.mapper.UserMapper;
import tr.com.obss.model.Product;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;
import tr.com.obss.security.UserAuthDetails;
import tr.com.obss.service.SellerService;
import tr.com.obss.service.UserService;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/sellers")
public class SellerController {

    private final UserMapper userMapper;
    private final SellerService sellerService;
    private final UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public BaseResponse<SellerDto> createSeller(@RequestBody Seller seller) {
        return new BaseResponse<>(sellerService.createSeller(seller));
    }

    @GetMapping("/{id}")
    public BaseResponse<SellerDto> getSeller(@PathVariable Long id) {
        return new BaseResponse<>(sellerService.findBySellerId(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public BaseResponse<SellerDto> updateSeller(@PathVariable Long id, @RequestBody Seller seller) {

        SellerDto sellerDto = SellerDto.builder()
                .name(seller.getName())
                .build();
        return new BaseResponse<>(sellerService.updateSeller(id, sellerDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteSeller(@PathVariable Long id) {
        return new BaseResponse<>(sellerService.deleteSeller(id));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{sellerId}/products/{productId}")
    public BaseResponse<SellerDto> assignProductToSeller(@PathVariable Long sellerId, @PathVariable Long productId) {
        SellerDto sellerDto = sellerService.assignProductToSeller(sellerId, productId);
        return new BaseResponse<>(sellerDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/{sellerId}/remove-product/{productId}")
    public BaseResponse<SellerDto> removeProductFromSeller(@PathVariable Long sellerId, @PathVariable Long productId) {
        SellerDto sellerDto = sellerService.removeProductFromSeller(sellerId, productId);
        return new BaseResponse<>(sellerDto);
    }

    @GetMapping
    public BaseResponse<List<SellerDto>> searchSellers(@AuthenticationPrincipal UserAuthDetails userAuthDetails,
                                                       @RequestParam(name="search", required = false) String search,
                                                       @RequestParam(value="size", required = false, defaultValue = "5") Integer size,
                                                       @RequestParam(value="page", required = false, defaultValue = "0") Integer page,
                                                       @RequestParam(value="sort", required = false, defaultValue = "id") String sort) {
        User user = userAuthDetails.getUser();
        return new BaseResponse<>(sellerService.searchSellers(user,search, size, page, sort));
    }
}

