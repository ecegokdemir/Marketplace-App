package tr.com.obss.utils;

import lombok.experimental.UtilityClass;
import java.util.Objects;
import java.util.Random;

@UtilityClass
public class StringUtils {
    public static boolean isBlank(String str){
        return Objects.isNull(str) || str.trim().isEmpty();
    }

    public static boolean isNotBlank(String str){
        return !isBlank(str);
    }

    public static String geneateRandomString(int targetStringLength){
        int leftLimit = 48;
        int rightLimit = 122;
        Random random = new Random();

        return random
                .ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

    }

    public static String EMPTY = "";

}
