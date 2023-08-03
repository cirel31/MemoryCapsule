package com.example.userservice.service;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService extends UserDetailsService {
    // User 로그인
    TokenDto login(UserDto.RequestLogin requestLogin) throws Exception;
    // User 로그아웃
    void logout(Authentication authentication);
    // User 회원가입
    UserDto.Basic signup(UserDto.SignUp signUpDto, MultipartFile file) throws Exception;

    List<User> findByAllFriends(Long userId) throws Exception;
    // 친구삭제
    boolean deleteFirend(Long hostId, Long guestId);
    // 친구추가
    boolean userAddFriend(Long hostId, Long guestId);

    boolean userConfirmFriend(Long hostId, Long guestId);

    // 이메일로 유저 찾기
    boolean checkEmailDuplicated(final String email) throws Exception;

    UserDto.Detail getUserDetail(Long userId, int year, int month) throws Exception;
    UserDto.Detail getUserDetail(Long userId) throws Exception;

}
