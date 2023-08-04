package com.santa.alarm.service;

import com.santa.alarm.Enum.EmailType;
import com.santa.alarm.Enum.ResponseStatus;
import com.santa.alarm.dto.EmailDto;
import com.santa.alarm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;


import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final String INVALID_EMAIL_MSG = "메일 주소 형식이 잘못되었거나 전송할 수 없는 메일 주소 형식입니다.";

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    private final SpringTemplateEngine templateEngine;

    @Autowired
    private final UserRepository userRepository;

    /**
     *  알람 서비스 -> 스케줄러로 실행함
     *  매일 23시 59분에 알람 보낼 유저들에게 이메일을 보낸다.
     */
    @Scheduled(cron = "0 59 23 * * *")
    private void dailyTaskAlarm() {
        for (EmailDto emailDto : userRepository.findUsersAndProjectsWithCriteria()) {
            sendMail(emailDto, EmailType.Alarm);
        }
    }

    /**
     * 이메일을 보내는 함수
     * 이메일 보내는 상황 : 회원가입 인증 메일(인증번호), 비밀번호 찾기(임시 비밀번호), 알림(닉네임, 프로젝트명)
     * @param emailDto 이메일 받는 사용자, 이메일 제목, 내용에 들어갈 데이터(Map<String, String>)
     * @param emailType type에 따라 맞는 html 템플릿이 적용됨.
     * @return ResponseEntity<String>
     * @throws SendFailedException
     */
    public ResponseEntity<String> sendMail(EmailDto emailDto, EmailType emailType) {
        try {
            javaMailSender.send(makeMail(emailDto, emailType));
        } catch (MailSendException e) {
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        }
        log.info(String.format("send mail to %s for %s", emailDto.getTo(), emailType));
        return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
    }

    /**
     * 보낼 이메일을 만드는 함수
     * @param emailDto 메일 받는 사용자, 이메일 제목, 내용에 들어갈 데이터(Map<String, String>)
     * @param emailType type에 따라 맞는 html 템플릿이 적용됨.
     * @return MimeMessage 만들어진 메일 내용을 리턴한다.
     */
    private MimeMessage makeMail(EmailDto emailDto, EmailType emailType) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailDto.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(emailType.getEmailTitle()); // 메일 제목
            mimeMessageHelper.setText(setContext(emailDto.getContextData(), emailType.name()), true); // 메일 본문 내용, HTML 여부
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        return mimeMessage;
    }

    /**
     * thymeleaf를 통한 html 적용
     * @param contextDataMap 메일 내용에 필요한 데이터들의 Map
     * @param type type에 맞는 html 템플릿을 적용함
     * @return 적용된 결과를 반환한다.
     */
    private String setContext(Map<String, String> contextDataMap, String type) {
        Context context = new Context();
        for (Map.Entry<String, String> data : contextDataMap.entrySet()) {
            if (data == null) continue;
            context.setVariable(data.getKey(), data.getValue());
        }
        return templateEngine.process(type, context);
    }
}
