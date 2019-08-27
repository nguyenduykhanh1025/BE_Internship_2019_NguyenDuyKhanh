package com.kunlez.blog.controller;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Register;
import com.kunlez.blog.entity.UserEntity;
import com.kunlez.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
public class userController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private Converter<Register, UserEntity> registerDtoToUserDaoConverter;

    @PostMapping("/register")
    public Register registerUser(@RequestBody @Validated Register register) {

        if (userRepository.findByUsername(register.getUsername()) == null) {

            userRepository.save(registerDtoToUserDaoConverter.convert(register));

            return register;
        }
        return register;
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }
}
