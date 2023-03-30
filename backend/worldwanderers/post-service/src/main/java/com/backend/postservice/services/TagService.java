package com.backend.postservice.services;

import com.backend.postservice.models.Tag;
import com.backend.postservice.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagService {
    @Autowired
    public TagRepository tagRepository;

    public Optional<Tag> getTagById(Long id){
        return tagRepository.findById(id);
    }

    public List<Tag> getAllTag()
    {
        return tagRepository.findAll();
    }

    public Tag addTag(Tag tag)
    {
        return tagRepository.save(tag);
    }
}
