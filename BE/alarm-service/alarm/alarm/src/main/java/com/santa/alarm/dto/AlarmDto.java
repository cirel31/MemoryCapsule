package com.santa.alarm.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AlarmDto {
    private String userEmail;
    private String userNickname;
    private String pjtTitle;
}
