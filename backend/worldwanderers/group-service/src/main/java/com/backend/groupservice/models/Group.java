package com.backend.groupservice.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
public class Group {
    @Id
    private String id;

    private Long destinationId;

    private String description;

    public Group(String id, Long destinationId, String description) {
        this.id = id;
        this.destinationId = destinationId;
        this.description = description;
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

    public String getId() {
        return id;
    }

    public Long getDestinationId() {
        return destinationId;
    }

    public String getDescription() {
        return description;
    }
}
