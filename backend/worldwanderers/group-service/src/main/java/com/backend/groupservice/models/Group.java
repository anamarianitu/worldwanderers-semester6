package com.backend.groupservice.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document
@Data
@NoArgsConstructor
public class Group {
    @Id
    private String id;

    @NonNull
    private Long destinationId;
    @NonNull
    private String title;
    @NonNull
    private String description;

    private List<String> userIds;

    private LocalDateTime createdAt;


    public Group(String id, String title, Long destinationId, String description) {
        this.id = id;
        this.destinationId = destinationId;
        this.description = description;
        this.title = title;
        this.userIds = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDestinationId(Long destinationId) {
        this.destinationId = destinationId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }

    public String getId() {
        return id;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getUserIds() {
        return userIds;
    }
}
