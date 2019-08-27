package com.kunlez.blog.controller;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Comment;
import com.kunlez.blog.entity.CommentEntity;
import com.kunlez.blog.entity.PostEntity;
import com.kunlez.blog.repository.CommentRepository;
import com.kunlez.blog.repository.PostRepository;
import com.kunlez.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    private Converter<CommentEntity, Comment> commentDaoToCommentDtoConverter;

    @Autowired
    private Converter<Comment, CommentEntity> commentDtoToCommentDaoConverter;


    @GetMapping("/{id_post}")
    public ArrayList<Comment> getCommentFromIdPost(@PathVariable(name = "id_post") int idPost) {
        ArrayList<Comment> comments = new ArrayList<>();

        PostEntity postEntity = postRepository.findById(idPost);

        for (CommentEntity commentEntity : postEntity.getCommentEntities()) ;

        return comments;
    }

    @Secured("ROLE_MEMBER")
    @PostMapping
    public Comment postComment(@RequestBody Comment comment) {
        // front-end send only content + idPost

        CommentEntity commentEntity = commentDtoToCommentDaoConverter.convert(comment);
        commentRepository.save(commentEntity);

        return commentDaoToCommentDtoConverter.convert(commentEntity);
    }

    @Secured("ROLE_MEMBER")
    @DeleteMapping("/{id}")
    public void deleteCommentFollowID(@PathVariable int id){
        commentRepository.delete(commentRepository.findById(id).get());
    }

    @Secured("ROLE_MEMBER")
    @PutMapping("/{id}")
    public Comment updateCommentFollowID(@RequestBody Comment comment){

        CommentEntity commentEntity = commentDtoToCommentDaoConverter.convert(comment);
        commentEntity.setId(comment.getId());
        commentRepository.save(commentEntity);
        return commentDaoToCommentDtoConverter.convert(commentEntity);
    }
}
