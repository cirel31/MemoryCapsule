package com.santa.projectservice.repository;

import com.santa.projectservice.mongo.Invite;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InviteRepository extends MongoRepository<Invite, String> {

    Invite findByUserId(Long userId);
}
