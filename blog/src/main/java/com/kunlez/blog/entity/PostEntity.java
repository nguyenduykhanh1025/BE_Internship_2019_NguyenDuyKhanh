package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity(name = "post")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
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
}
