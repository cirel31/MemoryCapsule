package com.santa.alarm.controller;

import com.santa.alarm.Enum.EmailContextDataType;
import com.santa.alarm.Enum.EmailType;
import com.santa.alarm.dto.EmailDto;
import com.santa.alarm.service.EmailService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequestMapping("/email")
@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Object> send() {
//        emailService.send2();

        // 결과 반환
        return ResponseEntity.ok(true);
    }

    @PostMapping("/send2")
    public ResponseEntity<Object> send2() {
        System.out.println("1111111");
        // 결과 반환
        return ResponseEntity.ok(true);
    }

    @ApiOperation(value = "회원 가입 인증 메일", notes = "이메일 전송 결과 메시지를 반환한다.", response = String.class)
    @PostMapping("/register_verify/{user_email}/{code}")
    public ResponseEntity<String> sendCheckMail
            (@PathVariable("user_email") @ApiParam(value = "회원가입한 유저의 이메일", required = true) String user_email,
                @PathVariable("code") @ApiParam(value = "인증 번호", required = true)  String code) {
        Map<String, String> contextDataMap = new HashMap<>();
        contextDataMap.put(EmailContextDataType.code.name(), code);
        EmailDto emailDto = EmailDto.builder()
                .to(user_email)
                .contextData(contextDataMap)
                .build();
        return emailService.sendMail(emailDto, EmailType.Register_verify);
    }

    @ApiOperation(value = "임시 비밀번호 발송 메일", notes = "이메일 전송 결과 메시지를 반환한다.", response = String.class)
    @PostMapping("/tmp_pwd/{user_email}/{tmp_pwd}")
    public ResponseEntity<String> sendFindTmpPwd
            (@PathVariable("user_email") @ApiParam(value = "회원가입한 유저의 이메일", required = true) String user_email,
             @PathVariable("tmp_pwd") @ApiParam(value = "임시 비밀번호", required = true)  String tmp_pwd) {
        Map<String, String> contextDataMap = new HashMap<>();
        contextDataMap.put(EmailContextDataType.tmpPwd.name(), tmp_pwd);
        EmailDto emailDto = EmailDto.builder()
                .to(user_email)
                .contextData(contextDataMap)
                .build();
        return emailService.sendMail(emailDto, EmailType.Temp_password);
//        return emailService.prepareMail(user_email, tmp_pwd, EmailContextData.tmpPwd, EmailType.Temp_password);
//        Map<String, String> initContextData = new HashMap<>();
//        initContextData.put(EmailContextDataType.tmpPwd.name(), tmp_pwd);
//
//        EmailDto emailDto = EmailDto.builder()
//                .to(user_email)
//                .title(EmailType.Temp_password.getEmailTitle())
//                .contextDataMap(initContextData)
//                .build();
//        try {
//            emailService.sendMail(emailDto, EmailType.Temp_password.name());
//        } catch (SendFailedException e) {
//            log.error(INVALID_EMAIL_MSG, e);
//            return new ResponseEntity(ResponseStatus.Fail, HttpStatus.NO_CONTENT);
//        }
//        log.info(String.format("send mail to %s for %s", user_email, EmailType.Temp_password));
    }


}