package com.kunlez.bookstore.converters.userConverter;

import com.kunlez.bookstore.DTO.RegisterDTO;
import com.kunlez.bookstore.converters.base.Converter;
import com.kunlez.bookstore.entity.RoleEntity;
import com.kunlez.bookstore.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserEntityToRegisterDTOConverter  extends Converter<UserEntity, RegisterDTO> {
    @Override
    public RegisterDTO convert(UserEntity source) {
            RegisterDTO registerDTO = new RegisterDTO();
            registerDTO.setEmail(source.getEmail());
            registerDTO.setFirstName(source.getFirstName());
            registerDTO.setLastName(source.getLastName());
            registerDTO.setLinkAvatar(source.getLinkAvatar());
            registerDTO.setEnable(source.isEnable());
            registerDTO.setId(source.getId());

            List<String> listNameRole = new ArrayList<>();
            for(RoleEntity roleEntity : source.getRoles()){
                listNameRole.add(roleEntity.getName());
            }
            registerDTO.setListNameRole(listNameRole);

        return registerDTO;
    }
}
