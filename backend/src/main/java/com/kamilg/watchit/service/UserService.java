package com.kamilg.watchit.service;

import com.kamilg.watchit.dto.PasswordChangeRequest;
import com.kamilg.watchit.dto.UserDto;
import com.kamilg.watchit.dto.UserUpdateRequest;
import com.kamilg.watchit.entity.User;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(Long userId);

    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUserDto);

    void deleteUser(Long userId);

    void changePassword(User user, PasswordChangeRequest request);

    void updateUserInfo(User user, UserUpdateRequest request);
}
