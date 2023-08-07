package com.santa.alarm.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmailDto {
    private String to;
    private Map<String, String> contextData;
}
