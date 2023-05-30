package com.backend.securityservice.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupDTO {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
