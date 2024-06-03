package com.kamilg.watchit.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Accessors(chain = true)
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birthdate")
    private LocalDate birthDate;

    @Column(name = "role")
    private String role;

    @ManyToMany
    @JoinTable(
            name = "user_media",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "media_id")
    )
    private Set<Media> media = new HashSet<>();

    public void addMedia(Media media) {
        this.media.add(media);
        media.getUsers().add(this);
    }

    public boolean isInMyList(Media media) {
        return this.media.contains(media);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // W tej implementacji zwracamy jedną rolę na podstawie pola 'role' użytkownika
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Możesz dodatkowo zaimplementować logikę sprawdzającą ważność konta
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Możesz dodatkowo zaimplementować logikę sprawdzającą czy konto jest zablokowane
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Możesz dodatkowo zaimplementować logikę sprawdzającą ważność poświadczeń
    }

    @Override
    public boolean isEnabled() {
        return true; // Możesz dodatkowo zaimplementować logikę sprawdzającą czy konto jest włączone
    }

}