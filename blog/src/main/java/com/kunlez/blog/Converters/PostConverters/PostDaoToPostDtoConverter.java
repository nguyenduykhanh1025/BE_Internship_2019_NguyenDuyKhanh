package com.kunlez.blog.Converters.PostConverters;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Comment;
import com.kunlez.blog.DTO.Post;
import com.kunlez.blog.DTO.User;
import com.kunlez.blog.entity.CommentEntity;
import com.kunlez.blog.entity.PostEntity;
import com.kunlez.blog.entity.TagEntity;
import com.kunlez.blog.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class PostDaoToPostDtoConverter extends Converter<PostEntity, Post> {

    @Autowired
    PostRepository postRepository;

    @Override
    public Post convert(PostEntity source) {

        Post post = new Post();
        post.setId(source.getId());
        post.setContent(source.getContent());
        post.setDatePublication(source.getDatePublication().toString());
        post.setImgLink(source.getImgLink());
        post.setTitle(source.getTitle());
        post.setNameUser(source.getUserEntity().getUsername());
        ArrayList<Comment> comments = new ArrayList<>();
        for (CommentEntity commentEntity : source.getCommentEntities()) {
            Comment comment = new Comment();
            comment.setId(commentEntity.getId());
            comment.setContent(commentEntity.getContent());
            comment.setContentOld(commentEntity.getContentOld());
            comment.setDateComment(commentEntity.getDateComment().toString());

            User user = new User();
            user.setId(commentEntity.getUserEntity().getId());
            user.setFirstName(commentEntity.getUserEntity().getFirstName());
            user.setLastName(commentEntity.getUserEntity().getLastName());
            user.setUsername(commentEntity.getUserEntity().getUsername());
            comment.setUser(user);

            comments.add(comment);
        }
        post.setComments(comments);


        // tags
        String[] tags = new String[source.getTagEntities().size()];
        int indexTag = 0;
        for (TagEntity tagEntity : source.getTagEntities()) {

            tags[indexTag++] = tagEntity.getName();
        }

        post.setTags(tags);


        return post;
    }
}
