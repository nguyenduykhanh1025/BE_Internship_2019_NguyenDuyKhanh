package com.kunlez.blog.Converters;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Post;
import com.kunlez.blog.common.CommonMethot;
import com.kunlez.blog.entity.PostEntity;
import com.kunlez.blog.entity.TagEntity;
import com.kunlez.blog.repository.TagRepository;
import com.kunlez.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class PostDtoToPostDaoConverter extends Converter<Post, PostEntity> {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @Override
    public PostEntity convert(Post source) {

        PostEntity postEntity = new PostEntity();

        postEntity.setTitle(source.getTitle());
        postEntity.setImgLink(source.getImgLink());
        postEntity.setContent(source.getContent());
        postEntity.setUserEntity(userRepository.findByUsername(CommonMethot.getUserName()));

        System.out.println(source.getDatePublication());
        if(source.getDatePublication() == null){
            postEntity.setDatePublication(new Date());
        }




        // if tag is not exist => save in database in tag table
        Set<TagEntity> tagEntities = new HashSet<>();
        String[] tags = source.getTags();
        for(String tag:tags){
            TagEntity tagEntity = new TagEntity();
            if(tagRepository.findByName(tag.toLowerCase()) == null){
                tagEntity.setName(tag.toLowerCase());
                tagRepository.save(tagEntity);
            }
            tagEntities.add(tagRepository.findByName(tag.toLowerCase()));
        }

        // save tags
        postEntity.setTagEntities(tagEntities);


        if(source.getComments() != null){
            postEntity.setCommentEntities((Set)source.getComments());
        }

        return postEntity;
    }
}
