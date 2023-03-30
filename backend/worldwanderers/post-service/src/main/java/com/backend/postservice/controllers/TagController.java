package com.backend.postservice.controllers;

import com.backend.postservice.models.Tag;
import com.backend.postservice.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/")
    public ResponseEntity<List<Tag>> getAllTags(){
        return new ResponseEntity<>(tagService.getAllTags(), OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tag>> getTagById(@PathVariable(value = "id") Long id){
        Optional<Tag> tag = tagService.getTagById(id);

        if (tag.isPresent()) {
            return new ResponseEntity<>(tag, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Tag> addTag(@RequestBody Tag tag){
        Tag created = tagService.addTag(tag);
        return new ResponseEntity<>(created, CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable(value = "id") Long id, @RequestBody Tag tag){
        Optional<Tag> existingTag = tagService.getTagById(id);

        if (existingTag.isPresent()) {
            Tag updatedTag = tagService.updateTag(id, tag);
            return new ResponseEntity<>(updatedTag, OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable(value = "id") Long id){
        Optional<Tag> tag = tagService.getTagById(id);

        if (tag.isPresent()) {
            tagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
