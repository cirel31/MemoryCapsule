package com.santa.alarm.repository;

import com.santa.alarm.Entity.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegisterRepository extends JpaRepository<Register, Long> {
    List<Register> findRegistersByRgstrAlarmIsFalse();
}
