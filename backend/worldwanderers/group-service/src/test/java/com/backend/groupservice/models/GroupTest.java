package com.backend.groupservice.models;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class GroupTest {
    private Group group;
    private static final String GROUP_ID = "1a2b";
    private static final String TITLE = "Group 1";
    private static final Long DESTINATION_ID = 123L;
    private static final String DESCRIPTION = "Group description";

    @BeforeEach
    void setUp() {
        group = new Group(GROUP_ID, TITLE, DESTINATION_ID, DESCRIPTION);
    }

    @Test
    public void getIdTest() {
        Assert.assertEquals(GROUP_ID, group.getId());
    }

    @Test
    public void setIdTest() {
        // Arrange
        String newId = "3c4d";

        // Act
        group.setId(newId);

        // Assert
        Assert.assertEquals(newId, group.getId());
    }

    @Test
    public void getDestinationIdTest() {
        Assert.assertEquals(DESTINATION_ID, group.getDestinationId());
    }

    @Test
    public void setDestinationIdTest() {
        // Arrange
        Long newDestinationId = 456L;

        // Act
        group.setDestinationId(newDestinationId);

        // Assert
        Assert.assertEquals(newDestinationId, group.getDestinationId());
    }

    @Test
    public void getDescriptionTest() {
        Assert.assertEquals(DESCRIPTION, group.getDescription());
    }

    @Test
    public void setDescriptionTest() {
        // Arrange
        String newDescription = "New description";

        // Act
        group.setDescription(newDescription);

        // Assert
        Assert.assertEquals(newDescription, group.getDescription());
    }

    @Test
    public void getTitleTest() {
        Assert.assertEquals(TITLE, group.getTitle());
    }

    @Test
    public void setTitleTest() {
        // Arrange
        String newTitle = "New Title";

        // Act
        group.setTitle(newTitle);

        // Assert
        Assert.assertEquals(newTitle, group.getTitle());
    }

    @Test
    public void getUserIdsTest() {
        Assert.assertNotNull(group.getUserIds());
        Assert.assertTrue(group.getUserIds().isEmpty());
    }

    @Test
    public void setUserIdsTest() {
        // Arrange
        List<String> newIds = new ArrayList<>();
        newIds.add("user1");
        newIds.add("user2");

        // Act
        group.setUserIds(newIds);

        // Assert
        Assert.assertEquals(newIds, group.getUserIds());
    }
}
