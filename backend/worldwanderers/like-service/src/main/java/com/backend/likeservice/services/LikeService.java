package com.backend.likeservice.services;

import com.backend.likeservice.models.Like;
import com.backend.likeservice.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;


    public Optional<Like> getLikeById(Long id){
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

    public boolean removeLike(Long likeId)
    {
        try {
            likeRepository.deleteById(likeId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
