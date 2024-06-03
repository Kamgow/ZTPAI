package com.kamilg.watchit.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private long id;
    private String first_name;
    private String last_name;
    private String username;
    private LocalDate birthdate;
    private String role;
}
