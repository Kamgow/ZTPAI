package com.kamilg.watchit.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaAdminDto {
    private long mediaId;
    private String title;
    private String genre;
    private String releaseYear;
    private String director;
    private String imageUrl;
    private String description;
    private String type;
}