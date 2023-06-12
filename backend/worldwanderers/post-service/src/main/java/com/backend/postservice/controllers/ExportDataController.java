package com.backend.postservice.controllers;

import com.backend.postservice.models.Post;
import com.backend.postservice.services.CommentService;
import com.backend.postservice.services.LikeService;
import com.backend.postservice.services.PostService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/export")
public class ExportDataController {

    @Autowired
    private PostService postService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

    @GetMapping(value = "/user/{id}", produces = "text/csv")
    @ResponseBody
    public ResponseEntity<Resource> exportPosts(@PathVariable("id") String id) {
        try {
            // Create a temporary CSV file
            File csvFile = File.createTempFile("exported", ".csv");

            // Write the CSV data
            try (FileWriter writer = new FileWriter(csvFile)) {
                // Write the CSV header
                writer.append("Post Content,Number of Likes,Number of Comments,Created At");
                writer.append("\n");

                // Get all posts
                List<Post> posts = postService.getPostsOfUser(id);

                // Iterate over each post
                for (Post post : posts) {
                    // Get the number of likes for the post
                    int likeCount = likeService.countLikesOfPost(post.getId());

                    // Get the number of comments for the post
                    int commentCount = commentService.countCommentsOfPost(post.getId());

                    // Write post details to the CSV file
                    writer.append(post.getDescription());
                    writer.append(",");
                    writer.append(String.valueOf(likeCount));
                    writer.append(",");
                    writer.append(String.valueOf(commentCount));
                    writer.append(",");
                    writer.append(post.getCreatedAt().toString());
                    writer.append("\n");
                }

                writer.flush();
            }

            // Create a Resource object for the CSV file
            Resource resource = new FileSystemResource(csvFile);

            // Set the appropriate headers for the response
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=data.csv");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .body(resource);
        } catch (IOException e) {
            // Handle any exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
