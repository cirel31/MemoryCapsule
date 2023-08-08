package com.santa.projectservice.repository;

import com.santa.projectservice.model.jpa.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
