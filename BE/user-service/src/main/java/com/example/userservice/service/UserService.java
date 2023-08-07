package com.example.userservice.service;

import com.example.userservice.model.dto.UserDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends UserDetailsService {
    // User 로그인
    UserDto.ResponseLogin login(UserDto.RequestLogin requestLogin) throws Exception;
    // User 로그아웃
    void logout(Authentication authentication);
    // User 회원가입
    UserDto.Basic signup(UserDto.SignUp signUpDto, MultipartFile file) throws Exception;

    UserDto.Detail getUserDetail(Long userId, int year, int month) throws Exception;
    UserDto.Detail getUserDetail(Long userId) throws Exception;
    //회원 탈퇴
    void deleteUser(Long userId);

    // 이메일로 유저 찾기
    boolean checkEmailDuplicated(final String email) throws Exception;

    //회원정보 수정
    void modifyUser(UserDto.modify info, MultipartFile multipartFile) throws Exception;
    
    //임시 비번 만들기
    String generateRandomPassword();
}
