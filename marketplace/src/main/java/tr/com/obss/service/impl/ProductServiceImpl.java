package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import tr.com.obss.common.Constants;
import tr.com.obss.dto.ProductDto;
import tr.com.obss.exception.CategoryNotFoundException;
import tr.com.obss.exception.ProductNotFoundException;
import tr.com.obss.exception.SellerNotFoundException;
import tr.com.obss.mapper.ProductMapper;
import tr.com.obss.model.Category;
import tr.com.obss.model.Product;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;
import tr.com.obss.repository.CategoryRepository;
import tr.com.obss.repository.ProductRepository;
import tr.com.obss.repository.SellerRepository;
import tr.com.obss.repository.UserRepository;
import tr.com.obss.service.BlackListService;
import tr.com.obss.service.ProductService;
import tr.com.obss.utils.StringUtils;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final BlackListService blackListService;


    @Override
    public ProductDto addProduct(Long categoryId, Product product) {
        Objects.requireNonNull(categoryId, "Category Id cannot be null");
        Objects.requireNonNull(product, "Product cannot be null");
        Objects.requireNonNull(product.getProductName(), "Product name cannot be null");
        Objects.requireNonNull(product.getDescription(), "Product description cannot be null");
        Objects.requireNonNull(product.getPrice(), "Product price cannot be null");
        Objects.requireNonNull(product.getImage(), "Product image cannot be null");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException(categoryId));

        category.addProduct(product);
        product.setCategory(category);
        return productMapper.toDto(productRepository.save(product));
    }

    @Override
    public ProductDto getProductById(Long productId) {
        Objects.requireNonNull(productId, "Product Id cannot be null");
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
        return productMapper.toDto(product);
    }

    @Override
    public Page<ProductDto> searchProducts(String search, Integer size, Integer page, String sort) {
        String sortField = (sort == null || sort.isBlank()) ? "id" : sort;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));

        Page<Product> productsPage;
        if (search == null || search.isBlank()) {
            productsPage = productRepository.findAllProducts(pageRequest);
        } else {
            productsPage = productRepository.findByProductNameContainingIgnoreCase(search, pageRequest);
        }

        return productsPage.map(productMapper::toDto);
    }


    @Override
    public Page<ProductDto> getVisibleProductsForUser(User user, String search, Integer size, Integer page, String sort) {
        Objects.requireNonNull(user, "User cannot be null");

        List<Seller> blockedSellers = blackListService.getBlockedSellers(user);
        List<Long> blockedSellerIds = blockedSellers.stream()
                .map(Seller::getId)
                .toList();

        String sortField = (sort == null || sort.isBlank()) ? "id" : sort;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));

        Page<Product> productsPage = productRepository.findAllBySellerIdNotInAndSearch(blockedSellerIds, search, pageRequest);

        long totalProducts = productsPage.getTotalElements();
        int totalPages = productsPage.getTotalPages();

        return productsPage.map(productMapper::toDto);
    }


    @Override
    public List<ProductDto> getProductsByCategory(User user,Long categoryId, Integer size, Integer page, String sort) {
        String sortField = (sort == null || sort.isBlank()) ? "id" : sort.trim();
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));

        List<Seller> blockedSellers = blackListService.getBlockedSellers(user);
        List<Long> blockedSellerIds = blockedSellers.stream()
                .map(Seller::getId)
                .toList();

        List<Product> productPage = productRepository.findByCategoryIdAndSellerIdNotIn(categoryId, blockedSellerIds, pageRequest);


        return productPage.stream().map(productMapper::toDto).toList();
    }

    @Override
    public List<ProductDto> getProductsBySeller(User user,Long sellerId, Integer size, Integer page, String sort) {
        String sortField = (sort == null || sort.isBlank()) ? "id" : sort.trim();
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Order.asc(sortField)));

        List<Seller> blockedSellers = blackListService.getBlockedSellers(user);
        List<Long> blockedSellerIds = blockedSellers.stream()
                .map(Seller::getId)
                .toList();

        List<Product> productPage;
        if (blockedSellerIds.contains(sellerId)) {
             productPage = Collections.emptyList();
        } else {
            productPage = productRepository.findBySellerId(sellerId, pageRequest);
        }

        return productPage.stream().map(productMapper::toDto).toList();
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto productDto) {
        Objects.requireNonNull(productId, "Product Id cannot be null");

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));


        if(StringUtils.isNotBlank((productDto.getProductName()))){
            existingProduct.setProductName(productDto.getProductName());
        }
        if(StringUtils.isNotBlank((productDto.getDescription()))){
            existingProduct.setDescription(productDto.getDescription());
        }
        if(StringUtils.isNotBlank((productDto.getImage()))){
            existingProduct.setDescription(productDto.getImage());
        }
        if(productDto.getCategory() != null){
            existingProduct.setCategory(categoryRepository.findById(productDto.getCategory().getCategoryId())
                    .orElseThrow(() -> new CategoryNotFoundException(productDto.getCategory().getCategoryId())));
        }
        if (productDto.getPrice() != null){
            existingProduct.setPrice(productDto.getPrice());
        }

        Product updatedProduct = productRepository.save(existingProduct);
        return productMapper.toDto(updatedProduct);
    }

//TO-DO IMAGE

    @Override
    public String deleteProduct(Long productId) {
        Objects.requireNonNull(productId, "Product Id cannot be null");

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));

        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public void generateSampleProducts(int targetProductSize) {
        List<Product> products = new ArrayList<>();

        for (int i = 0; i < targetProductSize; i++) {
            final ProductDto productDto = ProductDto.builder()
                    .productName("Product " + i)
                    .description("Description for Product " + i)
                    .price(10.0 * i)
                    .image("https://res.cloudinary.com/dxguqzge7/image/upload/v1682838761/Book_lc6ikb.jpg")
                    .build();

            final Product productModel = productMapper.toModel(productDto);
            products.add(productModel);

        }
        productRepository.saveAll(products);
    }

}
