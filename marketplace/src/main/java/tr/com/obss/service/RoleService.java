package tr.com.obss.service;

import org.springframework.stereotype.Service;
import tr.com.obss.model.Role;

import java.util.List;

@Service
public interface RoleService {

    void checkAndCreateRoles(List<String> roles);

    Role findByName(String admin);
}