package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.ArticleImgEntity;
import org.springframework.data.repository.CrudRepository;

public interface ArticleImgRepository extends CrudRepository<ArticleImgEntity, Long> {
}
