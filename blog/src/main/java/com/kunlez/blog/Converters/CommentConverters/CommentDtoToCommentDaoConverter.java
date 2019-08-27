package com.kunlez.blog.Converters.CommentConverters;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Comment;
import com.kunlez.blog.common.CommonMethot;
import com.kunlez.blog.entity.CommentEntity;
import com.kunlez.blog.repository.PostRepository;
import com.kunlez.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class CommentDtoToCommentDaoConverter extends Converter<Comment, CommentEntity> {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public CommentEntity convert(Comment source) {

        CommentEntity commentEntity = new CommentEntity();

        commentEntity.setContent(source.getContent());
        commentEntity.setPostEntity(postRepository.findById(source.getIdPost()));

        commentEntity.setUserEntity(userRepository.findByUsername(CommonMethot.getUserName()));

        if (source.getContentOld() == null) {
            commentEntity.setContentOld("");
        }

        if (source.getDateComment() == null) {
            commentEntity.setDateComment(new Date());
        }

        return commentEntity;
    }
}
