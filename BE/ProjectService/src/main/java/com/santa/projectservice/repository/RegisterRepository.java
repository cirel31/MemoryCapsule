package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.Register;
import com.santa.projectservice.jpa.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RegisterRepository extends JpaRepository<Register, Long> {
    List<Register> findRegistersByUser_Id(Long id);
    // N+1 문제 발생
    Register findRegisterByUser_IdAndProject_Id(Long user_Id, Long project_Id);

    /* N+1문제가 터져서 쿼리 직접 작성 */
    @Query("select r.project.id, r.confirm " +
            "from Register r " +
            "where r.project.id = :projectId " +
            "  and r.user.id = :userId " +
            "  and r.type = true ")
    Long getRegisterByUserIdAndProjectId(@Param("userId") Long userId, @Param("projectId") Long projectId);

}
