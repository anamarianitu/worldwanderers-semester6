package com.backend.postservice.repositories;

import com.backend.postservice.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findById(Long id);
}
