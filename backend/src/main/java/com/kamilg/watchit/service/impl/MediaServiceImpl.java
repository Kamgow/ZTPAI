package com.kamilg.watchit.service.impl;

import com.kamilg.watchit.dto.MediaAdminDto;
import com.kamilg.watchit.dto.MediaDto;
import com.kamilg.watchit.entity.Media;
import com.kamilg.watchit.exception.ResourceNotFoundException;
import com.kamilg.watchit.mapper.MediaMapper;
import com.kamilg.watchit.repository.MediaRepository;
import com.kamilg.watchit.service.MediaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MediaServiceImpl implements MediaService {

    private final MediaRepository mediaRepository;

    @Override
    public List<MediaDto> getAllMedia(){
        List<Media> mediaList = mediaRepository.findAll();
        return  mediaList.stream().map((media) -> MediaMapper.mapToMediaDto(media))
                .collect(Collectors.toList());
    }

    @Override
    public MediaDto getMediaById(Long mediaId) {
        Media media = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media not found"));

        return MediaMapper.mapToMediaDto(media);
    }

    @Override
    public MediaAdminDto addMedia(MediaAdminDto mediaAdminDto) {
        var media = Media.builder()
                .title(mediaAdminDto.getTitle())
                .genre(mediaAdminDto.getGenre())
                .releaseYear(mediaAdminDto.getReleaseYear())
                .director(mediaAdminDto.getDirector())
                .imageUrl(mediaAdminDto.getImageUrl())
                .description(mediaAdminDto.getDescription())
                .type(mediaAdminDto.getType())
                .build();
        mediaRepository.save(media);
        return null;
    }

    @Override
    public MediaAdminDto editMedia(Long mediaId, MediaAdminDto mediaAdminDto) {

        Media existingMedia = mediaRepository.findById(mediaId)
                .orElseThrow(() -> new ResourceNotFoundException("Media not found"));

        existingMedia.setTitle(mediaAdminDto.getTitle());
        existingMedia.setGenre(mediaAdminDto.getGenre());
        existingMedia.setReleaseYear(mediaAdminDto.getReleaseYear());
        existingMedia.setDirector(mediaAdminDto.getDirector());
        existingMedia.setImageUrl(mediaAdminDto.getImageUrl());
        existingMedia.setDescription(mediaAdminDto.getDescription());
        existingMedia.setType(mediaAdminDto.getType());

        mediaRepository.save(existingMedia);

        return null;
    }
}
