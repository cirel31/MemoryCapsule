package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    List<Register> findRegistersByUser_Id(Long id);
}
