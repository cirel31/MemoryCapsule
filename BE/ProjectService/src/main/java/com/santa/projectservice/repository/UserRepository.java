package com.santa.projectservice.repository;

import com.santa.projectservice.model.jpa.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
