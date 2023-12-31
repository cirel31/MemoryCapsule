package com.santa.projectservice.controller;

import com.santa.projectservice.model.mongo.Invite;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.impl.InviteServiceImpl;
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
    public ResponseEntity<String> Accept(@RequestHeader Long userId, @RequestParam String inviteId) {
        Invite invite = inviteService.getInviteById(inviteId);
        log.info("invite info : userId : {}, invite :  {}, project :  {}", userId, invite.toString(), invite.getProjectId());
        projectService.createRegister(userId, invite.getProjectId());
        inviteService.deleteInviteById(inviteId);
        return ResponseEntity.status(HttpStatus.OK).body("수락 성공");
    }

    @PostMapping("/reject")
    public ResponseEntity<String> Reject(@RequestHeader Long userId, @RequestParam String inviteId) {
        inviteService.deleteInviteById(inviteId);
        return ResponseEntity.status(HttpStatus.OK).body("삭제 성공");
    }

    @GetMapping()
    public ResponseEntity<List<Invite>> InviteList(@RequestHeader Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(inviteService.getInvitesByUserId(userId));
    }

}
