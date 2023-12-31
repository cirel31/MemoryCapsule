package com.santa.projectservice.controller;

import com.santa.projectservice.exception.article.ArticleException;
import com.santa.projectservice.exception.project.ProjectException;
import com.santa.projectservice.model.dto.ArticleDto;
import com.santa.projectservice.model.dto.ProjectDto;
import com.santa.projectservice.model.dto.ProjectState;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.model.vo.UserVo;
import com.santa.projectservice.repository.util.UtilQuerys;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.service.UserService;
import com.santa.projectservice.service.impl.InviteServiceImpl;
import com.santa.projectservice.model.vo.ProjectInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@Slf4j
public class ProjectController {

    private final UserService userService;
    private final ProjectService projectService;
    private final ArticleService articleService;
    private final InviteServiceImpl inviteService;
    private final UtilQuerys utilQuerys;

    public ProjectController(UserService userService, ProjectService projectService, ArticleService articleService, InviteServiceImpl inviteService, UtilQuerys utilQuerys) {
        this.userService = userService;
        this.projectService = projectService;
        this.articleService = articleService;
        this.inviteService = inviteService;
        this.utilQuerys = utilQuerys;
    }

    private <T> void articleValidate(T value, String message) throws ArticleException {
        Optional.ofNullable(value).orElseThrow(() -> new ArticleException(message + " 가 없습니다. 다시 확인해주세요"));
    }
    private <T> void projectValidate(T value, String message) throws ProjectException {
        Optional.ofNullable(value).orElseThrow(() -> new ProjectException(message + " 가 없습니다. 프로젝트하는데 필요해요"));
    }
    private <T> void validate(T value, String message) throws Exception{
        Optional.ofNullable(value).orElseThrow(() -> new Exception(message + "의 값이 없습니다."));
    }


    @GetMapping("/myproject")
    @Operation(summary = "아이디로 내 프로젝트를 가져옵니다")
    public ResponseEntity<List<ProjectInfo>> getMyProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.ALL);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }
    @GetMapping("/myproject/current")
    @Operation(summary = "아이디로 내 현재 진행중인 프로젝트를 가져옵니다", description = "state이 0인걸 가져옵니다")
    public ResponseEntity<List<ProjectInfo>> getMyCurrentProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.CURRENT);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }
    @GetMapping("/myproject/done")
    @Operation(summary = "완료된 프로젝트를 가져옵니다", description = "state이 1인걸 가져옵니다")
    public ResponseEntity<List<ProjectInfo>> getMyDoneProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.DONE);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }


    @GetMapping("/{projectid}")
    @Operation(summary = "특정 프로젝트를 조회합니다", description = "내가 참여하고 있는 프로젝트라면 정보를 가져옵니다. ")
    public ResponseEntity<ProjectInfo> getProjectById(@PathVariable Integer projectid,
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) throws UserNotFoundException, ProjectNotFoundException
    {
        try {
            Long projectId = Long.valueOf(projectid.toString());
            ProjectDto projectDto = projectService.findProjectByProjectIdAndUserId(userId, projectId);
            List<UserVo> userVos = utilQuerys.projectUserVos(projectId);
            Long articleNum = utilQuerys.getProjectArticleCount(projectId);
            Long owner = utilQuerys.findOwner(projectId);
            ProjectInfo projectInfo = projectDto.toInfo(userVos,owner, articleNum);
            return ResponseEntity.status(HttpStatus.OK).body(projectInfo);
        } catch (NullPointerException e) {
            throw new UserNotFoundException("인증정보를 가져올 수 없습니다 내가 참여하고 있는게 아닌듯요");
        }
    }

    private Date stringToDate(String date){
        return Date.from(LocalDateTime.parse(date, DateTimeFormatter.ISO_DATE_TIME).atZone(ZoneId.systemDefault()).toInstant());
    }

    @PostMapping("/create")
    @Operation(summary = "프로젝트를 생성합니다 ", description = "프로젝트를 생성합니다")
    public ResponseEntity<Object> createProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long owner,
            @RequestParam MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "userList", required = false) String users,
            @RequestParam("started") String start,
            @RequestParam("type") Integer type,
            @RequestParam("ended") String end) throws RegisterMakeException, IOException {
        List<Long> userList = null;
        if(users != null) {
            userList = Arrays.stream(users.replaceAll("[\\[\\] ]", "").split(","))
                    .map(Long::valueOf)
                    .collect(Collectors.toList());
        }
        if (title == null || content == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("title 혹은 content가 비어있습니다");
        }
        Long projectId = projectService.createProject(
                ProjectDto.builder()
                        .content(content)
                        .title(title)
                        .started(stringToDate(start))
                        .ended(stringToDate(end))
                        .type(type)
                        .build(),
                userList, owner, image);
        return ResponseEntity.status(HttpStatus.OK).body(projectId);
    }

    @GetMapping("/finish/{projectId}")
    @Operation(summary = "프로젝트를 끝냅니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트의 UUID를 반환합니다. "),
            @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없습니다.")
    })
    public ResponseEntity<String> finish(@PathVariable("projectId") Long projectId, @RequestHeader("userId") Long userId) throws ProjectNotFoundException {
        String uuid = projectService.finishProject(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(uuid);
    }

    @DeleteMapping("/{projectid}")
    @Operation(summary = "내가 주인인 프로젝트를 삭제합니다.")
    public ResponseEntity<String> deleteProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId,
            @PathVariable Integer projectid) throws ProjectNotFoundException
    {
        Long projectId = Long.valueOf(projectid.toString());
        log.info("userId: " + userId + " / projectId : " + projectId);
        String title = projectService.deleteProject(userId, projectId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("[" + title + "] : 삭제성공");
    }

    @PutMapping("/{projectId}")
    @Operation(summary = "프로젝트를 수정합니다 .", description = "근데 수정 안할거죠?")
    public ResponseEntity<Boolean> editProjectContent(@PathVariable("projectId") Long projectId, @RequestBody String content,
              @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
              @RequestHeader("userId") Long userId)
    {
        Boolean check = projectService.editProjectContent(userId, projectId, content);
        return ResponseEntity.status(HttpStatus.OK).body(check);
    }


    @PostMapping("/{projectid}/article")
    @Operation(summary = "게시글을 작성합니다.", description = "특정 프로젝트의 게시글을 작성합니다.")
    public ResponseEntity<Boolean> writeArticle(@PathVariable("projectid") Long projectId,
                                                @RequestParam(value = "files", required = false) List<MultipartFile> files,
                                                @RequestParam(value = "content") String content,
                                                @RequestParam(value = "stamp") Integer stamp,
                                                HttpServletRequest request) throws IOException, ArticleException {
        Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
        if(utilQuerys.existsArticleCreatedToday(userId, projectId)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
        articleValidate(content, "content");
        articleValidate(stamp, "stamp");
        return ResponseEntity.status(HttpStatus.CREATED).body(
                        articleService.writeArticle(ArticleDto.builder()
                        .userId(userId)
                        .projectId(projectId)
                        .content(content)
                        .stamp(stamp).build(), files)
        );
    }


    @GetMapping("/{projectid}/article")
    @Operation(summary = "특정 프로젝트의 내 게시물 조회")
    public ResponseEntity<List<ArticleDto>> getProjectArticles(@PathVariable("projectid") Integer projectid,
                @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
                @RequestHeader("userId") Long userId) {
        Long projectId = Long.valueOf(projectid.toString());
        List<ArticleDto> articleDtos = articleService.allProjectArticleList(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDtos);
    }

    @GetMapping("/allarticles")
    @Operation(summary = "내가 작성한 모든 게시글 리스트 조회")
    public ResponseEntity<List<ArticleDto>> getAllArticleList(@RequestHeader("userId") Long userId){
        return ResponseEntity.status(HttpStatus.OK).body(articleService.articleList(userId));
    }


    @GetMapping("/{projectid}/latestarticle")
    @Operation(summary = "프로젝트에서 내가 최근에 쓴 게시물 조회")
    public ResponseEntity<ArticleDto> getRecentArticles(
            @PathVariable("projectid") Integer projectid,
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) throws ArticleProjectNotFoundException
    {
        Long projectId = Long.valueOf(projectid.toString());
        ArticleDto articleDto = articleService.recentProjectArticleByUserId(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDto);
    }
}
