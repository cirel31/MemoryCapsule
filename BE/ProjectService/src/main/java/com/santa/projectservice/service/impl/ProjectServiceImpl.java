package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.register.RegisterMakeException;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.RegisterRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.PropertyValueException;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {
    private final UserRepository userRepository;
    private final RegisterRepository registerRepository;
    private final ProjectRepository projectRepository;
    private final ModelMapper mapper;

    public ProjectServiceImpl(RegisterRepository registerRepository,
                              ProjectRepository projectRepository,
                              UserRepository userRepository) {
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
    public Long createProject(ProjectDto projectDto, List<Long> userList, Long Owner) throws RegisterMakeException{
        log.info(userList.toString());
        log.info(Owner.toString());
        log.info(projectDto.toString());
        ModelMapper tmp = new ModelMapper();
        Project project1 = Project.builder()
                .content(projectDto.getContent())
                .title(projectDto.getTitle())
                .build();
        log.info(project1.toString());
        Project project = null;
        try {
            project = projectRepository.save(project1);
        } catch (PropertyValueException e){
            log.error("TItle 혹은 Content가 비어있습니다.");
            log.error(e.getMessage());
            throw e;
        } catch (RuntimeException e) {
            log.error("무결성을 만족하지 못하는 요청입니다. ");
            log.error(e.getMessage());
            throw e;
        }
        log.info("입력된 값 : " + project1.toString());
        try{
            Register register = new Register(
                    userRepository.getReferenceById(Owner),
                    project,
                    true, false, false
            );
            registerRepository.save(register);
            final Project regiProject = project;
            userList.forEach(id -> {
                //getReferenceById를 쓰면 id로 조회하는 쿼리가 발생하지 않는다(Lazy)
                // 입력을 할 때 대상 ID가 없으면 EntityNotFoundException을 발생시킨다.
                User user = userRepository.getReferenceById(id);
                registerRepository.save(new Register(user, regiProject, false, false, false));
            });
        } catch (DataAccessException e){
            String msg = "프로젝트 유저들을 초기화하는데 문제가 발생했습니다";
            System.out.println(msg);
            throw new RegisterMakeException(msg, e);
        }
        return project.getId();
    }


    @Override
    public String pjtGiftUrl(Long id) {
        return null;
    }

    public List<RegisterDto> findRegistersByUserId(Long id){
        List<Register> registerList = registerRepository.findRegistersByUser_Id(id);
        List<RegisterDto> registerDtoList = new ArrayList<>();
        registerList.forEach(r -> {
            registerDtoList.add(mapper.map(r, RegisterDto.class));
        });
        return registerDtoList;
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
        Long checkOwner = registerRepository.getRegisterByUserIdAndProjectId(id, projectId);
        // 내가 주인이 아니면 바꿀 수 없다
        if(checkOwner == null){
            return false;
        }
        // 주인일 때
        Project project = projectRepository.getReferenceById(projectId);
        project.editComment(content);
        projectRepository.save(project);
        return true;
    }

    @Override
    public String deleteProject(Long userId, Long projectId) {
        Long targetRegisterId = registerRepository.getRegisterByUserIdAndProjectId(userId, projectId);
        log.info("찾은 레지스터 Id: " + targetRegisterId);
        Optional<Project> existProject = projectRepository.findById(targetRegisterId);
        log.info("찾은 프로젝트: " + existProject.toString());
        Project targetProject = existProject.get();
        targetProject.delete();
        projectRepository.save(targetProject);
        return targetProject.getTitle();
    }

    @Override
    public ProjectDto findProjectById(Long id) throws ProjectNotFoundException {
        Optional<Project> project = projectRepository.findById(id);
        try{
            Project result = project.get();
            ProjectDto projectDto = ProjectDto.builder()
                    .title(result.getTitle())
                    .idx(result.getId())
                    .content(result.getContent())
                    .alarm(result.getAlarm())
                    .alarm_type(result.getAlarmType())
                    .deleted(result.getDeleted())
                    .state(result.getState())
                    .created(result.getCreated())
                    .build();
            return projectDto;
        } catch (Exception e){
            log.info(e.getMessage());
            throw new ProjectNotFoundException();
        }
    }
}
