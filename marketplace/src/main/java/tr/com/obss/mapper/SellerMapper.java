
package tr.com.obss.mapper;
import org.springframework.stereotype.Component;
import tr.com.obss.dto.SellerDto;
import tr.com.obss.model.Seller;

@Component
public class SellerMapper {

    public SellerDto toDto(Seller seller) {
        if (seller == null) {
            return null;
        }

        SellerDto dto = new SellerDto();
        dto.setId(seller.getId());
        dto.setName(seller.getName());

        return dto;
    }

    public Seller toModel(SellerDto dto) {
        if (dto == null) {
            return null;
        }

        Seller seller = new Seller();
        seller.setId(dto.getId());
        seller.setName(dto.getName());

        return seller;
    }
}

