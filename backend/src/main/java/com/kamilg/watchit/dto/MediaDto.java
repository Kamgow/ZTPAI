package com.kamilg.watchit.dto;

import com.kamilg.watchit.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MediaDto {
    private long mediaId;
    private String title;
    private String genre;
    private String releaseYear;
    private String director;
    private String imageUrl;
    private String description;
    private String type;
    private Set<User> users = new HashSet<>();
}
