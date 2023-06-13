package com.backend.userservice.controllers;

import com.backend.userservice.models.User;
import com.backend.userservice.services.UserProducerService;
import com.backend.userservice.services.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.*;
import org.slf4j.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProducerService userProducerService;

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false, defaultValue = "asc") String sort){
        List<User> users = userService.getAllUsers();

        if (sort.equals("asc")) {
            users.sort(Comparator.comparing(User::getUsername));
        } else if (sort.equals("desc")) {
            users.sort(Comparator.comparing(User::getUsername).reversed());
        }

        return new ResponseEntity<>(users, OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable(value = "id") String id){
        Optional<User> user = userService.getUserById(id);

        if (user.isPresent()) {
            return new ResponseEntity<>(user, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        User created = userService.addUser(user);
        return new ResponseEntity<>(created, CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") String id){
        Optional<User> user = userService.getUserById(id);

        if (user.isPresent()) {
            userProducerService.sendMessage(id);
            logger.info("user id sent: " + id);
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<User> updateUserById(@PathVariable String id, @RequestParam String firstName, @RequestParam String lastName, @RequestParam String email, @RequestParam String username) {
        return ResponseEntity.ok(userService.updateUserById(id, firstName, lastName, email, username));
    }
}
