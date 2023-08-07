package com.santa.projectservice.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {
    private long id;
    private Long userId;
    private Long pjtId;
    private Boolean type;
    private Boolean confirm;
    private Boolean alarm;
    @Builder
    public RegisterDto(long id, Long userId, Long pjtId, Boolean type, Boolean confirm, Boolean alarm) {
        this.id = id;
        this.userId = userId;
        this.pjtId = pjtId;
        this.type = type;
        this.confirm = confirm;
        this.alarm = alarm;
    }
}
