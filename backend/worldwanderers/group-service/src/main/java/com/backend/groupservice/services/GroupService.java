package com.backend.groupservice.services;

import com.backend.groupservice.models.Group;
import com.backend.groupservice.repositories.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Service
public class GroupService {

    @Autowired
    public GroupRepository groupRepository;

    public Optional<Group> getGroupById(String id){
        return groupRepository.findById(id);
    }

    public List<Group> getAllGroups()
    {
        return groupRepository.findAll();
    }

    public Group addGroup(Group group)
    {
        return groupRepository.save(group);
    }

    public Group updateGroup(String id, Long destinationId, String title, String description) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group with id " + id + " not found"));

        group.setDestinationId(destinationId);
        group.setTitle(title);
        group.setDescription(description);

        return groupRepository.save(group);
    }

    public Group updateGroupUserList(String id, Group newGroup) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group with id " + id + " not found"));

        group.setUserIds(newGroup.getUserIds());

        return groupRepository.save(group);
    }


    public List<Group> getGroupsJoinedByUser(String userId)
    {
        List<Group> groupsJoinedByUser = new ArrayList<>();

        getAllGroups().forEach(group -> {
            List<String> userIdOfGroup = group.getUserIds();
            if (userIdOfGroup != null){
                userIdOfGroup.forEach(userIdFromGroup -> {
                    if (Objects.equals(userIdFromGroup, userId)) {
                        groupsJoinedByUser.add(group);
                    }
                });
            }
        });

        return groupsJoinedByUser;
    }

    public void deleteUsersFromJoinedGroups(String userId) {

        List<Group> groups = getAllGroups();

        for (Group group : groups) {
            List<String> userIds = group.getUserIds();

            if (userIds != null) {
                Iterator<String> iterator = userIds.iterator();

                while (iterator.hasNext()) {
                    String userIdFromGroup = iterator.next();

                    if (Objects.equals(userIdFromGroup, userId)) {
                        iterator.remove();
                    }
                }

                groupRepository.save(group);
            }
        }
    }

}
