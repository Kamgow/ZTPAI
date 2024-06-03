package com.kamilg.watchit.mapper;

import com.kamilg.watchit.dto.UserDto;
import com.kamilg.watchit.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getPassword(),
                user.getBirthDate(),
                user.getRole(),
                user.getMedia()
        );
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getFirst_name(),
                userDto.getLast_name(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getBirthdate(),
                userDto.getRole(),
                userDto.getMedia()
        );
    }
}
