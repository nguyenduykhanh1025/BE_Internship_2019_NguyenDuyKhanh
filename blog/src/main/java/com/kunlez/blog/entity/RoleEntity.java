package com.kunlez.blog.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity(name = "role")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
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
}
