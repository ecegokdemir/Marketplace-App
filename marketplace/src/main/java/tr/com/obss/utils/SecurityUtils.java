package tr.com.obss.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import tr.com.obss.security.UserAuthDetails;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;

@UtilityClass
public class SecurityUtils {

    public static String getCurrentUser() {
        if(SecurityContextHolder.getContext().getAuthentication()!=null && SecurityContextHolder.getContext() != null){
            final Object authPrincipal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(authPrincipal instanceof UserAuthDetails){
                return ((UserAuthDetails) authPrincipal).getUsername();
            }
            return authPrincipal.toString();
        }
        return StringUtils.EMPTY;
    }
}
