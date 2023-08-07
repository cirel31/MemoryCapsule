package com.example.userservice.service;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    // User 로그인
    TokenDto login(UserDto.RequestLogin requestLogin) throws Exception;
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

    //point 변환
    Boolean updatePoint(Long userId, Long point) throws Exception;

    Long getPoint(Long userId) throws Exception;
}
