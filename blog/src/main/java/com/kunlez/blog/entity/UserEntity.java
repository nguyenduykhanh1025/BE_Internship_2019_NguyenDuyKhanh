package com.kunlez.blog.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.kunlez.blog.DTO.User;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "user")
@Data
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    @NonNull
    private String username;

    @JsonAlias("first_name")
    @Column(nullable = false)
    @NonNull
    private String firstName;

    @JsonAlias("last_name")
    @Column(nullable = false)
    @NonNull
    private String lastName;

    @Column(nullable = false)
    @NonNull
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roleEntities;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private Set<PostEntity> postEntities;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private Set<CommentEntity> commentEntities;

    public UserEntity(String username, String firstName, String lastName, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public void setRoleEntities(Set<RoleEntity> roleEntities) {
        this.roleEntities = roleEntities;
    }

    public Set<RoleEntity> getRoleEntities() {
        return roleEntities;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPostEntities(Set<PostEntity> postEntities) {
        this.postEntities = postEntities;
    }

    public void setCommentEntities(Set<CommentEntity> commentEntities) {
        this.commentEntities = commentEntities;
    }

    public Set<PostEntity> getPostEntities() {
        return postEntities;
    }

    public Set<CommentEntity> getCommentEntities() {
        return commentEntities;
    }

    public UserEntity() {
    }


    public User getUser() {
        return new User(this.id, this.username, this.firstName, this.lastName);
    }
}
