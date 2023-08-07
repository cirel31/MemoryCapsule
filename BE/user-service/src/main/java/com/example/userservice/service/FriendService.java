package com.example.userservice.service;

import com.example.userservice.model.dto.FriendDto;
import com.example.userservice.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface FriendService {
    List<User> findByAllFriends(Long userId) throws Exception;
    // 친구삭제
    boolean deleteFirend(Long hostId, Long guestId);
    // 친구추가
    boolean userAddFriend(Long hostId, Long guestId);

    boolean userConfirmFriend(Long hostId, Long guestId);

    Optional<User> findUserEmail(String email);

    // 유저의 친구목록 조회 및 친구들의 정보(고유idx/이름/닉네임/이미지url/작성한 총 글수/프로젝트의 총갯수/진행중인프로젝트수)
    List<FriendDto.basicFriendInfo> getFriendsInfo(final Long userId) throws Exception;

}
