package com.kamilg.watchit.controller;

import com.kamilg.watchit.dto.MediaAdminDto;
import com.kamilg.watchit.dto.MediaDto;
import com.kamilg.watchit.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/media")
public class MediaAdminController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MediaAdminDto> addMedia(@RequestBody MediaAdminDto mediaAdminDto) {
        MediaAdminDto createdMedia = mediaService.addMedia(mediaAdminDto);
        return ResponseEntity.ok(createdMedia);
    }

    @PutMapping("/edit/{mediaId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MediaAdminDto> editMedia(@PathVariable Long mediaId, @RequestBody MediaAdminDto mediaAdminDto) {
        MediaAdminDto updatedMedia = mediaService.editMedia(mediaId, mediaAdminDto);
        return ResponseEntity.ok(updatedMedia);
    }


}
