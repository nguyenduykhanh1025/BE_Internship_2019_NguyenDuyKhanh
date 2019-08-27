package com.kunlez.blog.Converters.UserConverter;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Register;
import com.kunlez.blog.entity.RoleEntity;
import com.kunlez.blog.entity.UserEntity;
import com.kunlez.blog.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class RegisterDtoToUserDaoConverter extends Converter<Register, UserEntity> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public UserEntity convert(Register source) {
        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(source.getUsername());
        userEntity.setPassword(new BCryptPasswordEncoder().encode(source.getPassword()));
        userEntity.setFirstName(source.getFirstName());
        userEntity.setLastName(source.getLastName());

        userEntity.setRoleEntities(
                new HashSet<RoleEntity>() {{
                    add(roleRepository.findByName("ROLE_MEMBER"));
                }}
        );

        return userEntity;
    }
}
