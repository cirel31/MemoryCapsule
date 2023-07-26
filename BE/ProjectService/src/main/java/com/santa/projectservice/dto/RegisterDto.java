package com.santa.projectservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import javax.ws.rs.DefaultValue;

@Data
public class RegisterDto {
    private long rgstr_idx;
    private Long rgstr_user_idx;
    private Long rgstr_pjt_idx;
    private Boolean rgstr_type;
    private Boolean rgstr_confirm;
    private Boolean rgstr_alarm;
}
