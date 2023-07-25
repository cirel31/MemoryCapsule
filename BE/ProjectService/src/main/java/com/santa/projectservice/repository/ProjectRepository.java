package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // 프로젝트의 멤버인지 확인하는 함수
    // 1. 프로젝트를 삭제할 때 사용
    // 2. 프로젝트 글 쓸때 사용
    // 3. 프로젝트 조회할때 사용
}
