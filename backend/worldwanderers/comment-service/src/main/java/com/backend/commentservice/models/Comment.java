package com.backend.commentservice.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="post_id")
    private Long postId;

    @Column(name="comment")
    private String comment;

    public Comment(Long id, Long postId, String comment) {
        this.id = id;
        this.postId = postId;
        this.comment = comment;
    }

    public Comment() {

    }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getPostId() { return postId; }

    public void setPostId(Long postId) { this.postId = postId; }

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
                ", content='" + comment + '\'' +
                '}';
    }
}