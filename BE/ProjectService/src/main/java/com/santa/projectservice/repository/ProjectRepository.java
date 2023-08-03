package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {


}
