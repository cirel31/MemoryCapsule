package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.ProjectEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    // 프로젝트의 멤버인지 확인하는 함수
    // 1. 프로젝트를 삭제할 때 사용
    // 2. 프로젝트 글 쓸때 사용
    // 3. 프로젝트 조회할때 사용
}
