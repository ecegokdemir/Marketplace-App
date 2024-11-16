package tr.com.obss.common;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Constants {

    public static final String ADMIN_USER = "admin";

    @UtilityClass
    public static class ResponseCodes {
        public static final Long SUCCESS = 10000L;
        public static final Long UNKNOWN_ERROR = 10001L;
        public static final Long USER_NOT_FOUND = 10002L;
        public static final Long ACCESS_DENIED = 10003L;
    }

    @UtilityClass
    public static class Roles {
        public static final String ADMIN = "ROLE_ADMIN";
        public static final String USER = "ROLE_USER";
    }
}