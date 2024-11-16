package tr.com.obss.common;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import tr.com.obss.model.Role;
import tr.com.obss.model.User;
import tr.com.obss.service.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Configuration
public class DataLoader implements ApplicationRunner {

    private final UserService userService;
    private final RoleService roleService;
    private final CategoryService categoryService;
    private final ProductService productService;
    private final SellerService sellerService;
    private final BlackListService blackListService;

    @Transactional
    @Override
    public void run(ApplicationArguments args) throws Exception {

        final int targetUserSize = 5;
//        roleService.checkAndCreateRoles(List.of(Constants.Roles.ADMIN, Constants.Roles.USER));
//        userService.generateSampleUsers(targetUserSize);
//        userService.checkAndCreateAdminUser();
//       sellerService.generateSampleSellers(5);
        //categoryService.generateSampleCategories(5);
      // productService.generateSampleProducts(7);
//        userService.createTestUser();
      //  blackListService.generateSampleBlackListData(1);



    }

}
