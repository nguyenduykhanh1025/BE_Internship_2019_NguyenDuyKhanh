package com.kunlez.bookstore.models;

public class AuthToken {
    private String token;

    public AuthToken(String token) {
        this.token = token;
    }

    public AuthToken() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
