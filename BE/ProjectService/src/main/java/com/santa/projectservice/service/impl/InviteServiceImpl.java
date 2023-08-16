package com.santa.projectservice.service.impl;

import com.santa.projectservice.exception.User.UserNotFoundException;
import com.santa.projectservice.model.jpa.Project;
import com.santa.projectservice.model.jpa.User;
import com.santa.projectservice.model.mongo.Invite;
import com.santa.projectservice.repository.InviteRepository;
import com.santa.projectservice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InviteServiceImpl {
    private final InviteRepository inviteRepository;
    private final UserRepository userRepository;


    public InviteServiceImpl(InviteRepository inviteRepository, UserRepository userRepository) {
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
    }

    public void createInvite(User owner, Project project, Long target) throws UserNotFoundException {
        if (!userRepository.existsById(target))
            throw new UserNotFoundException("그런 유저가 없어요 : " + target.toString());
        Invite invite = Invite.builder()
                .userId(target)
                .projectId(project.getId())
                .inviter(owner.getNickname())
                .projectTitle(project.getTitle())
                .build();
        // 만료 시간 설정 (14일)
        Date expireDate = new Date(System.currentTimeMillis() + 14 * 24 * 60 * 60 * 1000);
        invite.setExpire(expireDate);
        inviteRepository.save(invite);
    }

    public Invite getInviteById(String id) {
        return inviteRepository.findById(id).orElse(null);
    }

    public List<Invite> getAllInvites() {
        return inviteRepository.findAll();
    }

    public void deleteInviteById(String id) {
        inviteRepository.deleteById(id);
    }

    public List<Invite> getInvitesByUserId(Long userId) {return inviteRepository.findAllByUserId(userId);}
}
