package com.santa.alarm.repository;

import com.santa.alarm.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findProjectsByPjtAlarmTypeAndPjtAlarmEquals(int alarmType, int pjtAlarm);
}
