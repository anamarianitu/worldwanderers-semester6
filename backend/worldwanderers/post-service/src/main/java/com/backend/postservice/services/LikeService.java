package com.backend.postservice.services;

import com.backend.postservice.models.Like;
import com.backend.postservice.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

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

    public boolean removeLike(String postId, String userId) {
        List<Like> likes = likeRepository.findAll();
        for (Like like : likes) {
            if (like.getPostId().equals(postId) && like.getUserId().equals(userId)) {
                likeRepository.delete(like);
                return true;
            }
        }
        return false;
    }
    public boolean isPostLikedByUser(String postId, String userId)
    {
        AtomicBoolean isLiked = new AtomicBoolean(false);
        getAllLikes().forEach(like -> {
            if (Objects.equals(like.getPostId(), postId) && Objects.equals(like.getUserId(), userId)) {
                isLiked.set(true);
            }
        });

        return isLiked.get();
    }

    public List<Like> getLikesByPostId(String postId){
        List<Like> likesFromPost = new ArrayList<>();

        getAllLikes().forEach(like -> {
            if (Objects.equals(like.getPostId(), postId)) {
                likesFromPost.add(like);
            }
        });

        return likesFromPost;
    }

    public void deleteLikesOfPost(String postId) {
        List<Like> likes = likeRepository.findByPostId(postId);
        likeRepository.deleteAll(likes);
    }

    public int countLikesOfPost(String postId) {
        List<Like> likes = likeRepository.findByPostId(postId);
        return likes.size();
    }


}
