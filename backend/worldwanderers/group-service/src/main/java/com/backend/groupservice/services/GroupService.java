package com.backend.groupservice.services;

import com.backend.groupservice.models.Group;
import com.backend.groupservice.repositories.GroupRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

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
        Optional<Group> groupOptional = groupRepository.findById(id);
        if (!groupOptional.isPresent()) {
            throw new EntityNotFoundException("Group with id " + id + " not found");
        }

        Group group = groupOptional.get();
        group.setDestinationId(destinationId);
        group.setTitle(title);
        group.setDescription(description);
        return groupRepository.save(group);
    }
}
