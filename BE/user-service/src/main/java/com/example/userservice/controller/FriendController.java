package com.example.userservice.controller;

import com.example.userservice.model.dto.FriendDto;
import com.example.userservice.service.FriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search/{user_id}")
    public ResponseEntity findFriendByUserId(@PathVariable("user_id") Long user_id) {
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
    public ResponseEntity findByUserEmail(@RequestParam(value = "host_id") Long host_id,
                                          @PathVariable("user_email") String user_email) {
        try {
            FriendDto.showFriend friendDto = friendService.findUserEmail(host_id, user_email);
            return ResponseEntity.status(HttpStatus.OK).body(friendDto);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이메일과 일치하는 유저가 없습니다.");
        }
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

    @GetMapping("/getDetailedFriendList/{userId}")
    public ResponseEntity getFriendList(
            @PathVariable("userId") Long userId
    ){
        try {
            List<FriendDto.basicFriendInfo> friendsInfo = friendService.getFriendsInfo(userId);
            return ResponseEntity.status(HttpStatus.OK).body(friendsInfo);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
