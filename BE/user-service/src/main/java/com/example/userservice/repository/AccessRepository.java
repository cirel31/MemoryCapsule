package com.example.userservice.repository;

import com.example.userservice.model.entity.Access;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

public interface AccessRepository extends JpaRepository<Access, Long> {

    List<Access> findByIdxAndAccessedAtIsBetween(Long idx, LocalDateTime start, LocalDateTime end);
}
