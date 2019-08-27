package com.kunlez.blog.Converters.TagConverter;

import com.kunlez.blog.Converters.base.Converter;
import com.kunlez.blog.DTO.Tag;
import com.kunlez.blog.entity.TagEntity;
import org.springframework.stereotype.Component;

@Component
public class TagDaoToTagDtoConverter extends Converter<TagEntity, Tag> {

    @Override
    public Tag convert(TagEntity source) {
        return new Tag(source.getId(), source.getName());
    }
}
