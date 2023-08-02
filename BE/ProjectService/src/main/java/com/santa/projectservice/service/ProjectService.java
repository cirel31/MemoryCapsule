package com.santa.projectservice.service;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.dto.RegisterDto;
import com.santa.projectservice.exception.project.ProjectNotFoundException;
import com.santa.projectservice.exception.project.ProjectNotFullfillException;
import com.santa.projectservice.exception.register.RegisterMakeException;
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
    Long  createProject(ProjectDto project, List<Long> userList, Long Owner)  throws RegisterMakeException, ProjectNotFullfillException;

    /**
     * @param id - 프로젝트 id
     * @param comment - 수정할 코멘트 내용
     * @return - 성공여부 리턴
     */
    Boolean editProjectContent(Long id, Long projectId, String comment) ;

    /**
     * @param id - 프로젝트 id
     * @return - 프로젝트 show페이지 주소
     */
    String pjtGiftUrl(Long id);

    /**
     * 유저의 모든 프로젝트를 반환
     * @param id -유저 Id
     * @return - 프로젝트 리스트
     */
    List<RegisterDto> findRegistersByUserId(Long id);

    /**
     * 레지스터를 confirm함
     * @param userId - 컨펌할 유저
     * @param registerId - 컨펌할 레지스터 아이디
     * @return - 커펌한 레지스터 Id
     */
    Long confirmRegister(Long userId, Long registerId);

    /**
     * 프로젝트를 삭제합니다.
     * register_rgstr_type이 1이어야(주인이어야) 삭제가 가능합니다
     * @param userId - 유저 아이디
     * @param projectId - 삭제할 프로젝트 아이디
     * @return - 삭제한 프로젝트 타이틀
     */
    String deleteProject(Long userId, Long projectId) throws ProjectNotFoundException;

    ProjectDto findProjectById(Long id) throws ProjectNotFoundException;

    List<ProjectDto> getAll();

    ProjectDto findProjectByProjectId(Long id) throws ProjectNotFoundException;
    ProjectDto findProjectByProjectIdAndUserId(Long userId, Long projectId) throws ProjectNotFoundException;
}