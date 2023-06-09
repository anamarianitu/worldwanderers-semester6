package com.backend.postservice.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document
@Data
@NoArgsConstructor
public class Like {

    @Id
    private String id;

    private String postId;

    private String userId;

    public Like(String id, String postId, String userId) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
    }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getPostId() { return postId; }

    public void setPostId(String postId) { this.postId = postId; }

    public String getUserId() { return userId; }

    public void setUserId(String postId) { this.userId = userId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Like like = (Like) o;
        return Objects.equals(id, like.id) && Objects.equals(postId, like.postId);
    }

    @Override
    public String toString() {
        return "Like{" +
                "id=" + id +
                ", post id='" + postId + '\'' +
                '}';
    }
}