package com.santa.projectservice.repository;

import com.santa.projectservice.jpa.RegisterEntity;
import org.springframework.data.repository.CrudRepository;

public interface RegisterRepository extends CrudRepository<RegisterEntity, Long> {
}
