package com.backend.postservice.repositories;

import com.backend.postservice.models.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LikeRepository extends MongoRepository<Like, String> {
    Optional<Like> findById(String id);
}
