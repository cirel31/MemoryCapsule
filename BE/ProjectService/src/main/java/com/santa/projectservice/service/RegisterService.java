package com.santa.projectservice.service;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.User;

import java.util.List;

public interface RegisterService {
    /**
     * 프로젝트 초기화 함수
     * @param project - 프로젝트
     * @param userList - 프로젝트의 유저 배열
     * @return 생성된 프로젝트의 사람 수
     */
    Integer initProject(Project project, List<User> userList);



}
