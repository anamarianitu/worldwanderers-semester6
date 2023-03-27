package com.backend.likeservice.repositories;

import com.backend.likeservice.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findById(Long id);
}
