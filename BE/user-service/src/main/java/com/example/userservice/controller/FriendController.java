package com.example.userservice.controller;

import com.example.userservice.service.UserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/friend")
@RestController
@Slf4j
@RequiredArgsConstructor
public class FriendController {
    private final UserService userService;

    @GetMapping("/health-check")
    public ResponseEntity testing(){
        return ResponseEntity.status(HttpStatus.OK).body("Hello friend-service");
    }
    @GetMapping("/test")
    public ResponseEntity test(
    ){
        userService.deleteFirend(1L, 3L);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteFriend(
            @RequestParam("hostId") Long hostId,
            @RequestParam("guestId") Long guestId
    ){
        boolean result = userService.deleteFirend(hostId, guestId);
        if(result) return ResponseEntity.status(HttpStatus.OK).build();
        else return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
