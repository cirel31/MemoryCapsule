package com.santa.projectservice.repository;

import com.santa.projectservice.mongo.Invite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InviteRepository extends MongoRepository<Invite, String> {

    List<Invite> findAllByUserId(Long userId);
}
