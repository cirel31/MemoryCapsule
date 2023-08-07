package com.example.userservice.repository;

import com.example.userservice.model.entity.Access;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AccessRepository extends JpaRepository<Access, Long> {

    List<Access> findByUser_IdxAndAccessedAtIsBetween(Long idx, LocalDateTime start, LocalDateTime end);
}
