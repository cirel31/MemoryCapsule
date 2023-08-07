package com.santa.projectservice.repository;

import com.santa.projectservice.model.jpa.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    public List<Article> findAllByUser_Id(Long id);
    List<Article> findByUser_IdAndProject_Id(Long userId, Long projectId);
    Optional<Article> findFirstByUser_IdAndProject_IdOrderByCreatedDesc(Long userId, Long projectId);

    List<Article> findAllByProject_Id(Long projectId);
    long countByProjectId(Long projectId);
}
