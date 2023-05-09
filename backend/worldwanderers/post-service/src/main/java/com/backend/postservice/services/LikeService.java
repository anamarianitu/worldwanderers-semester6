package com.backend.postservice.services;

import com.backend.postservice.models.Like;
import com.backend.postservice.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public Optional<Like> getLikeById(String id){
        return likeRepository.findById(id);
    }

    public List<Like> getAllLikes()
    {
        return likeRepository.findAll();
    }

    public Like addLike(Like like)
    {
        return likeRepository.save(like);
    }

    public boolean removeLike(String likeId)
    {
        try {
            likeRepository.deleteById(likeId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
