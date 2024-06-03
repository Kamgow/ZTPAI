package com.kamilg.watchit.controller;

import com.kamilg.watchit.dto.PasswordChangeRequest;
import com.kamilg.watchit.dto.UserInfoDto;
import com.kamilg.watchit.dto.UserUpdateRequest;
import com.kamilg.watchit.entity.Media;
import com.kamilg.watchit.entity.User;
import com.kamilg.watchit.exception.ResourceNotFoundException;
import com.kamilg.watchit.repository.MediaRepository;
import com.kamilg.watchit.repository.UserRepository;
import com.kamilg.watchit.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;

    @GetMapping
    public ResponseEntity<UserInfoDto> getUserInfo(@AuthenticationPrincipal UserDetails userDetails){
        String userName = userDetails.getUsername();
        User user = userRepository.findByUsername(userName).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserInfoDto userInfoDto = new UserInfoDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getBirthDate(),
                user.getRole()
        );

        return ResponseEntity.ok(userInfoDto);
    }

    @PostMapping("/{userId}/myList/{mediaId}")
    public ResponseEntity<?> addToMyList(@PathVariable Long userId, @PathVariable Long mediaId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Media> optionalMedia = mediaRepository.findById(mediaId);

        if (optionalUser.isPresent() && optionalMedia.isPresent()) {
            User user = optionalUser.get();
            Media media = optionalMedia.get();

            user.addMedia(media);
            userRepository.save(user);

            return ResponseEntity.ok("Medium added to favorites successfully.");
        } else {
            return ResponseEntity.badRequest().body("User or media not found.");
        }
    }

    @DeleteMapping("/{userId}/myList/{mediaId}")
    public ResponseEntity<?> removeFromMylist(@PathVariable Long userId, @PathVariable Long mediaId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Media> optionalMedia = mediaRepository.findById(mediaId);

        if (optionalUser.isPresent() && optionalMedia.isPresent()) {
            User user = optionalUser.get();
            Media media = optionalMedia.get();

            if (user.getMedia().contains(media)) {
                user.getMedia().remove(media);
                media.getUsers().remove(user);
                userRepository.save(user);
                mediaRepository.save(media);

                return ResponseEntity.ok("Medium removed from favorites successfully.");
            } else {
                return ResponseEntity.badRequest().body("Medium not found in user's favorites.");
            }
        } else {
            return ResponseEntity.badRequest().body("User or media not found.");
        }
    }


    @GetMapping("/{userId}/myList/{mediaId}")
    public ResponseEntity<?> isOnMyList(@PathVariable Long userId, @PathVariable Long mediaId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Media> optionalMedia = mediaRepository.findById(mediaId);

        if (optionalUser.isPresent() && optionalMedia.isPresent()) {
            User user = optionalUser.get();
            Media media = optionalMedia.get();

            boolean isInMyList = user.isInMyList(media);
            return ResponseEntity.ok(isInMyList);
        } else {
            return ResponseEntity.badRequest().body("User or media not found.");
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        try {
            userService.changePassword(user, request);
        } catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/updateUserInfo")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserUpdateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        try {
            userService.updateUserInfo(user, request);
        } catch(IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }
}
