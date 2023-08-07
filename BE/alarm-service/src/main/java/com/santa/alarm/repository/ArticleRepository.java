package com.santa.alarm.repository;

import com.santa.alarm.Entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findArticlesByArticleCreatedAfterAndProjectPjtAlarmTypeIsAndProjectPjtAlarmEquals(Timestamp date, int alarmType, int pjtAlarm);
}

