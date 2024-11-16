package tr.com.obss.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.dto.BaseResponse;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.mapper.SellerMapper;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;
import tr.com.obss.repository.UserRepository;
import tr.com.obss.security.UserAuthDetails;
import tr.com.obss.service.BlackListService;
import tr.com.obss.service.SellerService;
import tr.com.obss.service.UserService;
import tr.com.obss.exception.UserNotFoundException;
import tr.com.obss.exception.SellerNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/blacklist")
@RequiredArgsConstructor
public class BlackListController {

    private final BlackListService blackListService;
    private final SellerService sellerService;
    private final SellerMapper sellerMapper;
    private final UserRepository userRepository;

    @PostMapping("/block")
    public BaseResponse<String> blockSeller(@AuthenticationPrincipal UserAuthDetails userAuthDetails, @RequestParam Long sellerId) {
        User user = userAuthDetails.getUser();
        SellerDto sellerDto = sellerService.findBySellerId(sellerId);
        Seller seller = sellerMapper.toModel(sellerDto);

        return new BaseResponse<>(blackListService.blockSeller(user, seller));
    }

    @DeleteMapping("/{sellerId}")
    public BaseResponse<String> unblockSeller(@AuthenticationPrincipal UserAuthDetails userAuthDetails, @PathVariable Long sellerId) {
        User user = userAuthDetails.getUser();
        SellerDto sellerDto = sellerService.findBySellerId(sellerId);
        Seller seller = sellerMapper.toModel(sellerDto);

        return new BaseResponse<>(blackListService.unblockSeller(user, seller));
    }

    @GetMapping
    public BaseResponse<List<Seller>> getBlockedSellers(@AuthenticationPrincipal UserAuthDetails userAuthDetails) {
        User user = userAuthDetails.getUser();
        return new BaseResponse<>(blackListService.getBlockedSellers(user));
    }
}
