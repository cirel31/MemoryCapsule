package com.santa.projectservice.mapper;

import com.santa.projectservice.dto.ProjectDto;
import com.santa.projectservice.jpa.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    @Mapping(source = "id", target = "idx")
    @Mapping(source = "giftUrl", target = "gifturl")
    ProjectDto toDto(Project project);

    @Mapping(source = "idx", target = "id")
    Project toEntity(ProjectDto projectDto);
}
