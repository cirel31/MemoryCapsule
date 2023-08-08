package com.example.userservice.repository;

import com.example.userservice.model.entity.ConnectId;
import com.example.userservice.model.entity.Connected;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConnectedRepository extends JpaRepository<Connected, ConnectId> {
//    @Query("DELETE FROM Connected WHERE  (Connected .connectId.requesterId = :#{#ids.requesterId} AND Connected .connectId.requesteeId = :#{#ids.requesteeId})" +
//            "OR (Connected .connectId.requesterId = :#{#ids.requesteeId} AND Connected .connectId.requesteeId = :#{#ids.requesterId})")
//    void deleteConnection(@Param("ids")ConnectId connectionId);
    @Modifying
    @Query(value = "DELETE FROM Connected l " +
            "WHERE l.connectId.requesterId = :reviewIdx " +
            "AND l.connectId.requesteeId = :userIdx")
    int disconnectFriend(@Param("reviewIdx") Long reviewIdx,
                      @Param("userIdx") Long userIdx);


    @Modifying
    @Query(value = "DELETE FROM Connected l " +
            "WHERE l.connectId.requesterId = :hostId " +
            "AND l.connectId.requesteeId = :guestId", nativeQuery = true)
    int addFriend(@Param("hostId") Long hostId,
                  @Param("guestId") Long guestId);

    @Modifying
    @Query(value = "UPDATE Connected " +
            "SET Connected .confirm = :state " +
            "where Connected .connectId.requesterId = :erId and Connected .connectId.requesteeId = :eeId", nativeQuery = true)
    int updateConfirmStateByerIdAndeeId(@Param("erId") final Long erId,@Param("eeId") final Long eeId,@Param("state") final Boolean state);

    Optional<Connected> findByConnectIdRequesterIdAndConnectIdRequesteeId(Long connectId_requesterId, Long connectId_requesteeId);
}
