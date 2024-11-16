package tr.com.obss.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.obss.model.User;
import tr.com.obss.service.UserService;

@RequiredArgsConstructor
@Service
public class UserAuthService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new UserAuthDetails(user);
    }
}
