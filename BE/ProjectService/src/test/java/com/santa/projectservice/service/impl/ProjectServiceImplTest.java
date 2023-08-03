package com.santa.projectservice.service.impl;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.service.ArticleService;
import com.santa.projectservice.service.FileUploadService;
import com.santa.projectservice.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

/*
핵심 메소드
assertEquals 			// 두개의 객체가 같은지 확인
assertTrue / asertFalse	// Boolean 결과값 확인
assertNotNull			// 객체가 Null이 아닌지 확인
assertArrayEquals		// 두 배열의 값이 같은지 확인
 */
@Slf4j
@Transactional
@SpringBootTest
@ExtendWith(SpringExtension.class)
@TestMethodOrder(OrderAnnotation.class)
public class ProjectServiceImplTest {

    @Autowired
    ProjectService projectService;
    @Autowired
    ArticleService articleService;
    @Autowired
    FileUploadService fileUploadService;

    public ProjectServiceImplTest() {
    }


    @Test
    public void 프로젝트_생성() {
        ProjectDto projectDto = ProjectDto.builder()
                .title("프로젝트 테스트")
                .content("컨텐츠 테스트")
                .build();
        ArrayList<Long> userList = new ArrayList<>(List.of(1L, 2L, 3L, 4L, 5L));
        Long result = projectService.createProject(projectDto, userList, 1001L);
        ProjectDto resultDto = null;
        try {
            resultDto = projectService.findProjectById(result);
        } catch (ProjectNotFoundException e) {
            log.error("프로젝트가 없다고 뜨네요 ");
            log.error(e.toString());
        }
        log.info(resultDto.toString());
        assertEquals(result, resultDto.getIdx());

    }

    @Test
    public void 유저아이디로_레지스터_찾기() {
        List<RegisterDto> registerDtos = projectService.findRegistersByUserId(1001L);
        registerDtos.forEach(regi -> {
            System.out.println(regi.toString());
        });
    }

    @Test
    public void 프로젝트_생성_후_레지스터_검색() {
        ProjectDto projectDto = ProjectDto.builder()
                .title("프로젝트 테스트")
                .content("컨텐츠 테스트")
                .build();
        ArrayList<Long> userList = new ArrayList<>(List.of(1L, 2L, 3L, 4L, 5L));
        Long result = projectService.createProject(projectDto, userList, 1001L);
        ProjectDto resultDto = null;
        try {
            resultDto = projectService.findProjectById(result);
        } catch (ProjectNotFoundException e) {
            log.error("프로젝트가 없다고 뜨네요 ");
            log.error(e.toString());
        }
        log.info(resultDto.toString());
        assertEquals(result, resultDto.getIdx());
        List<RegisterDto> registerDtos = projectService.findRegistersByUserId(1001L);
        registerDtos.forEach(regi -> {
            System.out.println(regi.toString());
        });
    }

}