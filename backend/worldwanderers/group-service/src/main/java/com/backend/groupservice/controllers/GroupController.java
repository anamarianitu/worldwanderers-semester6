package com.backend.groupservice.controllers;

import com.backend.groupservice.models.Group;
import com.backend.groupservice.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/")
    public ResponseEntity<List<Group>> getAllGroups(){
        return new ResponseEntity<>(groupService.getAllGroups(), OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Group>> getGroupById(@PathVariable(value = "id") String id){
        Optional<Group> group = groupService.getGroupById(id);

        if (group.isPresent()) {
            return new ResponseEntity<>(group, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Group> addGroup(@RequestBody Group group){
        Group created = groupService.addGroup(group);
        return new ResponseEntity<>(created, CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<Group> updateUserById(@RequestParam String id, @RequestParam Long destinationId, @RequestParam String title, @RequestParam String description) {
        return ResponseEntity.ok(groupService.updateGroup(id, destinationId, title, description));
    }

    @GetMapping("/of-user")
    public ResponseEntity<List<Group>> getGroupsJoinedByUser(@RequestParam("userId") String userId){
        return new ResponseEntity<>(groupService.getGroupsJoinedByUser(userId), OK);
    }

    @PostMapping("/add-user-to-group")
    public ResponseEntity<Group> addUserToGroup(
            @RequestParam("groupId") String groupId,
            @RequestParam("userId") String userId
    ) {
        Optional<Group> optionalGroup = groupService.getGroupById(groupId);

        if (optionalGroup.isPresent()) {
            Group group = optionalGroup.get();
            List<String> userIds = group.getUserIds();
            if (userIds != null){
                if (!userIds.contains(userId)) {
                    userIds.add(userId);
                    groupService.updateGroupUserList(groupId, group);
                    return ResponseEntity.ok(group);
                } else {
                    return ResponseEntity.badRequest().build(); // User already exists in the group
                }
            }
        } else {
            return ResponseEntity.notFound().build(); // Group not found
        }
        return null;
    }

}
