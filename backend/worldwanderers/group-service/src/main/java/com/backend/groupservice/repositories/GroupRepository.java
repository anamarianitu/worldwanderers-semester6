package com.backend.groupservice.repositories;

import com.backend.groupservice.models.Group;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GroupRepository extends MongoRepository<Group, String> {

    Optional<Group> findById(String id);
}
