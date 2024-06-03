package com.kamilg.watchit.service.impl;

import com.kamilg.watchit.dto.PasswordChangeRequest;
import com.kamilg.watchit.dto.UserDto;
import com.kamilg.watchit.dto.UserUpdateRequest;
import com.kamilg.watchit.entity.User;
import com.kamilg.watchit.exception.ResourceNotFoundException;
import com.kamilg.watchit.mapper.UserMapper;
import com.kamilg.watchit.repository.UserRepository;
import com.kamilg.watchit.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);

        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> UserMapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUserDto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFirstName(updatedUserDto.getFirst_name());
        user.setLastName(updatedUserDto.getLast_name());
        user.setUsername(updatedUserDto.getUsername());
        user.setBirthDate(updatedUserDto.getBirthdate());

        User updatedUser = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.deleteById(userId);
    }

    @Override
    public void changePassword(User user, PasswordChangeRequest request) {
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Wrong old password provided");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateUserInfo(User user, UserUpdateRequest request) {
        if (request.getFirstName() != null){
            user.setFirstName(request.getFirstName());
        }
        user.setLastName(request.getLastName());
        user.setBirthDate(request.getBirthDate());

        userRepository.save(user);
    }
}
