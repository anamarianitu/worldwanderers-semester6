package com.backend.likeservice.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="post_id") //After the implementation of Post, it will be replaced by a foreign key
    private Long postId;

    public Like(Long id, Long postId) {
        this.id = id;
        this.postId = postId;
    }

    public Like() {

    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getPostId() { return postId; }

    public void setPostId(Long postId) { this.postId = postId; }

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