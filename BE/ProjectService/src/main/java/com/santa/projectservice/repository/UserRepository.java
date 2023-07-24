package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

}
