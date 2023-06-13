package com.backend.securityservice.Controllers;

import com.backend.securityservice.Dto.LoginDTO;
import com.backend.securityservice.Dto.SignupDTO;
import com.backend.securityservice.Dto.TokenDTO;
import com.backend.securityservice.Dto.UserDTO;
import com.backend.securityservice.Models.User;
import com.backend.securityservice.Security.TokenGenerator;
import com.backend.securityservice.Services.CookieManager;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import jakarta.ws.rs.Produces;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserDetailsManager userDetailsManager;
    @Autowired
    TokenGenerator tokenGenerator;
    @Autowired
    DaoAuthenticationProvider daoAuthenticationProvider;
    @Autowired
    JwtAuthenticationProvider refreshTokenAuthProvider;

    @Autowired
    CookieManager cookieManager;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody SignupDTO signupDTO) {
        User user = new User(signupDTO.getUsername(), signupDTO.getPassword(), signupDTO.getFirstName(), signupDTO.getLastName(), signupDTO.getEmail());

        user.setCreatedAt(new Date());

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        user.setAuthorities(authorities);
        userDetailsManager.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signupDTO.getPassword(), authorities);

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }


    @PostMapping("/register/admin")
    public ResponseEntity registerAdmin(@RequestBody SignupDTO signupDTO) {
        User user = new User(signupDTO.getUsername(), signupDTO.getPassword(), signupDTO.getFirstName(), signupDTO.getLastName(), signupDTO.getEmail());

        user.setCreatedAt(new Date());

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        user.setAuthorities(authorities);
        userDetailsManager.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signupDTO.getPassword(), authorities);

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO, HttpServletResponse response) {
        Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.getUsername(), loginDTO.getPassword()));
        TokenDTO token = tokenGenerator.createToken(authentication);
        cookieManager.setHttpOnlyCookie(response, "token", token.getAccessToken(), 24 * 60 * 60); // 1 day in seconds
        return ResponseEntity.ok(token);
    }

    @PostMapping("/token")
    public ResponseEntity token(@RequestBody TokenDTO tokenDTO) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));
        Jwt jwt = (Jwt) authentication.getCredentials();
        // check if present in db and not revoked, etc

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @GetMapping("/validate")
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> validate(@RequestParam("token") String token) {
        boolean isValid = tokenGenerator.isAccessTokenValid(token);
        Jwt jwt = tokenGenerator.decodeAccessToken(token);
        if (!isValid) {
            return null;
        }
        return ResponseEntity.ok(new UserDTO(jwt.getSubject(), jwt.getClaim("username"), jwt.getClaim("roles")));
    }
}