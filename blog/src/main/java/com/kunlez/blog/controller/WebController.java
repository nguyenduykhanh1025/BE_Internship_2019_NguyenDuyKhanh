package com.kunlez.blog.controller;

import com.kunlez.blog.DTO.GooglePojo;
import com.kunlez.blog.configurations.GoogleUtils;
import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequestMapping("/page")
public class WebController {
    // index
    @RequestMapping("/")
    public String index() {

        return "index";
    }

    //login
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    // Đón nhận request GET
    @RequestMapping("/detail/{id}")
    public String detail(@PathVariable int id) {
        return "detail";
    }

    @Secured("ROLE_MEMBER")
    @RequestMapping("/user")
    public String user() {
        return "user";
    }

    @RequestMapping("/tag/{nameTag}")
    public String tag(){
        return "tag";
    }
}