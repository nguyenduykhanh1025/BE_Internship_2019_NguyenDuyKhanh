package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "comment")
@Data
@RequiredArgsConstructor
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id = 0;

    @Column(nullable = false)
    @NonNull
    private String content;

    @Column(nullable = false, name = "content_old")
    @NonNull
    private String contentOld;

    @Column(nullable = false, name = "date_comment")
    @NonNull
    private Date dateComment;

    @ManyToOne
    @JoinColumn
    private PostEntity postEntity;

    @ManyToOne
    @JoinColumn
    private UserEntity userEntity;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContentOld() {
        return contentOld;
    }

    public void setContentOld(String contentOld) {
        this.contentOld = contentOld;
    }

    public Date getDateComment() {
        return dateComment;
    }

    public void setDateComment(Date dateComment) {
        this.dateComment = dateComment;
    }

    public PostEntity getPostEntity() {
        return postEntity;
    }

    public void setPostEntity(PostEntity postEntity) {
        this.postEntity = postEntity;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public CommentEntity() {
    }
}
