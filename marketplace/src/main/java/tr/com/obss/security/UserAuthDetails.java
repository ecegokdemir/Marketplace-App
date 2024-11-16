package tr.com.obss.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import tr.com.obss.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import tr.com.obss.utils.CollectionUtils;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

@RequiredArgsConstructor
public class UserAuthDetails implements UserDetails {
    private final User user;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(Objects.nonNull(user) && CollectionUtils.isNotEmpty(user.getRoles())){
            return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).toList();
        }
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    public User getUser() {
        return user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return user.getEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
}
