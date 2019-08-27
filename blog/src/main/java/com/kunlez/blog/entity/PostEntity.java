package com.kunlez.blog.entity;

import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "post")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id = 0;

    @Column(nullable = false)
    @NonNull
    private String title;

    @Column(nullable = false)
    @NonNull
    private String content;

    @Column(nullable = false, name = "img_link")
    @NonNull
    private String imgLink;

    @Column(nullable = false, name = "date_publication")
    @NonNull
    private Date datePublication;


    @ManyToOne
    @JoinColumn
    private UserEntity userEntity;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tag_post",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<TagEntity> tagEntities;

    @OneToMany(mappedBy = "postEntity", cascade = CascadeType.ALL)
    private Set<CommentEntity> commentEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }

    public Date getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(Date datePublication) {
        this.datePublication = datePublication;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }


    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public Set<TagEntity> getTagEntities() {
        return tagEntities;
    }

    public void setTagEntities(Set<TagEntity> tagEntities) {
        this.tagEntities = tagEntities;
    }

    public Set<CommentEntity> getCommentEntities() {
        return commentEntities;
    }

    public void setCommentEntities(Set<CommentEntity> commentEntities) {
        this.commentEntities = commentEntities;
    }

    public PostEntity() {
    }
}
