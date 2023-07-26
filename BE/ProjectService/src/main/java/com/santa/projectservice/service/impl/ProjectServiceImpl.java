package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;
import com.santa.projectservice.repository.ProjectRepository;
import com.santa.projectservice.repository.RegisterRepository;
import com.santa.projectservice.service.ProjectService;
import com.sun.tools.jconsole.JConsoleContext;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;
@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    RegisterRepository registerRepository;
    ProjectRepository projectRepository;
    ModelMapper mapper;

    public ProjectServiceImpl(RegisterRepository registerRepository,
                              ProjectRepository projectRepository) {
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
    }

    @Override
    public Long createProject(ProjectDto projectDto, List<Long> userList, Long Owner) {
        log.info("-------createProject함수----------");
        log.info(userList.toString());
        log.info(Owner.toString());
        log.info(projectDto.toString());
        ModelMapper tmp = new ModelMapper();
        Project project1 = tmp.map(projectDto, Project.class);;
        log.info(project1.toString());


        projectRepository.save(project1);
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
