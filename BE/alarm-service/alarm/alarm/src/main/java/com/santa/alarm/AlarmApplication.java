package com.santa.alarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Properties;

@SpringBootApplication
@EnableScheduling
public class AlarmApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlarmApplication.class, args);

//			System.out.println("123123");
//			// 이메일 발신될 데이터 적재
//			SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//			simpleMailMessage.setTo("aud19980518@gmail.com"); //보낼 이메일
//			simpleMailMessage.setSubject("test title"); //제목
//			simpleMailMessage.setText("프로젝트에 글을 작성하지 않으셔서 이메일을 보냅니다."); //내용
//			Properties props = new Properties();
//			props.put("mail.smtp.ssl.enable", "true");
//		JavaMailSender javaMailSender = new JavaMailSenderImpl();
//			// 이메일 발신
//			javaMailSender.send(simpleMailMessage);
	}

}
