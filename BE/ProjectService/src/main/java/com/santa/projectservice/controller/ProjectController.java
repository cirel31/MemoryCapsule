package com.santa.projectservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.dto.UserDto;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/project")
@Slf4j
public class ProjectController {

    private final UserService userService;
    private final ProjectService projectService;
    private final ArticleService articleService;

    public ProjectController(UserService userService, ProjectService projectService, ArticleService articleService) {
        this.userService = userService;
        this.projectService = projectService;
        this.articleService = articleService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable("userId") Long userId) {
        try {
            log.info(userService.findUserById(userId).toString());
            return ResponseEntity.status(HttpStatus.OK).body(userService.findUserById(userId));
        } catch (UserNotFoundException e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        }
    }


    /**
     * @param httpRequest - header에서 아이디 가져옵니다
     * @return - 새로 만들어진 프로젝트의 ID
     * @throws JsonProcessingException - project정보가 없을 떄
     */
    @PostMapping("/create")
    public ResponseEntity<Object> createProject(HttpServletRequest httpRequest, @RequestBody Map<String, Object> map) throws JsonProcessingException, RegisterMakeException {
        ObjectMapper mapper = new ObjectMapper();
        List<Integer> list = (ArrayList<Integer>) map.get("userList");
        List<Long> userList = new ArrayList<>();
        log.info(userList.toString());
        list.forEach(L -> {
            log.info(L + " " + L.getClass().toString());
            Long tmp = Long.valueOf(L.toString());
            log.info(tmp + " " + tmp.getClass().toString());
            userList.add(tmp);
        });
        Map<String, String> pro = (Map<String, String>) map.get("project");
        String title = pro.get("title"), content = pro.get("content");
        if (title == null || content == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("title 혹은 content가 비어있습니다");
        }
        ProjectDto projectDto = ProjectDto.builder()
                .content(content)
                .title(title)
                .build();
        Long owner = Long.valueOf(String.valueOf(httpRequest.getHeader("userId")));
        Long projectId = projectService.createProject(projectDto, userList, owner);
        return ResponseEntity.status(HttpStatus.OK).body(projectId);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProject(HttpServletRequest request, @RequestBody Map<String, Long> map) {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        Long projectId = map.get("projectId");
        log.info("userId: " + userId + " / projectId : " + projectId);
        String title = projectService.deleteProject(userId, projectId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(title);
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<RegisterDto>> getRegisterById(@PathVariable("userId") Long userId) {
        List<RegisterDto> registerDtoList = projectService.findRegistersByUserId(userId);
        log.info(registerDtoList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(registerDtoList);
    }

    @PostMapping("/update/{projectId}")
    public ResponseEntity<Boolean> editProjectContent(@PathVariable("projectId") Long projectId, @RequestBody String content, HttpServletRequest request) {
        Long id = Long.valueOf(String.valueOf(request.getHeader("userId")));
        log.info(content);
        log.info(id.toString());
        Boolean check = projectService.editProjectContent(id, projectId, content);
        return ResponseEntity.status(HttpStatus.OK).body(check);
    }


    @PostMapping("/article/write/{projectId}")
    public ResponseEntity<Boolean> writeArticle(@PathVariable("projectId") Long projectId,
                                                @RequestBody Map<String, String> map,
                                                HttpServletRequest request) throws IOException {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        String title = map.get("title");
        String content = map.get("content");
        ArticleDto articleDto = ArticleDto.builder()
                .title(map.get("title"))
                .content(map.get("content"))
                .userId(userId)
                .projectId(projectId)
                .stamp(Integer.parseInt(map.get("stamp")))
                .build();
        Boolean result = articleService.writeArticle(articleDto, null);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/article")
    public void getArticle() {

    }

}
