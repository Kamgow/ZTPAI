package com.kamilg.watchit.mapper;

import com.kamilg.watchit.dto.MediaDto;
import com.kamilg.watchit.entity.Media;

public class MediaMapper {

    public static MediaDto mapToMediaDto(Media media) {
        return new MediaDto(
                media.getMediaId(),
                media.getTitle(),
                media.getGenre(),
                media.getReleaseYear(),
                media.getDirector(),
                media.getImageUrl(),
                media.getDescription(),
                media.getType(),
                media.getUsers()
        );
    }

    public static Media mapToMedia(MediaDto mediaDto) {
        return new Media(
          mediaDto.getMediaId(),
          mediaDto.getTitle(),
          mediaDto.getGenre(),
          mediaDto.getReleaseYear(),
          mediaDto.getDirector(),
          mediaDto.getImageUrl(),
          mediaDto.getDescription(),
          mediaDto.getType(),
          mediaDto.getUsers()
        );
    }
}
