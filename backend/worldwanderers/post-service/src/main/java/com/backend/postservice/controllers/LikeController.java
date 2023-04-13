package com.backend.postservice.controllers;

import com.backend.postservice.models.Like;
import com.backend.postservice.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Like>> getLikeById(@PathVariable(value = "id") Long id){
        Optional<Like> like = likeService.getLikeById(id);

        if (like != null) {
            return new ResponseEntity<>(like, OK);
        } else {
            return ResponseEntity.notFound().build();
        }

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

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeLike(@PathVariable(value = "id") Long id){
        boolean removed = likeService.removeLike(id);
        if(removed) {
            return ResponseEntity.ok("Removed successfully.");
        } else {
            return ResponseEntity.status(NOT_FOUND).body("Could not be removed.");
        }
    }
}
