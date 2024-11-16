package tr.com.obss.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tr.com.obss.common.Constants;
import tr.com.obss.dto.BaseResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<BaseResponse> handleException(Exception e) {
        return new ResponseEntity<>(new BaseResponse<>(Constants.ResponseCodes.UNKNOWN_ERROR, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<BaseResponse> handleUserNotFoundException(UserNotFoundException e) {
        return new ResponseEntity<>(new BaseResponse<>(Constants.ResponseCodes.USER_NOT_FOUND, e.getMessage()), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<BaseResponse> handleException(AccessDeniedException e) {
        return new ResponseEntity<>(new tr.com.obss.dto.BaseResponse<>(Constants.ResponseCodes.ACCESS_DENIED, e.getMessage()), HttpStatus.FORBIDDEN);
    }
}