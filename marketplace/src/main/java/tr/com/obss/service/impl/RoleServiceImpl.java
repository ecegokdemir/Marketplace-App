package tr.com.obss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import tr.com.obss.exception.RoleNotFoundException;
import tr.com.obss.model.Role;
import tr.com.obss.repository.RoleRepository;
import tr.com.obss.service.RoleService;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public void checkAndCreateRoles(List<String> roles) {
        if(CollectionUtils.isEmpty(roles)) {
            return;
        }

        roles.forEach(role -> {
            roleRepository.findByName(role).orElseGet(() -> roleRepository.save(new Role(role)));
        });
    }

    @Override
    public Role findByName(String roleName) {
        return roleRepository.findByName(roleName).orElseThrow(() -> new RoleNotFoundException("Role not found"));
    }
}
