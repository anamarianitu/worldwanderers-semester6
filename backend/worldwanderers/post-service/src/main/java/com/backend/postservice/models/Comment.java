package com.backend.postservice.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Objects;

@Document
@Data
@NoArgsConstructor
public class Comment {

    @Id
    private String id;
    @NonNull
    private String postId;
    @NonNull
    private String userId;
    @NonNull
    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Comment(String id, String postId, String userId, String comment) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.comment = comment;
    }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getPostId() { return postId; }

    public void setPostId(String postId) { this.postId = postId; }

    public String getUserId() { return userId; }

    public void setUserId(String userId) { this.userId = userId; }

    public String getComment() { return comment; }

    public void setComment(String comment) { this.comment = comment; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) && Objects.equals(postId, comment.postId)
                && Objects.equals(comment, comment.comment);
    }

    @Override
    public String toString() {
        return "Content{" +
                "id=" + id +
                ", post id='" + postId + '\'' +
                ", user id='" + userId + '\'' +
                ", content='" + comment + '\'' +
                '}';
    }
}