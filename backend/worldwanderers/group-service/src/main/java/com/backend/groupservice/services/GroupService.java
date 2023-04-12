package com.backend.groupservice.services;

import com.backend.groupservice.models.Group;
import com.backend.groupservice.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
