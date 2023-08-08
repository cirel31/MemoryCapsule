package com.santa.projectservice.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.santa.projectservice.model.dto.ProjectDto;
import com.santa.projectservice.model.dto.ProjectState;
import com.santa.projectservice.model.dto.RegisterDto;
import com.santa.projectservice.exception.project.ProjectNotAuthorizedException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.model.jpa.*;
import com.santa.projectservice.model.mongo.Invite;
import com.santa.projectservice.repository.*;
import com.santa.projectservice.service.FileUploadService;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.model.vo.ArticleVo;
import com.santa.projectservice.model.vo.ProjectGiftVo;
import com.santa.projectservice.model.vo.ProjectInfo;
import com.santa.projectservice.model.vo.UserVo;
import com.santa.projectservice.service.util.UtilQuerys;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.PropertyValueException;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final UserRepository userRepository;
    private final RegisterRepository registerRepository;
    private final ProjectRepository projectRepository;
    private final ModelMapper mapper;
    private final ArticleRepository articleRepository;
    private final FileUploadService fileUploadService;
    private final InviteServiceImpl inviteService;
    private final JPAQueryFactory queryFactory;
    private QProject qProject = QProject.project;
    private QRegister qRegister = QRegister.register;
    private QArticle qArticle = QArticle.article;
    private QUser qUser = QUser.user;
    private QArticleImg qArticleImg = QArticleImg.articleImg;
    private UtilQuerys utilQuerys;

    public ProjectServiceImpl(RegisterRepository registerRepository,
                              ProjectRepository projectRepository,
                              UserRepository userRepository, ArticleRepository articleRepository, FileUploadService fileUploadService, InviteServiceImpl inviteService, EntityManager em, JPAQueryFactory queryFactory, UtilQuerys utilQuerys) {
        this.articleRepository = articleRepository;
        this.fileUploadService = fileUploadService;
        this.inviteService = inviteService;
        this.queryFactory = queryFactory;
        this.utilQuerys = utilQuerys;

        this.mapper = new ModelMapper();
        this.registerRepository = registerRepository;
        this.projectRepository = projectRepository;
        PropertyMap<Register, RegisterDto> replyMapping = new PropertyMap<Register, RegisterDto>() {
            @Override
            protected void configure() {
                map().setPjtId(source.getProject().getId());
                map().setUserId(source.getUser().getId());
            }
        };
        this.mapper.addMappings(replyMapping);
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(rollbackOn =  RegisterMakeException.class)
    public Long createProject(ProjectDto projectDto, List<Long> userList, Long Owner, MultipartFile image) throws RegisterMakeException, ProjectNotFullfillException, IOException {
        // 이미지를 올린 다음에
        String url = fileUploadService.upload(image);
        // 프로젝트를  만들고
        Project project = null;
        try {
            project = projectRepository.save(Project.builder()
                    .content(projectDto.getContent())
                    .title(projectDto.getTitle())
                    .started(projectDto.getStarted())
                    .imgUrl(url)
                    .ended(projectDto.getEnded())
                    .build());
        } catch (PropertyValueException e){
            throw new ProjectNotFullfillException("Title 혹은 Content가 비었습니다. ", e, e.getPropertyName());
        }
        // 내가 주인인 레지스터 만들고
        try{
            registerRepository.save(Register.builder()
                    .user(userRepository.getReferenceById(Owner))
                    .project(project)
                    .type(true)
                    .confirm(true)
                    .alarm(false)
                    .build());
            final Project regiProject = project;
            // 사용자에 대해서 프로젝트 초대를 만듭니다
            Optional<User> user = userRepository.findById(Owner);
            userList.forEach(id -> {
                inviteService.createInvite(Invite.builder()
                        .userId(id)
                        .projectId(regiProject.getId())
                        .inviter(user.get().getNickname())
                        .projectTitle(regiProject.getTitle())
                        .build()
                );
            });
        } catch (DataAccessException e){
            throw new RegisterMakeException("프로젝트 유저들을 초기화하는데 문제가 발생했습니다", e);
        }
        return project.getId();
    }
    @Override
    public void createRegister(Long userId, Long projectId) {
        log.info("createRegister까지");
        Register register = Register.builder()
                .user(userRepository.getReferenceById(userId))
                .project(projectRepository.getReferenceById(projectId))
                .confirm(true)
                .alarm(false)
                .build();
        log.info("여기까진댐");
        registerRepository.save(register);
    }


    @Override
    public String pjtGiftUrl(Long id) {
        return null;
    }

    public List<RegisterDto> findRegistersByUserId(Long id){
        return queryFactory
                .select(qRegister)
                .from(qRegister)
                .where(qRegister.user.id.eq(id))
                .fetch()
                .stream().map(Register::toDto).collect(Collectors.toList());
    }

    @Override
    public Long confirmRegister(Long userId, Long registerId) {
        Register commitRegister = registerRepository.getReferenceById(registerId);
        commitRegister.confirm();
        registerRepository.save(commitRegister);
        return registerId;
    }

    @Override
    public Boolean editProjectContent(Long id, Long projectId, String content) {
        Optional<Long> checkOwner = registerRepository.getOwnerRegisterByUserIdAndProjectId(id, projectId);
        if(!checkOwner.isPresent()){
            throw new ProjectNotAuthorizedException("주인이 아니거나 프로젝트를 찾을 수 없습니다");
        }
        // 주인일 때
        try{
            Project project = projectRepository.getReferenceById(projectId);
            project.editComment(content);
            projectRepository.save(project);
            return true;
        } catch (Exception e) {
            log.error("뭔가 잘못되었는데 뭔지 모르겠습니다");
            return false;
        }
    }

    @Override
    public String deleteProject(Long userId, Long projectId) throws ProjectNotFoundException {
        try {
            Optional<Long> targetRegisterId = registerRepository.getOwnerRegisterByUserIdAndProjectId(userId, projectId);
            Optional<Project> existProject = projectRepository.findById(targetRegisterId.get());
            log.info("찾은 프로젝트: " + existProject);
            Project targetProject = existProject.get();
            targetProject.delete();
            projectRepository.save(targetProject);
            return targetProject.getTitle();
        } catch (DataAccessException e){
            throw new ProjectNotFoundException("프로젝트를 찾을 수 없거나 권한이 없습니다", e.getCause());
        }
    }

    @Override
    public ProjectDto findProjectById(Long id) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(id);
        try{
            Project result = project.get();
            ProjectDto projectDto = result.toDto();
            return projectDto;
        } catch (Exception e){
            log.info(e.getMessage());
            throw new ProjectNotFoundException("프로젝트를 찾을 수 없습니다", e.getCause());
        }
    }

    @Override
    public List<ProjectDto> getAll() {
        List<Project> list = projectRepository.findAll();
        return list.stream().map(Project::toDto).collect(Collectors.toList());
    }

    @Override
    public ProjectDto findProjectByProjectId(Long id) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(id);
        if(!project.isPresent())
            throw new ProjectNotFoundException("해당하는 Id의 프로젝트를 찾을 수 없습니다");
        return project.get().toDto();
    }

    @Override
    public ProjectDto findProjectByProjectIdAndUserId(Long userId, Long projectId) throws ProjectNotFoundException {
        return utilQuerys.projectByUserIdAndProjectId(userId, projectId);
    }

    @Override
    public List<ProjectInfo> projectDtosToInfos(List<ProjectDto> projectDtos) {
        List<Long> numList = new ArrayList<>();
        List<ProjectInfo> projectInfos = new ArrayList<>();
        projectDtos.forEach(pjt -> {
            log.info(pjt.toString());
            numList.add(articleRepository.countByProjectId(pjt.getId()));
        });
        for (int i = 0; i < numList.size(); i++) {
            projectInfos.add(projectDtos.get(i).toInfo(numList.get(i)));
        }
        return projectInfos;
    }

    @Override
    @Transactional
    public List<ProjectDto> findProjectByUserIdAndState(Long userId, ProjectState state){
        switch (state){
            case DONE: return utilQuerys.doneProjects(userId);
            case CURRENT:return utilQuerys.currentProjects(userId);
            case ALL: return utilQuerys.allProjects(userId);
        }
        return null;
    }

    @Override
    public Long projectNum(Long userId){
        return registerRepository.countByUser_Id(userId);
    }

    @Override
    public ProjectGiftVo gift(String uuid){
        Project project = queryFactory.select(qProject).from(qProject)
                .where(qProject.giftUrl.eq(uuid)).fetchFirst();
        List<ArticleVo> articleVos = articleRepository.findAllByProject_Id(project.getId())
                .stream().map(Article::toVo).collect(Collectors.toList());
        List<UserVo> userVos = queryFactory.select(qRegister.user).from(qRegister)
                .where(qRegister.project.id.eq(project.getId())).fetch().stream()
                .map(User::toVo).collect(Collectors.toList());
        return ProjectGiftVo.builder()
                .title(project.getTitle())
                .content(project.getContent())
                .started(project.getStarted())
                .ended(project.getEnded())
                .artielcNum(articleVos.size())
                .articleVos(articleVos)
                .userVos(userVos)
                .build();
    }

    @Override
    @Transactional
    public String finishProject(Long userId, Long projectId) throws ProjectNotFoundException {
        Project project = Optional.ofNullable(queryFactory.select(qRegister.project).from(qRegister)
                .where(
                        qRegister.project.id.eq(projectId),
                        qRegister.user.id.eq(userId),
                        qRegister.type.eq(true)
                )
                .fetchFirst())
            .orElseThrow(() -> new ProjectNotFoundException("끝낼 수 있는 프로젝트가 존재하지 않는데요?"));
        project.finish();
        projectRepository.save(project);
        return project.getGiftUrl();
    }

}
