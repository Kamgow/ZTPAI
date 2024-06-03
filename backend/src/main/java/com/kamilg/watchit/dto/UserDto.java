package com.kamilg.watchit.dto;

import com.kamilg.watchit.entity.Media;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String first_name;
    private String last_name;
    private String username;
    private String password;
    private LocalDate birthdate;
    private String role;
    private Set<Media> media = new HashSet<>();
}
