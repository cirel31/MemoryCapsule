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
    import io.swagger.v3.oas.annotations.Operation;
    import io.swagger.v3.oas.annotations.Parameter;
    import io.swagger.v3.oas.annotations.Parameters;
    import io.swagger.v3.oas.annotations.enums.ParameterIn;
    import io.swagger.v3.oas.annotations.media.Content;
    import io.swagger.v3.oas.annotations.media.Schema;
    import io.swagger.v3.oas.annotations.responses.ApiResponse;
    import io.swagger.v3.oas.annotations.responses.ApiResponses;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

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
        @Operation(summary = "모든 프로젝트 정보를 가져옵니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 모든 프로젝트 정보를 가져옴",
                        content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class))
                })
        })
        @GetMapping("/all")
        public ResponseEntity<List<ProjectDto>> getAllProject(){
            return ResponseEntity.status(HttpStatus.OK).body(projectService.getAll());
        }

        @Operation(summary = "프로젝트 정보를 ID로 가져옵니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 프로젝트 정보를 가져옴",
                        content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class)) }
                ),
                @ApiResponse(responseCode = "404", description = "해당 ID를 가진 프로젝트를 찾을 수 없음", content = @Content) }
        )
        @GetMapping("/root/{projectid}")
        public ResponseEntity<ProjectDto> getProjectByRoot(@PathVariable Integer projectid) throws ProjectNotFoundException {
            Long projectId = Long.valueOf(projectid.toString());
            ProjectDto projectDto = projectService.findProjectByProjectId(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(projectDto);
        }
        @Operation(summary = "id로 프로젝트 정보 가져옵니다. ")
        @Parameters({
                @Parameter(
                        in = ParameterIn.HEADER,
                        name = "유저의 Id, 토큰이 들어갑니다",
                        description = "userId",
                        required = true,
                        schema = @Schema(type = "Integer")
                )
        })
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 프로젝트 정보를 가져옴",
                        content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ProjectDto.class)) }
                ),
                @ApiResponse(responseCode = "404", description = "해당 ID를 가진 프로젝트를 찾을 수 없음", content = @Content) }
        )
        @GetMapping("/{projectid}")
        public ResponseEntity<ProjectDto> getProjectById(@PathVariable Integer projectid, HttpServletRequest request) throws UserNotFoundException, ProjectNotFoundException {
            Long userId, projectId;
            try{
                userId = Long.valueOf(request.getHeader("userId").toString());
                projectId = Long.valueOf(projectid.toString());
                ProjectDto projectDto = projectService.findProjectByProjectIdAndUserId(userId, projectId);
                return ResponseEntity.status(HttpStatus.OK).body(projectDto);
            } catch (NullPointerException e) {
                throw new UserNotFoundException("인증정보를 가져올 수 없습니다");
            }
        }


        @Operation(summary = "새로운 프로젝트를 생성합니다.")
        @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 프로젝트 생성", content = { @Content(mediaType = "application/json") }),
            @ApiResponse(responseCode = "400", description = "title 혹은 content가 비어있습니다", content = @Content) }
        )
        @PostMapping("/create")
        public ResponseEntity<Object> createProject(HttpServletRequest httpRequest, @RequestBody Map<String, Object> map) throws RegisterMakeException, ParseException {
            List<Integer> list = (ArrayList<Integer>) map.get("userList");
            List<Long> userList = new ArrayList<>();
            list.forEach(L -> {userList.add(Long.valueOf(L.toString()));});
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
            } catch(Exception e){
                throw new ProjectNotFullfillException("인자가 부족하네요!", e);
            }
            Long owner = Long.valueOf(String.valueOf(httpRequest.getHeader("userId")));
            Long projectId = projectService.createProject(projectDto, userList, owner);
            return ResponseEntity.status(HttpStatus.OK).body(projectId);
        }


        @Operation(summary = "프로젝트를 삭제합니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "202", description = "프로젝트 삭제 성공", content = { @Content(mediaType = "application/json") }),
                @ApiResponse(responseCode = "404", description = "프로젝트를 찾을 수 없음", content = @Content)
        })
        @DeleteMapping("/{projectid}")
        public ResponseEntity<String> deleteProject(HttpServletRequest request, @PathVariable Integer projectid) throws ProjectNotFoundException {
            Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
            Long projectId = Long.valueOf(projectid.toString());
            log.info("userId: " + userId + " / projectId : " + projectId);
            String title = projectService.deleteProject(userId, projectId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("[" + title + "] : 삭제성공");
        }


        @Operation(summary = "사용자 ID로 등록 정보를 가져옵니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 등록 정보를 가져옴",
                        content = { @Content(mediaType = "application/json",
                                schema = @Schema(implementation = RegisterDto.class)) })})
        @GetMapping("/list/{userId}")
        public ResponseEntity<List<RegisterDto>> getRegisterById(@PathVariable("userId") Long userId) {
            List<RegisterDto> registerDtoList = projectService.findRegistersByUserId(userId);
            log.info(registerDtoList.toString());
            return ResponseEntity.status(HttpStatus.OK).body(registerDtoList);
        }

        @Operation(summary = "프로젝트 내용을 수정합니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 프로젝트 내용 수정",
                        content = { @Content(mediaType = "application/json") })})
        @PutMapping("/{projectId}")
        public ResponseEntity<Boolean> editProjectContent(@PathVariable("projectId") Long projectId, @RequestBody String content, HttpServletRequest request) {
            Long id = Long.valueOf(String.valueOf(request.getHeader("userId")));
            Boolean check = projectService.editProjectContent(id, projectId, content);
            return ResponseEntity.status(HttpStatus.OK).body(check);
        }

        @Operation(summary = "글을 작성합니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "201", description = "성공적으로 글 작성", content = { @Content(mediaType = "application/json") })}
        )
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


        @Operation(summary = "프로젝트의 모든 글을 가져옵니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 모든 글을 가져옴",
                        content = { @Content(mediaType = "application/json",
                                schema = @Schema(implementation = ArticleDto.class)) })})
        @GetMapping("/{projectid}/article")
        public ResponseEntity<List<ArticleDto>> getProjectArticles(@PathVariable("projectid") Integer projectid,
                                                             HttpServletRequest request){
            Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
            Long projectId = Long.valueOf(projectid.toString());
            List<ArticleDto> articleDtos = articleService.allProjectArticleList(userId, projectId);
            return ResponseEntity.status(HttpStatus.OK).body(articleDtos);
        }

        @Operation(summary = "최근에 작성된 글을 가져옵니다.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "성공적으로 최근에 작성된 글을 가져옴",
                        content = { @Content(mediaType = "application/json",
                                schema = @Schema(implementation = ArticleDto.class)) })})
        @GetMapping("/{projectid}/latestarticle")
        public ResponseEntity<ArticleDto> getRecentArticles(@PathVariable("projectid") Integer projectid,
                                                                  HttpServletRequest request) throws ArticleProjectNotFoundException {
            Long userId = Long.valueOf(String.valueOf(request.getHeader("userId")));
            Long projectId = Long.valueOf(projectid.toString());
            ArticleDto articleDto = articleService.recentProjectArticleByUserId(userId, projectId);
            return ResponseEntity.status(HttpStatus.OK).body(articleDto);
        }
    }
