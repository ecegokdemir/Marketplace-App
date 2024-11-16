package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.exception.UserNotFoundException;
import tr.com.obss.mapper.ProductMapper;
import tr.com.obss.model.BlackList;
import tr.com.obss.model.Product;
import tr.com.obss.model.User;
import tr.com.obss.model.Seller;
import tr.com.obss.repository.BlackListRepository;
import tr.com.obss.repository.SellerRepository;
import tr.com.obss.repository.UserRepository;
import tr.com.obss.service.BlackListService;
import tr.com.obss.service.FavoriteListService;

import java.util.*;

@RequiredArgsConstructor
@Service
public class BlackListServiceImpl implements BlackListService {

    private final BlackListRepository blackListRepository;
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final FavoriteListService favoriteListService;
    private final ProductMapper productMapper;

    @Transactional
    @Override
    public String blockSeller(User user, Seller seller) {
        Objects.requireNonNull(user, "User cannot be null");
        Objects.requireNonNull(seller, "Seller cannot be null");

        if (!blackListRepository.existsByUserAndSeller(user, seller)) {
            BlackList blackList = new BlackList();
            blackList.setUser(user);
            blackList.setSeller(seller);
            blackListRepository.save(blackList);


            List<ProductDto> favoriteProducts = favoriteListService.getFavoriteProducts(user);
            for (ProductDto productDto : favoriteProducts) {
                if (productDto.getSeller().getId().equals(seller.getId())) {
                    Product product = productMapper.toModel(productDto);
                    favoriteListService.removeProductFromFavorites(user, product);
                }
            }

            return "Seller blocked successfully";



        }
            return "Seller already blocked";
    }

    @Transactional
    @Override
    public String unblockSeller(User user, Seller seller) {
        Objects.requireNonNull(user, "User cannot be null");
        Objects.requireNonNull(seller, "Seller cannot be null");

        BlackList blackList = blackListRepository.findByUserAndSeller(user, seller);
        if (blackList != null) {
            blackListRepository.delete(blackList);
            return "Seller unblocked successfully";
        }

       return "Seller not found in the blacklist";
    }

    @Override
    public List<Seller> getBlockedSellers(@AuthenticationPrincipal User user) {
        Objects.requireNonNull(user, "User cannot be null");
        List<BlackList> blackListEntries = blackListRepository.findByUser(user);

        return blackListEntries.stream()
                .map(BlackList::getSeller)
                .toList();
    }

    @Transactional
    @Override
    public void generateSampleBlackListData(int numberOfEntries) {

        final PageRequest pageRequest = PageRequest.of(0, numberOfEntries);
        List<User> users = userRepository.findAllUsers(pageRequest);
        Seller seller = sellerRepository.findSellerById(9L).orElseThrow();

        for (int i = 0; i < numberOfEntries; i++) {
            User User = users.getFirst();

            // Eğer kullanıcı zaten satıcıyı engellemişse yeni bir kayıt oluşturmayın
            if (!blackListRepository.existsByUserAndSeller(User, seller)) {
                BlackList blackList = new BlackList();
                blackList.setUser(User);
                blackList.setSeller(seller);
                blackListRepository.save(blackList);
            }
        }
    }
}
