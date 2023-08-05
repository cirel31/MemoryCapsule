package com.santa.projectservice.service.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.ProjectState;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.exception.project.ProjectNotAuthorizedException;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.jpa.*;
import com.santa.projectservice.jpa.QArticle;
import com.santa.projectservice.jpa.QArticleImg;
import com.santa.projectservice.jpa.QProject;
import com.santa.projectservice.jpa.QRegister;
import com.santa.projectservice.jpa.QUser;
import com.santa.projectservice.repository.ArticleRepository;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.RegisterRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.FileUploadService;
import com.santa.projectservice.service.ProjectService;
import com.santa.projectservice.vo.ProjectInfo;
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
    private final JPAQueryFactory queryFactory;
    private QProject qProject = QProject.project;
    private QRegister qRegister = QRegister.register;
    private QArticle qArticle = QArticle.article;
    private QUser qUser = QUser.user;
    private QArticleImg qArticleImg = QArticleImg.articleImg;

    public ProjectServiceImpl(RegisterRepository registerRepository,
                              ProjectRepository projectRepository,
                              UserRepository userRepository, ArticleRepository articleRepository, FileUploadService fileUploadService, EntityManager em) {
        this.articleRepository = articleRepository;
        this.fileUploadService = fileUploadService;
        this.queryFactory = new JPAQueryFactory(em);
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

        String url = fileUploadService.upload(image);
        Project project1 = Project.builder()
                .content(projectDto.getContent())
                .title(projectDto.getTitle())
                .started(projectDto.getStarted())
                .imgUrl(url)
                .ended(projectDto.getEnded())
                .build();
        log.info(project1.toString());
        Project project = null;
        try {
            project = projectRepository.save(project1);
        } catch (PropertyValueException e){
            throw new ProjectNotFullfillException("Title 혹은 Content가 비었습니다. ", e, e.getPropertyName());
        }
        try{
            Register register = Register.builder()
                            .user(userRepository.getReferenceById(Owner))
                            .project(project)
                            .type(true)
                            .confirm(true)
                            .alarm(false)
                            .build();
            registerRepository.save(register);
            final Project regiProject = project;
            userList.forEach(id -> {
                User user = userRepository.getReferenceById(id);
                registerRepository.save(Register.builder()
                        .user(userRepository.getReferenceById(Owner))
                        .project(regiProject)
                        .type(false)
                        .confirm(true)
                        .alarm(false)
                        .build());
            });
        } catch (DataAccessException e){
            throw new RegisterMakeException("프로젝트 유저들을 초기화하는데 문제가 발생했습니다", e);
        }
        return project.getId();
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
        return queryFactory
                .select(qRegister.project)
                .from(qRegister)
                .where(qRegister.user.id.eq(userId), qRegister.project.id.eq(projectId))
                .fetchFirst()
                .toDto();
    }

    @Override
    public List<ProjectInfo> projectDtosToInfos(List<ProjectDto> projectDtos) {
        List<Long> numList = new ArrayList<>();
        List<ProjectInfo> projectInfos = new ArrayList<>();
        projectDtos.forEach(pjt -> {
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
        return queryFactory
                .select(qRegister.project).from(qRegister)
                .where(qRegister.user.id.eq(userId),
                        state == ProjectState.DONE ? qRegister.confirm.isTrue() :
                        state == ProjectState.CURRENT ? qRegister.confirm.isFalse() : null
                )
                .fetch().stream().map(Project::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ProjectDto> findProjectsByUserId(Long userId){
        return queryFactory
                .select(qRegister.project)
                .from(qRegister)
                .where(qRegister.user.id.eq(userId)).fetch()
                .stream().map(Project::toDto).collect(Collectors.toList());
    }

    @Override
    public Long projectNum(Long userId){
        return registerRepository.countByUser_Id(userId);
    }

}
