package com.santa.alarm.controller;

import com.santa.alarm.Enum.EmailContextDataType;
import com.santa.alarm.Enum.EmailType;
import com.santa.alarm.dto.EmailDto;
import com.santa.alarm.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Slf4j
@RequestMapping("/email")
@RestController
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/health-check")
    public ResponseEntity health_check(){
        return ResponseEntity.status(HttpStatus.OK).body("Hello alarm-service");
    }

    @PostMapping("/register_verify/{user_email}/{code}")
    public ResponseEntity<String> sendCheckMail
            (@PathVariable("user_email") String user_email,
                @PathVariable("code") String code) {
        System.out.println(user_email + " " + code);
        Map<String, String> contextDataMap = new HashMap<>();
        contextDataMap.put(EmailContextDataType.code.name(), code);
        EmailDto emailDto = EmailDto.builder()
                .to(user_email)
                .contextData(contextDataMap)
                .build();
        return emailService.sendMail(emailDto, EmailType.Register_verify);
    }

    @PostMapping("/tmp_pwd/{user_email}/{tmp_pwd}")
    public ResponseEntity<String> sendFindTmpPwd
            (@PathVariable("user_email") String user_email,
             @PathVariable("tmp_pwd") String tmp_pwd) {
        Map<String, String> contextDataMap = new HashMap<>();
        contextDataMap.put(EmailContextDataType.tmpPwd.name(), tmp_pwd);
        EmailDto emailDto = EmailDto.builder()
                .to(user_email)
                .contextData(contextDataMap)
                .build();
        return emailService.sendMail(emailDto, EmailType.Temp_password);
    }
}