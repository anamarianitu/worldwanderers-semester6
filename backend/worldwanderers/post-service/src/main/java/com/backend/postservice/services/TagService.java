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

    public List<Tag> getAllTags()
    {
        return tagRepository.findAll();
    }

    public Tag addTag(Tag tag)
    {
        return tagRepository.save(tag);
    }

    public Tag updateTag(Long id, Tag newTagData) {
        Optional<Tag> optionalTag = tagRepository.findById(id);

        if (optionalTag.isPresent()) {
            Tag existingTag = optionalTag.get();

            existingTag.setName(newTagData.getName());

            return tagRepository.save(existingTag);
        } else {
            return null;
        }
    }

    public void deleteTag(Long id) {
        tagRepository.deleteById(id);
    }
}
