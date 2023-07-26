package com.santa.alarm.repository;

import com.santa.alarm.dto.AlarmDto;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<AlarmDto> findUsersAndProjectsWithCriteria() {
        String sqlQuery = "SELECT u.user_email, u.user_nickname, p.pjt_title " +
                "FROM user u, project p, register r, article a " +
                "WHERE u.user_idx = r.rgstr_usr_idx " +
                "AND r.rgstr_pjt_idx = p.pjt_idx " +
                "AND p.pjt_idx = a.article_pjt_idx " +
                "AND u.user_idx = a.article_creator_idx " +
                "AND r.rgstr_alarm = 0 " +
                "AND ((p.pjt_alarm_type = 0 AND DATEDIFF(NOW(), a.article_created) = p.pjt_alarm) " +
                "OR (p.pjt_alarm_type = 1 AND DATE(a.article_created) <> CURDATE() AND (p.pjt_alarm & (1 << (DAYOFWEEK(NOW()) - 1))) > 0))";

        Query query = entityManager.createNativeQuery(sqlQuery);
        List<Object[]> result = query.getResultList();

        List<AlarmDto> AlarmUserList = new ArrayList<>();
        for (Object[] obj : result) {
            AlarmDto alarmDto = new AlarmDto();
            alarmDto.setUserEmail((String) obj[0]);
            alarmDto.setUserNickname((String) obj[1]);
            alarmDto.setPjtTitle((String) obj[2]);
            AlarmUserList.add(alarmDto);
        }
        return AlarmUserList;
    }
}









