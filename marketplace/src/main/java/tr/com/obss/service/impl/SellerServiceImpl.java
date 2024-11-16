package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tr.com.obss.dto.CategoryDto;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.exception.CategoryNotFoundException;
import tr.com.obss.exception.SellerNotFoundException;
import tr.com.obss.model.Category;
import tr.com.obss.model.Product;
import tr.com.obss.model.Seller;
import tr.com.obss.mapper.SellerMapper;
import tr.com.obss.model.User;
import tr.com.obss.repository.ProductRepository;
import tr.com.obss.repository.SellerRepository;
import tr.com.obss.service.BlackListService;
import tr.com.obss.service.SellerService;
import tr.com.obss.utils.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class SellerServiceImpl implements SellerService {

    private final BlackListService blackListService;
    private final SellerRepository sellerRepository;
    private final SellerMapper sellerMapper;
    private final ProductRepository productRepository;

    @Override
    public SellerDto createSeller(Seller seller) {
        Objects.requireNonNull(seller, "Seller cannot be null");
        Objects.requireNonNull(seller.getName(), "Seller name cannot be null");

        return sellerMapper.toDto(sellerRepository.save(seller));
    }

    @Override
    public SellerDto updateSeller(Long id, SellerDto sellerDto) {
        Objects.requireNonNull(id, "id cannot be null");

        Seller existingSeller = sellerRepository.findById(id).orElseThrow(() -> new SellerNotFoundException(id));

        if(StringUtils.isNotBlank((sellerDto.getName()))){
            existingSeller.setName(sellerDto.getName());
        }
            Seller updatedSeller = sellerRepository.save(existingSeller);
            return sellerMapper.toDto(updatedSeller);
    }

    @Override
    public String deleteSeller(Long id) {
        Objects.requireNonNull(id, "id cannot be null");

        Seller seller = sellerRepository.findSellerById(id)
                .orElseThrow(() -> new SellerNotFoundException(id));

        sellerRepository.delete(seller);
        return "Seller deleted successfully";
    }

    @Override
    public SellerDto findBySellerId(Long id) {
        Objects.requireNonNull(id, "id cannot be null");
        return sellerRepository.findById(id).map(sellerMapper::toDto).orElseThrow(() -> new SellerNotFoundException(id));
    }

    @Override
    public List<SellerDto> searchSellers(User user , String search, Integer size, Integer page, String sort) {
        String sortField = StringUtils.isBlank(sort) ? "id" : sort;
        final PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortField));

        List<Seller> blockedSellers = blackListService.getBlockedSellers(user);
        List<Long> blockedSellerIds = blockedSellers.stream()
                .map(Seller::getId)
                .toList();

        List<Seller> sellers;
        if (StringUtils.isBlank(search)) {
            sellers = sellerRepository.findAllSellersExcludingBlocked(blockedSellerIds, pageRequest);
        } else {
            sellers = sellerRepository.findSellersByNameContainingIgnoreCaseAndIdNotIn(search, blockedSellerIds, pageRequest);
        }

        return sellers.stream().map(sellerMapper::toDto).toList();
    }

    @Override
    public void generateSampleSellers(int targetSellerSize) {
        List<Seller> sellers = new ArrayList<>();
        for (int i = 0; i < targetSellerSize; i++) {
            final SellerDto sellerDto = SellerDto.builder()
                    .name("Seller " + i)
                    .build();

            final Seller sellerModel = sellerMapper.toModel(sellerDto);
            sellers.add(sellerModel);
        }
        sellerRepository.saveAll(sellers);
    }

    @Override
    public SellerDto assignProductToSeller(Long id, Long productId) {
        Objects.requireNonNull(id, "id cannot be null");
        Objects.requireNonNull(productId, "productId cannot be null");

        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new SellerNotFoundException(id));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        seller.addProduct(product);
        product.setSeller(seller);
        sellerRepository.save(seller);
        return sellerMapper.toDto(seller);

    }

    @Override
    public SellerDto removeProductFromSeller(Long id, Long productId) {
        Objects.requireNonNull(id, "id cannot be null");
        Objects.requireNonNull(productId, "productId cannot be null");

        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new SellerNotFoundException(id));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        seller.removeProduct(product);
        product.setSeller(null);
        sellerRepository.save(seller);
        return sellerMapper.toDto(seller);
    }
}

