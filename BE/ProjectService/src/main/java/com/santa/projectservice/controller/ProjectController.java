package com.santa.projectservice.controller;

import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.UserService;
import com.santa.projectservice.vo.ProjectInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
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


    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>> getAllProject() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAll());
    }

    @GetMapping("/myproject")
    public ResponseEntity<List<ProjectInfo>> getMyProject(HttpServletRequest request) {
        Long userId = Long.valueOf(request.getHeader("userId"));
        List<ProjectDto> projectDtos = projectService.findProjectByUserId(userId);
        List<Long> numList = new ArrayList<>();
        List<ProjectInfo> projectInfos = new ArrayList<>();
        projectDtos.forEach(pjt -> {
            numList.add(projectService.projectArticleNum(pjt.getIdx()));
        });
        for (int i = 0; i < numList.size(); i++) {
            projectInfos.add(projectDtos.get(i).toInfo(numList.get(i)));
        }
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }

    /* 그냥 원하는 프로젝트 가져옴 */
    @GetMapping("/root/{projectid}")
    public ResponseEntity<ProjectDto> getProjectByRoot(@PathVariable Integer projectid) throws ProjectNotFoundException {
        Long projectId = Long.valueOf(projectid.toString());
        ProjectDto projectDto = projectService.findProjectByProjectId(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(projectDto);
    }

    /* 원하는 프로젝트 가져옴
     *  userId를 가지고 있어야 함
     * */
    @GetMapping("/{projectid}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Integer projectid, HttpServletRequest request) throws UserNotFoundException, ProjectNotFoundException {
        Long userId, projectId;
        try {
            userId = Long.valueOf(request.getHeader("userId").toString());
            projectId = Long.valueOf(projectid.toString());
            ProjectDto projectDto = projectService.findProjectByProjectIdAndUserId(userId, projectId);
            return ResponseEntity.status(HttpStatus.OK).body(projectDto);
        } catch (NullPointerException e) {
            throw new UserNotFoundException("인증정보를 가져올 수 없습니다");
        }
    }


    /* 프로젝트 생성
     *  userId 필요
     *
     * */
    @PostMapping("/create")
    public ResponseEntity<Object> createProject(HttpServletRequest httpRequest, @ModelAttribute  @RequestBody Map<String, Object> map) throws RegisterMakeException, ParseException {
        List<Integer> list = (ArrayList<Integer>) map.get("userList");
        List<Long> userList = new ArrayList<>();
        list.forEach(L -> {
            userList.add(Long.valueOf(L.toString()));
        });
        Map<String, String> pro = (Map<String, String>) map.get("project");
        String title = pro.get("title"), content = pro.get("content");

        LocalDateTime start = LocalDateTime.parse(pro.get("started").toString(), DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime end = LocalDateTime.parse(pro.get("ended").toString(), DateTimeFormatter.ISO_DATE_TIME);
        Date started = Date.from(start.atZone(ZoneId.systemDefault()).toInstant());
        Date ended = Date.from(end.atZone(ZoneId.systemDefault()).toInstant());
        if (title == null || content == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("title 혹은 content가 비어있습니다");
        }
        ProjectDto projectDto = null;
        try {
            projectDto = ProjectDto.builder()
                    .content(content)
                    .title(title)
                    .started(started)
                    .ended(ended)
                    .build();
        } catch (Exception e) {
            throw new ProjectNotFullfillException("인자가 부족하네요!", e);
        }
        Long owner = Long.valueOf(String.valueOf(httpRequest.getHeader("userId")));
        Long projectId = projectService.createProject(projectDto, userList, owner);
        return ResponseEntity.status(HttpStatus.OK).body(projectId);
    }


    @DeleteMapping("/{projectid}")
    public ResponseEntity<String> deleteProject(HttpServletRequest request, @PathVariable Integer projectid) throws ProjectNotFoundException {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        Long projectId = Long.valueOf(projectid.toString());
        log.info("userId: " + userId + " / projectId : " + projectId);
        String title = projectService.deleteProject(userId, projectId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("[" + title + "] : 삭제성공");
    }


    @GetMapping("/list/{userId}")
    public ResponseEntity<List<RegisterDto>> getRegisterById(@PathVariable("userId") Long userId) {
        List<RegisterDto> registerDtoList = projectService.findRegistersByUserId(userId);
        log.info(registerDtoList.toString());
        return ResponseEntity.status(HttpStatus.OK).body(registerDtoList);
    }


    @PutMapping("/{projectId}")
    public ResponseEntity<Boolean> editProjectContent(@PathVariable("projectId") Long projectId, @RequestBody String content, HttpServletRequest request) {
        Long id = Long.valueOf(String.valueOf(request.getHeader("userId")));
        Boolean check = projectService.editProjectContent(id, projectId, content);
        return ResponseEntity.status(HttpStatus.OK).body(check);
    }


    @PostMapping("/{projectid}/article")
    public ResponseEntity<Boolean> writeArticle(@PathVariable("projectid") Long projectId,
                                                @RequestParam("images") List<MultipartFile> files,
                                                @ModelAttribute ArticleDto articleDto,
                                                HttpServletRequest request) throws IOException {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        articleDto.setUserId(userId);
        articleDto.setProjectId(projectId);
        log.info(articleDto.toString());
        Boolean result = articleService.writeArticle(articleDto, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }


    @GetMapping("/{projectid}/article")
    public ResponseEntity<List<ArticleDto>> getProjectArticles(@PathVariable("projectid") Integer projectid,
                                                               HttpServletRequest request) {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        Long projectId = Long.valueOf(projectid.toString());
        List<ArticleDto> articleDtos = articleService.allProjectArticleList(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDtos);
    }


    @GetMapping("/{projectid}/latestarticle")
    public ResponseEntity<ArticleDto> getRecentArticles(@PathVariable("projectid") Integer projectid,
                                                        HttpServletRequest request) throws ArticleProjectNotFoundException {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        Long projectId = Long.valueOf(projectid.toString());
        ArticleDto articleDto = articleService.recentProjectArticleByUserId(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDto);
    }
}
