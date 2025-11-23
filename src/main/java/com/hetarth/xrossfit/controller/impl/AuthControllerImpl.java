package com.hetarth.xrossfit.controller.impl;

import com.hetarth.xrossfit.controller.AuthController;
import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.LoginResponse;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.dto.auth.SignupResponse;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.AuthenticationService;
import com.hetarth.xrossfit.service.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthControllerImpl implements AuthController {
    private final static String AUTH_TOKEN = "authToken";
    private final static String REFRESH_TOKEN = "refreshToken";
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private JwtService jwtService;

    @Value("${security.jwt.expiration-time.refresh-token}")
    private long jwtRefreshTokenExpiration;

    @PostMapping("/signup")
    @Override
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request, HttpServletResponse response){
        log.info("Received signup request for username: {}", request.getDisplayName());
        try{
            User user = authenticationService.signup(request);
            Map<String, String> tokens = generateJwtTokens(user);
            setJwtCookie(tokens.get(REFRESH_TOKEN), response);

            SignupResponse signupResponse=new SignupResponse();
            signupResponse.setId(user.getId());
            signupResponse.setDisplayName(user.getDisplayName());
            signupResponse.setEmailVerified(user.getEmailVerified());
            signupResponse.setRole(user.getRole().name());
            signupResponse.setToken(tokens.get(AUTH_TOKEN));

            log.info("Signup successful for: {} (id={})", user.getEmail(), user.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(signupResponse);
        } catch(Exception e){
            log.error("Signup failed for '{}': {}", request.getDisplayName(), e.getMessage(), e);

            SignupResponse errorResponse = new SignupResponse();
            errorResponse.setError(e.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }

    @PostMapping("/login")
    @Override
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response){
        log.info("Received login request for user: {}", request.getEmail());
        try{
            User user = authenticationService.login(request);
            Map<String, String> tokens = generateJwtTokens(user);
            setJwtCookie(tokens.get(REFRESH_TOKEN), response);

            LoginResponse authResponse = new LoginResponse();
            authResponse.setId(user.getId());
            authResponse.setDisplayName(user.getDisplayName());
            authResponse.setEmailVerified(user.getEmailVerified());
            authResponse.setRole(user.getRole().name());
            authResponse.setToken(tokens.get(AUTH_TOKEN));

            log.info("Login successful for {} (id={})", user.getEmail(), user.getId());
            return ResponseEntity.status(HttpStatus.OK).body(authResponse);
        } catch(Exception e){
            log.warn("Login failed for user: {}. Reason: {}", request.getEmail(), e.getMessage());

            LoginResponse errorResponse=new LoginResponse();
            errorResponse.setError(e.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    public Map<String, String> generateJwtTokens(User user){
        Map<String, String> generatedTokens= new HashMap<>();
        String authToken = jwtService.generateAuthToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        generatedTokens.put(AUTH_TOKEN, authToken);
        generatedTokens.put(REFRESH_TOKEN, refreshToken);
        return generatedTokens;
    }

    public void setJwtCookie(String jwtToken, HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("refreshToken", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtRefreshTokenExpiration)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
