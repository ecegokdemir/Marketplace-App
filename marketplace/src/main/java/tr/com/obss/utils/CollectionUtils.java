package tr.com.obss.utils;

import tr.com.obss.model.Role;

import java.util.List;

public class CollectionUtils {
    public static boolean isNotEmpty(List<Role> roles) {
        return roles != null && !roles.isEmpty();
    }
}
