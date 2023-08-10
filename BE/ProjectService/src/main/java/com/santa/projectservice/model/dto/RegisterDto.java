package com.santa.projectservice.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {
    private long id;
    private Long userId;
    private Long projectId;
    private Boolean type;
    private Boolean confirm;
    private Boolean alarm;
    @Builder
    public RegisterDto(long id, Long userId, Long projectId, Boolean type, Boolean confirm, Boolean alarm) {
        this.id = id;
        this.userId = userId;
        this.projectId = projectId;
        this.type = type;
        this.confirm = confirm;
        this.alarm = alarm;
    }
}
