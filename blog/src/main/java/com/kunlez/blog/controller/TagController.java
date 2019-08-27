package com.kunlez.blog.controller;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Post;
import com.kunlez.blog.DTO.Tag;
import com.kunlez.blog.entity.PostEntity;
import com.kunlez.blog.entity.TagEntity;
import com.kunlez.blog.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/tag")
public class TagController {
    @Autowired
    TagRepository tagRepository;

    @Autowired
    private Converter<PostEntity, Post> postDaoToPostDtoConverter;

    @Autowired
    private Converter<TagEntity, Tag> tagDaoToTagDtoConverter;

    @GetMapping
    public ArrayList<Tag> getAllTags() {

        ArrayList<Tag> tagResult = new ArrayList<>();
        ArrayList<TagEntity> tagEntities = (ArrayList<TagEntity>) tagRepository.findAll(Sort.by("name"));

        for (TagEntity tagEntity : tagEntities) {
            tagResult.add(tagDaoToTagDtoConverter.convert(tagEntity));
        }
        return tagResult;
    }

    @GetMapping("/{tagname}")
    public ArrayList<Post> getPostFromTag(@PathVariable String tagname) {
        System.out.println(tagname);
        TagEntity tagEntity = tagRepository.findByName(tagname);
        ArrayList<Post> posts = new ArrayList<>();

        for (PostEntity postEntity : tagEntity.getPostEntities()) {
            Post post = postDaoToPostDtoConverter.convert(postEntity);

            String[] tags = new String[postEntity.getTagEntities().size()];
            int indexTag = 0;
            for (TagEntity t : postEntity.getTagEntities()) {
                tags[indexTag++] = t.getName();
            }
            post.setTags(tags);

            posts.add(post);
        }
        return posts;
    }

}
