package tr.com.obss.service;

import org.springframework.stereotype.Service;
import tr.com.obss.model.Seller;
import tr.com.obss.model.User;

import java.util.List;
import java.util.UUID;

@Service
public interface BlackListService {

    String blockSeller(User user, Seller seller);

    String unblockSeller(User user, Seller seller);

    List<Seller> getBlockedSellers(User user);

    void generateSampleBlackListData(int numberOfEntries);

}
