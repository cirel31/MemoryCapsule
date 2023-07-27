package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.RegisterRepository;
import com.santa.projectservice.repository.UserRepository;
import com.santa.projectservice.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Service;

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

        // Register(Entity) -> RegisterDto 매핑 규칙 추가
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
    public Long createProject(ProjectDto projectDto, List<Long> userList, Long Owner) {
        log.info("-------createProject함수----------");
        log.info(userList.toString());
        log.info(Owner.toString());
        log.info(projectDto.toString());
        ModelMapper tmp = new ModelMapper();
        Project project1 = tmp.map(projectDto, Project.class);;
        Project project = projectRepository.save(project1);
        Long pjt_id = project1.getId();
        log.info("입력된 값 : " + project1.toString());
        // 이부분 유저가 없을때 예외처리 해주어야 합니다.
        // Transaction 격리 생각해야 합니다
        registerRepository.save(new Register(
                userRepository.getReferenceById(Owner), project,
                true, false, false)
        );
        userList.forEach(id -> {
            //getReferenceById를 쓰면 id로 조회하는 쿼리가 발생하지 않는다(Lazy)
            // 입력을 할 때 대상 ID가 없으면 EntityNotFoundException을 발생시킨다.
            User user = userRepository.getReferenceById(id);
            // getOne, findById deprecated됨 -> getReferenceById로 대체
            // User user = userRepository.getOne(id);
            // User user = userRepository.findById(id).get();
            registerRepository.save(new Register(user, project, false, false, false));
        });
        log.info("-------createProject함수 끝----------");
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
}
