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
    private long id;
    private Long userId;
    private Long pjtId;
    private Boolean type;
    private Boolean confirm;
    private Boolean alarm;
}
