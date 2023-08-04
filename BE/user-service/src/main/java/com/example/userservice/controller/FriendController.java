package com.example.userservice.controller;

import com.example.userservice.model.entity.User;
import com.example.userservice.service.FriendService;
import com.example.userservice.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/friend")
@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @GetMapping("/health-check")
    public ResponseEntity testing(){
        return ResponseEntity.status(HttpStatus.OK).body("Hello friend-service");
    }
    @GetMapping("/test")
    public ResponseEntity test(
    ){
        friendService.deleteFirend(1L, 3L);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/search/{user_id}")
    public ResponseEntity findFriendByUserId(@PathVariable Long user_id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(friendService.findByAllFriends(user_id));
        } catch (Exception e) {
            log.error("Error - userDetail : {}", e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/add")
    public ResponseEntity connectedUser(
            @RequestParam(value = "host_id") Long host_id,
            @RequestParam(value = "guest_id") Long guest_id
    ) {
        friendService.userAddFriend(host_id, guest_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/find/{user_email}")
    public ResponseEntity findByUserEmail(@PathVariable String user_email) {
        Optional<User> optionalUser = friendService.findUserEmail(user_email);
        if (optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("이메일과 일치하는 유저가 없습니다.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(optionalUser.get());
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteFriend(
            @RequestParam("hostId") Long hostId,
            @RequestParam("guestId") Long guestId
    ){
        boolean result = friendService.deleteFirend(hostId, guestId);
        if(result) return ResponseEntity.status(HttpStatus.OK).build();
        else return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
