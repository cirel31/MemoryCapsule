package com.example.userservice.repository;

import com.example.userservice.model.entity.ConnectId;
import com.example.userservice.model.entity.Connected;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ConnectedRepository extends JpaRepository<Connected, ConnectId> {
    @Query("delete from Connected c WHERE (c.connectId.requestor = ?1 and c.connectId.requestee = ?2) or (c.connectId.requestor = ?2 and c.connectId.requestee = ?1) ")
    int deleteByConnectId(ConnectId connectId);
}
