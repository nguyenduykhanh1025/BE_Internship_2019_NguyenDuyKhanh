package com.kunlez.blog.repository;


import com.kunlez.blog.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  CommentRepository extends JpaRepository<CommentEntity, Integer> {
}
