package com.example.userservice.repository;

import com.example.userservice.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);


    @Query(value = "SELECT count(article_idx) " +
            "FROM article a " +
            "WHERE a.article_creator_idx = :userIdx", nativeQuery = true)
    Integer wroteArticleTotal(Long userIdx);
}
