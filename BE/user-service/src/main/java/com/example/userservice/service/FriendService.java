package com.example.userservice.service;

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

}
