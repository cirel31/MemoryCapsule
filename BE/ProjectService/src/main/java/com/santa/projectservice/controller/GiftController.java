package com.santa.projectservice.controller;

import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.model.vo.ProjectGiftVo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gift")
public class GiftController {
    ProjectService projectService;

    public GiftController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<ProjectGiftVo> gift(@PathVariable("uuid") String uuid){
        return ResponseEntity.status(HttpStatus.OK).body(projectService.gift(uuid));
    }


}
