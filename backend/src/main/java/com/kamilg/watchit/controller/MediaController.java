package com.kamilg.watchit.controller;

import com.kamilg.watchit.dto.MediaDto;
import com.kamilg.watchit.repository.UserRepository;
import com.kamilg.watchit.service.MediaService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kamilg.watchit.entity.User;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<MediaDto>> getAllMedia(){
        List<MediaDto> mediaDtoList = mediaService.getAllMedia();

        List<MediaDto> selectedFieldsMediaDtoList = mediaDtoList.stream()
                .map(mediaDto -> {
                    MediaDto selectedFieldsMediaDto = new MediaDto();
                    selectedFieldsMediaDto.setMediaId(mediaDto.getMediaId());
                    selectedFieldsMediaDto.setTitle(mediaDto.getTitle());
                    selectedFieldsMediaDto.setGenre(mediaDto.getGenre());
                    selectedFieldsMediaDto.setReleaseYear(mediaDto.getReleaseYear());
                    selectedFieldsMediaDto.setDirector(mediaDto.getDirector());
                    selectedFieldsMediaDto.setImageUrl(mediaDto.getImageUrl());
                    selectedFieldsMediaDto.setDescription(mediaDto.getDescription());
                    selectedFieldsMediaDto.setType(mediaDto.getType());
                    return selectedFieldsMediaDto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(selectedFieldsMediaDtoList);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MediaDto>> getAllUserMedia(@PathVariable("userId") Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));


        List<MediaDto> selectedFieldsMediaDtoList = user.getMedia().stream()
                .map(mediaDto -> {
                    MediaDto selectedFieldsMediaDto = new MediaDto();
                    selectedFieldsMediaDto.setMediaId(mediaDto.getMediaId());
                    selectedFieldsMediaDto.setTitle(mediaDto.getTitle());
                    selectedFieldsMediaDto.setGenre(mediaDto.getGenre());
                    selectedFieldsMediaDto.setReleaseYear(mediaDto.getReleaseYear());
                    selectedFieldsMediaDto.setDirector(mediaDto.getDirector());
                    selectedFieldsMediaDto.setImageUrl(mediaDto.getImageUrl());
                    selectedFieldsMediaDto.setDescription(mediaDto.getDescription());
                    selectedFieldsMediaDto.setType(mediaDto.getType());
                    return selectedFieldsMediaDto;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(selectedFieldsMediaDtoList);
    }


    @GetMapping("{id}")
    public ResponseEntity<MediaDto> getMediaById(@PathVariable("id") Long mediaId) {
        MediaDto mediaDto = mediaService.getMediaById(mediaId);
        return ResponseEntity.ok(mediaDto);
    }

}
