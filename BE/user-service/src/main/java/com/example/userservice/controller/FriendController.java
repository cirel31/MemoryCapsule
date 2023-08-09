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

    @GetMapping("/find/{user_email}")
    public ResponseEntity findByUserEmail(@RequestParam(value = "host_id") Long host_id,
                                          @PathVariable("user_email") String user_email) {
        try {
            FriendDto.showFriend friendDto = friendService.findUserEmail(host_id, user_email);
            return ResponseEntity.status(HttpStatus.OK).body(friendDto);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete") //친구 삭제함
    public ResponseEntity deleteFriend(
            @RequestParam("host_Id") Long hostId,
            @RequestParam("guest_Id") Long guestId
    ){
        boolean result = friendService.deleteFirend(hostId, guestId);
        if(result) return ResponseEntity.status(HttpStatus.OK).build();
        else return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
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

    @PostMapping("/add") //내가 요청 보냄
    public ResponseEntity sendRequestFriend(
            @RequestParam(value = "host_id") Long host_id,
            @RequestParam(value = "guest_id") Long guest_id
    ) {
        if (friendService.userAddFriend(host_id, guest_id))
            return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 친구 신청을 했거나 잘못된 요청입니다.");
    }

    @DeleteMapping("/add") //내가 요청 보낸걸 취소함
    public ResponseEntity cancelSendRequestFriend(
            @RequestParam(value = "host_id") Long host_id,
            @RequestParam(value = "guest_id") Long guest_id
    ) {
        if (friendService.cancelUserAddFriend(host_id, guest_id))
            return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("친구 요청을 이미 취소 했거나 잘못된 요청입니다.");
    }

    @PutMapping("/request") //요청이 온걸 수락함
    public ResponseEntity requestInsert(@RequestParam(value = "host_id") Long host_id,
                                        @RequestParam(value = "guest_id") Long guest_id
    ) {
        try {
            if (friendService.userConfirmFriend(host_id, guest_id))
                return ResponseEntity.status(HttpStatus.OK).build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("친구 요청을 이미 수락했거나 잘못된 요청입니다.");
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/request") //요청이 온걸 거절함
    public ResponseEntity requestDelete(@RequestParam(value = "host_id") Long host_id,
                                        @RequestParam(value = "guest_id") Long guest_id
    ) {
        if (friendService.userRejectFriend(host_id, guest_id))
            return ResponseEntity.status(HttpStatus.OK).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("친구 요청을 이미 거절했거나 잘못된 요청입니다.");
    }
}
