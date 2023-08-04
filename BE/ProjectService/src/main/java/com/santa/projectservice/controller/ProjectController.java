package com.santa.projectservice.controller;

import com.santa.projectservice.dto.ArticleDto;
import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.ProjectState;
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
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HeaderParam;
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

    @Operation(summary = "모든 프로젝트를 가져옵니다", deprecated = true, description = "테스트용 함수이니 사용하지 않는것을 권장합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "가져오기 성공",
                    content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class)) }),
            @ApiResponse(responseCode = "404", description = "해당 ID를 가진 사용자 혹은 프로젝트를 찾을 수 없음", content = @Content) })
    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>> getAllProject() {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAll());
    }

    @Operation(summary = "아이디로 내 프로젝트를 가져옵니다")
    @GetMapping("/myproject")
    public ResponseEntity<List<ProjectInfo>> getMyProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.ALL);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }
    @Operation(summary = "아이디로 내 현재 진행중인 프로젝트를 가져옵니다", description = "confirm이 0인걸 가져옵니다")
    @GetMapping("/myproject/current")
    public ResponseEntity<List<ProjectInfo>> getMyCurrentProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.CURRENT);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }
    @Operation(summary = "완료된 프로젝트를 가져옵니다", description = "confirm이 1인걸 가져옵니다")
    @GetMapping("/myproject/done")
    public ResponseEntity<List<ProjectInfo>> getMyDoneProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId) {
        List<ProjectDto> projectDtos = projectService.findProjectByUserIdAndState(userId, ProjectState.DONE);
        List<ProjectInfo> projectInfos = projectService.projectDtosToInfos(projectDtos);
        return ResponseEntity.status(HttpStatus.OK).body(projectInfos);
    }
    @Operation(summary = "루트 권한으로 프로젝트를 가져옵니다", description = "모든 프로젝트 가져옵니다")
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
    @Operation(summary = "특정 프로젝트를 조회합니다", description = "내가 참여하고 있는 프로젝트라면 정보를 가져옵니다. ")
    @GetMapping("/{projectid}")
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


    /* 프로젝트 생성
     *  userId 필요
     *
     * */
    @Operation(summary = "프로젝트를 생성합니다 ", description = "confirm이 1인걸 가져옵니다")
    @PostMapping("/create")
    public ResponseEntity<Object> createProject(
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
            @RequestHeader("userId") Long userId,
            @ModelAttribute  @RequestBody Map<String, Object> map) throws RegisterMakeException, ParseException
    {
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
        Long owner = userId;
        Long projectId = projectService.createProject(projectDto, userList, owner);
        return ResponseEntity.status(HttpStatus.OK).body(projectId);
    }

    @Operation(summary = "내가 주인인 프로젝트를 삭제합니다.")
    @DeleteMapping("/{projectid}")
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

    @Operation(summary = "특정 유저가 참여중인 프로젝트들을 가져옵니다 ")
    @GetMapping("/list/{userId}")
    public ResponseEntity<List<ProjectDto>> getRegisterById(@PathVariable("userId") Long userId) {
        List<RegisterDto> registerDtoList = projectService.findRegistersByUserId(userId);
        log.info(registerDtoList.toString());
        List<ProjectDto> projectDtos = projectService.findProjectsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(projectDtos);
    }


    @Operation(summary = "프로젝트를 수정합니다 .", description = "근데 수정 안할거죠?")
    @PutMapping("/{projectId}")
    public ResponseEntity<Boolean> editProjectContent(@PathVariable("projectId") Long projectId, @RequestBody String content,
              @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
              @RequestHeader("userId") Long userId)
    {
        Boolean check = projectService.editProjectContent(userId, projectId, content);
        return ResponseEntity.status(HttpStatus.OK).body(check);
    }


    @PostMapping(value = "/{projectid}/article", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "프로젝트에 게시글을 작성합니다",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(encoding = @Encoding(name = "multipart",
                            contentType = MediaType.MULTIPART_FORM_DATA_VALUE))))
    public ResponseEntity<Boolean> writeArticle(
            @Parameter(description = "프로젝트 아이디") @PathVariable("projectid") Long projectId,
            @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER) @RequestHeader("userId") Long userId,
            @Parameter(description = "이미지들", schema = @Schema(type = "string", format = "binary"))
            @RequestPart("images") List<MultipartFile> files,
            @Parameter(description = "게시글 제목") @RequestPart("title") String title,
            @Parameter(description = "게시글 내용") @RequestPart("content") String content,
            @Parameter(description = "스탬프 번호") @RequestPart("stamp") Integer stamp
    ) throws IOException {
        ArticleDto articleDto = ArticleDto.builder()
                        .userId(userId).projectId(projectId).title(title).content(content).stamp(stamp).build();
        log.info(articleDto.toString());
        Boolean result = articleService.writeArticle(articleDto, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }


    @Operation(summary = "특정 프로젝트의 게시물 조회")
    @GetMapping("/{projectid}/article")
    public ResponseEntity<List<ArticleDto>> getProjectArticles(@PathVariable("projectid") Integer projectid,
                @Parameter(description = "유저 아이디", required = true, in = ParameterIn.HEADER)
                @RequestHeader("userId") Long userId) {
        Long projectId = Long.valueOf(projectid.toString());
        List<ArticleDto> articleDtos = articleService.allProjectArticleList(userId, projectId);
        return ResponseEntity.status(HttpStatus.OK).body(articleDtos);
    }


    @Operation(summary = "프로젝트에서 내가 최근에 쓴 게시물 조회")
    @GetMapping("/{projectid}/latestarticle")
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
