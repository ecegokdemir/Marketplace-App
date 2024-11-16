package tr.com.obss.exception;

public class SellerNotFoundException extends BaseException {

    public SellerNotFoundException(Long id) {
        super(String.format("Seller with id %s not found", id));
    }
}

