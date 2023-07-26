package com.santa.alarm.Enum;

import lombok.Getter;

@Getter
public enum EmailType {
    Register_verify("[추억 터트리기] 회원 가입 인증 메일 안내"),
    Temp_password("[추억 터트리기] 임시 비밀번호 발급 안내");

    private String emailTitle;

    EmailType(String emailTitle) {
        this.emailTitle = emailTitle;
    }
}
