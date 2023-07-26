package com.santa.alarm.service;

import com.santa.alarm.Enum.EmailContextDataType;
import com.santa.alarm.Enum.EmailType;
import com.santa.alarm.Enum.ResponseStatus;
import com.santa.alarm.dto.AlarmDto;
import com.santa.alarm.dto.EmailDto;
import com.santa.alarm.exception.EmailSendFailException;
import com.santa.alarm.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;


import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Map;
import java.util.Properties;

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
     *  매일 23시 59분에 알람 보낼 유저들에게 이메일을 보낸다.
     */
    @Override
    @Scheduled(cron = "0 59 23 * * *")
    public void dailyTaskAlarm() {
        for (AlarmDto userInfo : getUsersCheckAlarm()) {
            send(userInfo);
        }
    }

    /**
     * alarm을 보낼 User들의 정보를 얻어낸다
     * @return Object[]의 List, Object[]에는 순서대로 이메일, 닉네임, 프로젝트제목
     */
    private List<AlarmDto> getUsersCheckAlarm() {
        return userRepository.findUsersAndProjectsWithCriteria();
    }

    private void send(AlarmDto userInfo) {
        // 이메일 발신될 데이터 적재
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo((String) userInfo[0]); //보낼 이메일
        simpleMailMessage.setSubject("test title"); //제목
        simpleMailMessage.setText(userInfo[1] + "님 " + "프로젝트에 글을 작성하지 않으셔서 이메일을 보냅니다."); //내용
        Properties props = new Properties();
        props.put("mail.smtp.ssl.enable", "true");

        // 이메일 발신
        javaMailSender.send(simpleMailMessage);
    }

    /**
     * 이메일 보내는 상황 : 회원가입 인증 메일(인증번호), 비밀번호 찾기(임시 비밀번호), 알림(닉네임, 프로젝트명)
     * @param emailDto 이메일 받는 사용자, 이메일 제목, 내용에 들어갈 데이터(Map<String, String>)
     * @param emailType type에 따라 맞는 html 템플릿이 적용됨.
     * @return ResponseEntity<String>
     * @throws SendFailedException
     */
    public ResponseEntity<String> sendMail(EmailDto emailDto, EmailType emailType) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailDto.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(emailType.getEmailTitle()); // 메일 제목
            mimeMessageHelper.setText(setContext(emailDto.getContextData(), emailType.name()), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);
        } catch (SendFailedException e) {
            log.error(INVALID_EMAIL_MSG, e);
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        } catch (MessagingException e) {
//            throw new EmailSendFailException("이메일 내용 형식을 생성하는 중에 에러가 발생하였습니다.");
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        } catch (MailSendException e) {
//            throw new EmailSendFailException("SMTP 서버와 연결 또는 인증이 실패하였거나 이메일 전송 횟수가 초과되었습니다.");
            return new ResponseEntity(ResponseStatus.FAIL, HttpStatus.NO_CONTENT);
        }
        log.info(String.format("send mail to %s for %s", emailDto.getTo(), emailType));
        return new ResponseEntity(ResponseStatus.SUCCESS, HttpStatus.OK);
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
