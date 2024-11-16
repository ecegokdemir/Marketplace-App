package tr.com.obss.dto;

import lombok.Getter;
import lombok.Setter;
import tr.com.obss.common.Constants;

@Getter
@Setter
public class BaseResponse<T> {
    private Long code;
    private String message;
    private T payload;

    private Integer totalPages;
    private Long totalElements;
    private Integer currentPage;

    public BaseResponse(T payload) {
        this.payload = payload;
        this.code = Constants.ResponseCodes.SUCCESS;
    }

    public BaseResponse(Long code, T payload) {
        this.code = code;
        this.payload = payload;
    }

    public BaseResponse(T payload, Integer totalPages, Long totalElements, Integer currentPage) {
        this.payload = payload;
        this.code = Constants.ResponseCodes.SUCCESS;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.currentPage = currentPage;
    }

    public BaseResponse(Long code, T payload, Integer totalPages, Long totalElements, Integer currentPage) {
        this.code = code;
        this.payload = payload;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.currentPage = currentPage;
    }
}
