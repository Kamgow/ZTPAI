package com.kamilg.watchit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Accessors(chain = true)
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "genre", nullable = false)
    private String genre;

    @Column(name = "release_year", nullable = false)
    private String releaseYear;

    @Column(name = "director", nullable = false)
    private String director;

    @Column(name = "imageurl", nullable = false)
    private String imageUrl;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "type", nullable = false)
    private String type;

    @ManyToMany(mappedBy = "media")
    private Set<User> users = new HashSet<>();

}
