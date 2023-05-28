package com.backend.postservice.repositories;

import com.backend.postservice.models.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends MongoRepository<Like, String> {
    Optional<Like> findById(String id);

    List<Like> findByUserId(String userId);
    List<Like> findByPostId(String postId);

}
