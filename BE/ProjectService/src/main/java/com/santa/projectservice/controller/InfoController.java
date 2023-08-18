package com.santa.projectservice.controller;

import com.santa.projectservice.model.vo.UserInfo;
import com.santa.projectservice.repository.util.UtilQuerys;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


// 대충 정보만 반환

@RestController
@RequestMapping("/myinfo")
public class InfoController {
    UtilQuerys utilQuerys;

    public InfoController(UtilQuerys utilQuerys) {
        this.utilQuerys = utilQuerys;
    }

    @GetMapping("/info")
    public UserInfo numOfArticle(@RequestHeader("userId") Long userId){
        return utilQuerys.userInfo(userId);
    }
}
