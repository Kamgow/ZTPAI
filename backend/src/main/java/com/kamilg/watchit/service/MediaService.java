package com.kamilg.watchit.service;

import com.kamilg.watchit.dto.MediaAdminDto;
import com.kamilg.watchit.dto.MediaDto;

import java.util.List;

public interface MediaService {
    List<MediaDto> getAllMedia();

    MediaDto getMediaById(Long mediaId);

    MediaAdminDto addMedia(MediaAdminDto mediaAdminDto);

    MediaAdminDto editMedia(Long mediaId, MediaAdminDto mediaAdminDto);
}
