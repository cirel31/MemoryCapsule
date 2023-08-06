package com.example.userservice.model.Enum;


import lombok.AllArgsConstructor;
import lombok.Getter;


@AllArgsConstructor
@Getter
public enum ProjectState {
    IN_PROGRESS("진행중"),
    DONE("완료");

    private String desc;
}
