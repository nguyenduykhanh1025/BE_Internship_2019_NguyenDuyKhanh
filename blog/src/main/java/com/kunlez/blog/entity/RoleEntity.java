package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;

@Entity(name = "role")
@Data
public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id = 0;


    @Column(nullable = false)
    @NonNull
    private String name;


    @Column
    @NonNull
    private String description;

    public RoleEntity(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public RoleEntity() {
    }
}
