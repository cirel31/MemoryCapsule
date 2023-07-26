package com.example.userservice.service;

import com.example.userservice.model.dto.TokenDto;
import com.example.userservice.model.dto.UserDto;
import com.example.userservice.model.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    // User 로그인
    TokenDto login(UserDto.RequestLogin requestLogin) throws Exception;
    // User 로그아웃
    void logout();
    // User 친구 삭제
    // User 출석체크
    // User 비밀번호 찾기
    // 회원탈퇴
    // 회원정보수정
    // 유저 상세정보 조회
    // 친구조회
    List<User> findByAllFriends(int userId);
    // 친구삭제
    boolean deleteFirend(int hostId, int guestId);
    // 친구추가
    boolean userAddFriend(int hostId, int guestId);
    // 이메일로 유저 찾기
    User findByUserId(int hostId);
}
