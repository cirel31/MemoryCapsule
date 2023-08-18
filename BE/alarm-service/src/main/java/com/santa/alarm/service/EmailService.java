package com.santa.alarm.service;

import com.santa.alarm.Enum.EmailType;
import com.santa.alarm.dto.EmailDto;
import org.springframework.http.ResponseEntity;

public interface EmailService {
//    void dailyTaskAlarm();
    ResponseEntity<String> sendMail(EmailDto emailDto, EmailType emailType);
}
