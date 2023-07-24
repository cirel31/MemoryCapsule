package com.santa.projectservice.controller;

import com.netflix.discovery.converters.Auto;
import com.santa.projectservice.jpa.UserEntity;
import com.santa.projectservice.service.UserService;
import com.santa.projectservice.vo.ResponseUser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tmp")
public class tmpController {
    private UserService userService;

    @Autowired
    public tmpController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<ResponseUser>> users(){
        Iterable<UserEntity> userList = userService.getAllUser();
        List<ResponseUser> result = new ArrayList<>();
        userList.forEach(u -> {
            result.add(new ModelMapper().map(u, ResponseUser.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
