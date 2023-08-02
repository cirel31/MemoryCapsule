package com.santa.board.repository;

import com.santa.board.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LikeRepository extends JpaRepository<Liked, Long> {
}
