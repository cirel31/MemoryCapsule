package com.example.userservice.service;

import com.example.userservice.model.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    // User 로그인
    UserDto.ResponseLogin login(UserDto.RequestLogin requestLogin) throws Exception;
    // User 로그아웃
    void logout(final Long userId);
    //이메일 중복 체크
    int emailCheck(String userEmail);
    // User 회원가입
    UserDto.Basic signup(UserDto.SignUp signUpDto, MultipartFile file) throws Exception;

    UserDto.Detail getUserDetail(Long userId, int year, int month) throws Exception;
    UserDto.Detail getUserDetail(Long userId) throws Exception;
    //회원 탈퇴
    void deleteUser(Long userId) throws Exception;

    // 이메일로 유저 찾기
    void checkEmailDuplicated(UserDto.RequestFindPass userInfo) throws Exception;

    //회원정보 수정
    void modifyUser(UserDto.modify info, MultipartFile multipartFile) throws Exception;
    
    //임시 비번 만들기
    String generateRandomCode();
    
    //비밀번호 변경
    void modifyPassword(String userEmail, String code) throws Exception;

    void checkPassword(UserDto.modifyPwd modifyPwd) throws Exception;

    //point 변환
    Boolean updatePoint(Long userId, Long point) throws Exception;

    Long getPoint(Long userId) throws Exception;

    String checkingUserOrSendEmail(String userEmail) throws Exception;

}
