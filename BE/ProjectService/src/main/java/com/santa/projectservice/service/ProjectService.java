package com.santa.projectservice.service;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;

public interface ProjectService {
    /**
     * 프로젝트 생성 함수
     * @param project
     * @return Long - 생성된 프로젝트의 pjt_idx
     */
    Long createProject(Project project);

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

}
