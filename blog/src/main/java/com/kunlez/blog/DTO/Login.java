package com.kunlez.blog.DTO;

import lombok.Data;

@Data
public class Login {

    private String username;

    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Login() {
    }

    public Login(String username, String password) {
        this.username = username;
        this.password = password;
    }
}