package com.santa.projectservice.service;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;

import java.util.List;

public interface ProjectService {

    /**
     * 프로젝트를 초기에 생성하는 함수
     * @param project - 프로젝트 정보
     * @param userList - 유저 정보
     * @param Owner - 프로젝트 주인
     * @return
     */
    Long createProject(ProjectDto project, List<Long> userList, Long Owner);

    /**
     * @param id - 프로젝트 id
     * @param comment - 수정할 코멘트 내용
     * @return - 성공여부 리턴
     */
    Boolean editProjectContent(Long id, String comment);

    /**
     * @param id - 프로젝트 id
     * @return - 프로젝트 show페이지 주소
     */
    String pjtGiftUrl(Long id);

    /**
     * 유저의 모든 프로젝트를 반환
     * @param user - 유저
     * @return - 프로젝트 리스트
     */
    List<Project> projectList(User user);

    List<RegisterDto> findRegistersByUserId(Long Id);

}
