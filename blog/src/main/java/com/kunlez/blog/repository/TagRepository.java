package com.kunlez.blog.repository;

import com.kunlez.blog.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<TagEntity, Integer> {
    TagEntity findByName(String name);
}
