package com.santa.projectservice.controller;

import com.santa.projectservice.mongo.Invite;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.impl.InviteServiceImpl;
import com.santa.projectservice.service.impl.ProjectServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invite")
@Slf4j
public class InviteController {
    InviteServiceImpl inviteService;
    ProjectService projectService;
    public InviteController(InviteServiceImpl inviteService, ProjectService projectService) {
        this.inviteService = inviteService;
        this.projectService = projectService;
    }

    @PostMapping("/accept")
    public ResponseEntity<String> Accept(@RequestHeader Long userId,@RequestParam String inviteId){
        Invite invite = inviteService.getInviteById(inviteId);
        log.info(invite.toString());
        log.info(userId.toString());
        log.info(invite.getProjectId().toString());
        projectService.createRegister(userId, invite.getProjectId());
        inviteService.deleteInviteById(inviteId);
        return ResponseEntity.status(HttpStatus.OK).body("수락 성공");
    }
    @PostMapping("/reject")
    public ResponseEntity<String> Reject(@RequestHeader Long userId, @RequestParam String inviteId){
        inviteService.deleteInviteById(inviteId);
        return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
    }

    @GetMapping()
    public ResponseEntity<List<Invite>> InviteList(@RequestHeader Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(inviteService.getInvitesByUserId(userId));
    }

}
