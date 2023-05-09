package com.backend.postservice.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
@Document
@Data
@NoArgsConstructor
public class Tag {

    @Id
    private Long id;

    private String name;

    private String postId;

    public Tag(Long id, String name, String postId) {
        this.id = id;
        this.name = name;
        this.postId = postId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPostId() {
        return postId;
    }
}
