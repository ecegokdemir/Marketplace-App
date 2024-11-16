package tr.com.obss.exception;

public class UserNotFoundException extends BaseException {

    public UserNotFoundException(String userId) {
        super(String.format("User with id %s not found", userId));
    }
}
