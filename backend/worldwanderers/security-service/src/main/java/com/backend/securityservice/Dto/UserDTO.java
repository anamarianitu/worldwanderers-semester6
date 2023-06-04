package com.backend.securityservice.Dto;

import com.backend.securityservice.Models.User;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Builder
@Data
public class UserDTO {
    private String id;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .username(user.getUsername())
                .authorities(user.getAuthorities())
                .build();

    }
}