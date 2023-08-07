package com.example.userservice.model.Enum;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProjectType {
    PERSONAL("개인용 프로젝트"),
    GROUP("그룹용 프로젝트");

    private String desc;
}
