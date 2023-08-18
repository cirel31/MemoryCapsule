package com.santa.projectservice.repository;

import com.santa.projectservice.model.jpa.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    List<Register> findRegistersByUser_Id(Long id);
    /* N+1문제가 터져서 쿼리 직접 작성 */
    @Query("select r.project.id, r.confirm " +
            "from Register r " +
            "where r.project.id = :projectId " +
            "  and r.user.id = :userId " +
            "  and r.type = true ")
    Optional<Long> getOwnerRegisterByUserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);


    Long countByUser_Id(Long userId);
    Integer countAllByUser_Id(Long userId);
}
