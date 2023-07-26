package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Project;
import com.santa.projectservice.jpa.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
