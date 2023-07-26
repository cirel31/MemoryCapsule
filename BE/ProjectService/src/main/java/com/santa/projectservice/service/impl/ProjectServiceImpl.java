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

    RegisterRepository registerRepository;
    ProjectRepository projectRepository;
    ModelMapper mapper;

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
                map().setRgstr_pjt_idx(source.getProject().getPjt_idx());
                map().setRgstr_user_idx(source.getUser().getId());
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
        Long pjt_id = project1.getPjt_idx();
        log.info("입력된 값 : " + project1.toString());
        // 이부분 유저가 없을때 예외처리 해주어야 합니다.
        // Transaction 격리 생각해야 합니다
        userList.forEach(id -> {
            // 이따구로짜면안댐
            User user = userRepository.findById(id).get();
            // rgstr_confirm은 그냥 초대를 주었다는 말이다. confirm이 true가 되어야 진짜 들어간거다
            registerRepository.save(new Register(user, project, false, false, false));
        });
        log.info("-------createProject함수 끝----------");
        return null;
    }

    @Override
    public Boolean editProjectContent(Long id, String comment) {
        return null;
    }

    @Override
    public String pjtGiftUrl(Long id) {
        return null;
    }

    @Override
    public List<Project> projectList(User user) {
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
}
