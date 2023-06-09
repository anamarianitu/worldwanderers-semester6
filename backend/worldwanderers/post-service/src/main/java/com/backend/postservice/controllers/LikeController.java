package com.backend.postservice.controllers;

import com.backend.postservice.models.Like;
import com.backend.postservice.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Like>> getLikeById(@PathVariable(value = "id") String id){
        Optional<Like> like = likeService.getLikeById(id);

        if (like != null) {
            return new ResponseEntity<>(like, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<List<Like>> getLikesByPostId(@PathVariable(value = "id") String postId){
        return new ResponseEntity<>(likeService.getLikesByPostId(postId), OK);

    }

    @GetMapping("/liked-by")
    public ResponseEntity<Boolean> isPostLikedByUser(@RequestParam("postId") String postId,
                                                     @RequestParam("userId") String userId) {

        Boolean isLiked = likeService.isPostLikedByUser(postId, userId);

        return new ResponseEntity<>(isLiked, OK);
    }
    @GetMapping("/")
    public ResponseEntity<List<Like>> getAllLikes(){
        return new ResponseEntity<>(likeService.getAllLikes(), OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Like> addLike(@RequestBody Like like){
        Like created = likeService.addLike(like);
        return new ResponseEntity<>(created, CREATED);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeLike(@RequestParam("postId") String postId,
                                             @RequestParam("userId") String userId){

        boolean removed = likeService.removeLike(postId, userId);
        if(removed) {
            return ResponseEntity.ok("Removed successfully.");
        } else {
            return ResponseEntity.status(NOT_FOUND).body("Could not be removed.");
        }
    }
}
