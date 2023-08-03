package com.example.userservice.repository;

import com.example.userservice.model.entity.ConnectId;
import com.example.userservice.model.entity.Connected;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConnectedRepository extends JpaRepository<Connected, ConnectId> {
//    @Query("DELETE FROM Connected WHERE  (Connected .connectId.requesterId = :#{#ids.requesterId} AND Connected .connectId.requesteeId = :#{#ids.requesteeId})" +
//            "OR (Connected .connectId.requesterId = :#{#ids.requesteeId} AND Connected .connectId.requesteeId = :#{#ids.requesterId})")
//    void deleteConnection(@Param("ids")ConnectId connectionId);
}
