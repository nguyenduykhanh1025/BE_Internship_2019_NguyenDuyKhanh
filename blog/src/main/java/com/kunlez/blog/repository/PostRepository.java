package com.kunlez.blog.repository;

import com.kunlez.blog.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Integer> {
    PostEntity findById(int id);
}
