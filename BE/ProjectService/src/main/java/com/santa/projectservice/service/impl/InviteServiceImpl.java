package com.santa.projectservice.service.impl;

import com.santa.projectservice.model.mongo.Invite;
import com.santa.projectservice.repository.InviteRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InviteServiceImpl {
    private final InviteRepository inviteRepository;


    public InviteServiceImpl(InviteRepository inviteRepository) {
        this.inviteRepository = inviteRepository;
    }

    public void createInvite(Invite invite) {
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
