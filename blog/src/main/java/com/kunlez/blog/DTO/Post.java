package com.kunlez.blog.DTO;


import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;

public class Post {
    private int id = -1;

    @NotEmpty(message = "title of post is not empty")
    private String title;

    @NotEmpty(message = "content of post is not empty")
    private String content;

    @NotEmpty(message = "imgLink of post is not empty")
    private String imgLink;

    private String datePublication;

    private ArrayList<Comment> comments;

    @NotEmpty(message = "tags of post is not empty")
    private String[] tags;

    private String nameUser;

    public Post() {
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

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

    public String getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(String datePublication) {
        this.datePublication = datePublication;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }
}
