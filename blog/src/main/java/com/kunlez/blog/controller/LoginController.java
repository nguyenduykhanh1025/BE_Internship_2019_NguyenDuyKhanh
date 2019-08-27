package com.kunlez.blog.controller;

import com.kunlez.blog.DTO.GooglePojo;
import com.kunlez.blog.DTO.Login;
import com.kunlez.blog.common.CommonMethot;
import com.kunlez.blog.configurations.GoogleUtils;
import com.kunlez.blog.configurations.TokenProvider;
import com.kunlez.blog.models.AuthToken;
import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
public class LoginController {
    @Autowired
    private GoogleUtils googleUtils;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @GetMapping("/login-google")
    public String loginGoogle(HttpServletRequest request) throws ClientProtocolException, IOException {

        String code = request.getParameter("code");


        if (code == null || code.isEmpty()) {

        }

        String accessToken = googleUtils.getToken(code);
        GooglePojo googlePojo = googleUtils.getUserInfo(accessToken);
        UserDetails userDetail = googleUtils.buildUser(googlePojo);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail, null,
                userDetail.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("name: " + CommonMethot.getUserName());
        return "index";
    }
}
