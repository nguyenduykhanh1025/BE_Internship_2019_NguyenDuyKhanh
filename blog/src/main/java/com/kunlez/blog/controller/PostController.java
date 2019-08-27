package com.kunlez.blog.controller;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Post;
import com.kunlez.blog.common.CommonMethot;
import com.kunlez.blog.common.Constants;
import com.kunlez.blog.entity.PostEntity;
import com.kunlez.blog.entity.UserEntity;
import com.kunlez.blog.repository.PostRepository;
import com.kunlez.blog.repository.TagRepository;
import com.kunlez.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    private Converter<PostEntity, Post> postDaoToPostDtoConverter;

    @Autowired
    private Converter<Post, PostEntity> postDtoToPostDaoConverter;

    @GetMapping
    public ArrayList<Post> get() {
        // sort max to min follow date
        ArrayList<PostEntity> postEntities = (ArrayList<PostEntity>) postRepository.findAll(Sort.by("datePublication"));
        Collections.reverse(postEntities);

        ArrayList<Post> posts = new ArrayList<>();
        for (PostEntity postEntity : postEntities) {
            posts.add(postDaoToPostDtoConverter.convert(postEntity));
        }
        return posts;
    }

    @GetMapping("/page/{indexPage}")
    public List<Post> getLimitPosts(@PathVariable int indexPage) {
        if(indexPage >= 0){
            // sort max to min follow date
            ArrayList<PostEntity> postEntities = (ArrayList<PostEntity>) postRepository.findAll(Sort.by("datePublication"));
            Collections.reverse(postEntities);

            ArrayList<Post> posts = new ArrayList<>();
            //
            int start = (indexPage - 1 ) * Constants.SIZE_ITEM_PAGE;
            int stop = indexPage * Constants.SIZE_ITEM_PAGE > postEntities.size() ? postEntities.size() : indexPage * Constants.SIZE_ITEM_PAGE;
            List<PostEntity> listPostLimit = postEntities.subList(start,stop);
            for (PostEntity postEntity : listPostLimit) {
                posts.add(postDaoToPostDtoConverter.convert(postEntity));
            }
            return posts;
        }
       return null;
    }

    @GetMapping("/{id}")
    public Post getPostFollowId(@PathVariable int id) {
        return postDaoToPostDtoConverter.convert(postRepository.findById(id));
    }

    @Secured("ROLE_MEMBER")
    @PostMapping("/upload")
    public Post upPost(@RequestBody @Validated Post post) {
        // in post upload from front-end include tags, title, content, imgLink
        // set another element have yet
        PostEntity postEntity = postDtoToPostDaoConverter.convert(post);
        postRepository.save(postEntity);

        return post;
    }

    @GetMapping("/user")
    public ArrayList<Post> getPostFollowUser() {
        String username = CommonMethot.getUserName();
        UserEntity userEntity = userRepository.findByUsername(username);
        ArrayList<Post> posts = new ArrayList<>();

        for (PostEntity postEntity : userEntity.getPostEntities()) {
            posts.add(postDaoToPostDtoConverter.convert(postEntity));
        }

        return posts;
    }

    @Secured("ROLE_MEMBER")
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable int id) {
        postRepository.delete(postRepository.findById(id));
    }

    @Secured("ROLE_MEMBER")
    @PutMapping
    public Post upDate(@RequestBody @Validated Post post) {
        // in post upload from front-end include tags, title, content, imgLink
        // set another element have yet
        postRepository.save(postDtoToPostDaoConverter.convert(post));

        return post;
    }


}
