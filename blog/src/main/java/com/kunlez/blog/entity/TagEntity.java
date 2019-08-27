package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "tag")
@Data
public class TagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id = 0;

    @Column(nullable = false)
    @NonNull
    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tag_post",
            joinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<PostEntity> postEntities;

    public TagEntity() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PostEntity> getPostEntities() {
        return postEntities;
    }

    public void setPostEntities(Set<PostEntity> postEntities) {
        this.postEntities = postEntities;
    }
}
