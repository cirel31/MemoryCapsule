package com.santa.projectservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.dto.UserDto;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.RegisterRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.UserService;
import com.santa.projectservice.vo.ResponseUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.spi.RegisterableService;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
@Slf4j
public class ProjectController {

    private final UserService userService;
    private final ProjectService projectService;

    public ProjectController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Long userId){
        log.info(userService.findUserById(userId).toString());
        return ResponseEntity.status(HttpStatus.OK).body(userService.findUserById(userId));
    }


    /**
     * @param httpRequest - header에서 아이디 가져옵니다
     * @return - 새로 만들어진 프로젝트의 ID
     * @throws JsonProcessingException - project정보가 없을 떄
     */
    @PostMapping("/newproject")
    public Long createProject(HttpServletRequest httpRequest, @RequestBody Map<String, Object> map) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        List<Long> userList = (ArrayList<Long>)map.get("userList");
        ProjectDto project = mapper.convertValue(map.get("project"), ProjectDto.class);
        Long owner = Long.valueOf(String.valueOf(httpRequest.getHeader("userId")));
        Long projectId = projectService.createProject(project, userList, owner);
        return projectId;
    }

    @GetMapping("/registerList/{userId}")
    public ResponseEntity<List<RegisterDto>> getRegisterById(@PathVariable("userId") Long userId){
        List<RegisterDto> registerDtoList = projectService.findRegistersByUserId(userId);
        log.info(registerDtoList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(registerDtoList);
    }


    @PostMapping
    public void uploadArticle(){

    }

    @GetMapping("/article")
    public void getArticle(){

    }

//    @PutMapping("")
//    public ResponseEntity<?> modify(@ModelAttribute BoardDto boardDto, @RequestParam(value = "upfile", required = false) MultipartFile[] files, HttpSession session) throws Exception {
//        if(files[0] != null) {
//            String fileUrl = s3FileUploadService.upload(files[0]);
//            boardDto.setFileURL(fileUrl);
//        }
//        boardService.modifyArticle(boardDto);
//        return new ResponseEntity<String>("success", HttpStatus.OK);
//    }


}
