package com.kunlez.blog.Converters.CommentConverters;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Comment;
import com.kunlez.blog.DTO.User;
import com.kunlez.blog.common.CommonMethot;
import com.kunlez.blog.entity.CommentEntity;
import org.springframework.stereotype.Component;

@Component
public class CommentDaoToCommentDtoConverter extends Converter<CommentEntity, Comment> {

    @Override
    public Comment convert(CommentEntity source) {

        Comment comment = new Comment();

        User user = new User();
        user.setUsername(CommonMethot.getUserName());
        comment.setUser(user);

        comment.setDateComment(source.getDateComment().toString());
        comment.setContentOld(source.getContentOld());
        comment.setContent(source.getContent());
        comment.setId(source.getId());
        comment.setIdPost(source.getUserEntity().getId());

        return comment;
    }
}
