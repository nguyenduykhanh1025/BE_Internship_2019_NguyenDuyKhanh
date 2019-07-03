package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "comment")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
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
}
