package com.kunlez.blog.exceptionhandler;

public class UserIsExitsException extends RuntimeException {
    public UserIsExitsException(String name) {
        super("User is Exts : " + name);
    }

}
