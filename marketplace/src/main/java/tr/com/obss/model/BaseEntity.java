package tr.com.obss.model;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import tr.com.obss.utils.SecurityUtils;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@MappedSuperclass
public class BaseEntity implements Serializable {

    private String createdBy;
    private String updatedBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        setCreatedAt(LocalDateTime.now());
        setUpdatedAt(LocalDateTime.now());
        final String CurrentUser = SecurityUtils.getCurrentUser();
        setCreatedBy(CurrentUser);
        setUpdatedBy(CurrentUser);
    }

    @PreUpdate
    public void preUpdate() {
        setUpdatedAt(LocalDateTime.now());
        setUpdatedBy(SecurityUtils.getCurrentUser());
    }
}
