package com.santa.projectservice.controller;

import com.santa.projectservice.model.dto.ArticleDto;
import com.santa.projectservice.model.dto.ProjectDto;
import com.santa.projectservice.model.dto.ProjectState;
import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.exception.article.ArticleProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
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

    public ProjectController(UserService userService, ProjectService projectService, ArticleService articleService, InviteServiceImpl inviteService) {
        this.userService = userService;
        this.projectService = projectService;
        this.articleService = articleService;
        this.inviteService = inviteService;
    }

    @GetMapping("/all")
    @Operation(summary = "모든 프로젝트를 가져옵니다", deprecated = true, description = "테스트용 함수이니 사용하지 않는것을 권장합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "가져오기 성공",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class)) }),
            @ApiResponse(responseCode = "404", description = "해당 ID를 가진 사용자 혹은 프로젝트를 찾을 수 없음", content = @Content) })
    public ResponseEntity<List<ProjectDto>> getAllProject() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAll());
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
    @GetMapping("/root/{projectid}")
    @Operation(summary = "루트 권한으로 프로젝트를 가져옵니다", description = "모든 프로젝트 가져옵니다")
    public ResponseEntity<ProjectDto> getProjectByRoot(@PathVariable Integer projectid) throws ProjectNotFoundException {
        Long projectId = Long.valueOf(projectid.toString());
        ProjectDto projectDto = projectService.findProjectByProjectId(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(projectDto);
    }


    @GetMapping("/{projectid}")
    @Operation(summary = "특정 프로젝트를 조회합니다", description = "내가 참여하고 있는 프로젝트라면 정보를 가져옵니다. ")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Integer projectid,
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) throws UserNotFoundException, ProjectNotFoundException
    {
        try {
            Long projectId = Long.valueOf(projectid.toString());
            ProjectDto projectDto = projectService.findProjectByProjectIdAndUserId(userId, projectId);
            return ResponseEntity.status(HttpStatus.OK).body(projectDto);
        } catch (NullPointerException e) {
            throw new UserNotFoundException("인증정보를 가져올 수 없습니다");
        }
    }


    @PostMapping("/create")
    @Operation(summary = "프로젝트를 생성합니다 ", description = "프로젝트를 생성합니다")
    public ResponseEntity<Object> createProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId,
            @RequestParam MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userList") String users,
            @RequestParam("started") String start,
            @RequestParam("type") Integer type,
            @RequestParam("ended") String end) throws RegisterMakeException, IOException {
        List<Long> userList = Arrays.stream(users.replaceAll("[\\[\\] ]", "").split(","))
                .map(Long::valueOf)
                .collect(Collectors.toList());
        LocalDateTime starts = LocalDateTime.parse(start, DateTimeFormatter.ISO_DATE_TIME);
        LocalDateTime ends = LocalDateTime.parse(end, DateTimeFormatter.ISO_DATE_TIME);
        Date started = Date.from(starts.atZone(ZoneId.systemDefault()).toInstant());
        Date ended = Date.from(ends.atZone(ZoneId.systemDefault()).toInstant());
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
                    .type(type)
                    .build();
        } catch (Exception e) {throw new ProjectNotFullfillException("인자가 부족하네요!", e);}

        Long owner = userId;
        Long projectId = projectService.createProject(projectDto, userList, owner, image);
        return ResponseEntity.status(HttpStatus.OK).body(projectId);
    }

    @GetMapping("/finish/{projectId}")
    @Operation(summary = "프로젝트를 끝냅니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로젝트의 UUID를 반환합니다. "),
            @ApiResponse(responseCode = "404", description = "데이터를 찾을 수 없습니다.")
    })
    public ResponseEntity<String> finish(@PathVariable("projectId") Long projectId, @RequestHeader("userId") Long userId){
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
    @Operation(summary = "특정 프로젝트의 내 게시물 조회")
    public ResponseEntity<List<ArticleDto>> getProjectArticles(@PathVariable("projectid") Integer projectid,
                @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
                @RequestHeader("userId") Long userId) {
        Long projectId = Long.valueOf(projectid.toString());
        List<ArticleDto> articleDtos = articleService.allProjectArticleList(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDtos);
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
