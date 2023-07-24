package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.ArticleEntity;
import org.springframework.data.repository.CrudRepository;

public interface ArticleRepository extends CrudRepository<ArticleEntity, Long> {
}
