package com.backend.postservice.repositories;

import com.backend.postservice.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TagRepository extends MongoRepository<Tag, String> {

    Optional<Tag> findById(String id);
}
