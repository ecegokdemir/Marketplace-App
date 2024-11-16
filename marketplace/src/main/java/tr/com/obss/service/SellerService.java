
package tr.com.obss.service;

import org.springframework.stereotype.Service;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.dto.UserDto;
import tr.com.obss.model.Product;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;

import java.util.List;
import java.util.Optional;

public interface SellerService {

    SellerDto createSeller(Seller seller);

    SellerDto updateSeller(Long id, SellerDto sellerDto);

    String deleteSeller(Long id);

    SellerDto findBySellerId(Long id);

    List<SellerDto> searchSellers(User user,String search, Integer size, Integer page, String sort);

    void generateSampleSellers(int targetSellerSize);

    SellerDto assignProductToSeller(Long id, Long productId);

    SellerDto removeProductFromSeller(Long id, Long productId);


}


