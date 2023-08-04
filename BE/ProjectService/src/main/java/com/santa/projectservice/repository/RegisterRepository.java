package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    List<Register> findRegistersByUser_Id(Long id);
    @Query("SELECT r FROM Register r WHERE r.user.id = :userId AND " +
            "(CASE WHEN :state = 'ALL' THEN true " +
            "WHEN :state = 'DONE' AND r.confirm = true THEN true " +
            "WHEN :state = 'CURRENT' AND r.confirm = false THEN true " +
            "ELSE false END) = true")
    List<Register> findByUserIdAndProjectState(@Param("userId") Long userId, @Param("state") String state);


    /* N+1문제가 터져서 쿼리 직접 작성 */
    @Query("select r.project.id, r.confirm " +
            "from Register r " +
            "where r.project.id = :projectId " +
            "  and r.user.id = :userId " +
            "  and r.type = true ")
    Optional<Long> getOwnerRegisterByUserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);



    Optional<Register> findByUser_IdAndProject_Id(Long userId, Long projectId);

    Long countByUser_Id(Long userId);
}
