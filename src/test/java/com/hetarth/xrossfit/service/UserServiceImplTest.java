package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.dto.auth.LoginRequest;
import com.hetarth.xrossfit.dto.auth.SignupRequest;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.impl.AuthenticationServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.NoSuchElementException;
import java.util.Optional;

@SpringBootTest
public class UserServiceImplTest {
    @Mock
    private UserDAO userDAO;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @BeforeEach
    public void setup(){
        User user = new User();
        user.setFirstName("test_fname");
        user.setLastName("test_lname");
        user.setUsername("test_username");
        user.setEmail("test_email@gmail.com");
        user.setPassword("test_password");
        userDAO.save(user);
    }

    @Test
    public void signupTest_Happy(){
        SignupRequest request = new SignupRequest();
        request.setFirstName("new_fname");
        request.setLastName("new_lname");
        request.setUsername("new_username");
        request.setEmail("new_email@gmail.com");
        request.setPassword("new_password");
        Mockito.when(passwordEncoder.encode(request.getPassword())).thenReturn(request.getPassword());
        Mockito.when(userDAO.save(Mockito.any())).thenReturn(new User());
        User newUser = authenticationService.signup(request);
        Assertions.assertNotNull(newUser);
    }

    @Test
    public void signupTest_usernameExists(){
        SignupRequest request = new SignupRequest();
        Mockito.when(userDAO.existsByUsername(request.getUsername())).thenReturn(true);
        RuntimeException exception = Assertions.assertThrows(RuntimeException.class, ()->authenticationService.signup(request));
        Assertions.assertEquals("Username already taken", exception.getMessage());
    }

    @Test
    public void signupTest_emailExists(){
        SignupRequest request = new SignupRequest();
        Mockito.when(userDAO.existsByEmail(request.getUsername())).thenReturn(true);
        RuntimeException exception = Assertions.assertThrows(RuntimeException.class, ()-> authenticationService.signup(request));
        Assertions.assertEquals("Email already in use", exception.getMessage());
    }

    @Test
    void loginTest_Happy() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test_email@gmail.com");
        request.setPassword("test_password");

        User mockUser = new User();
        mockUser.setId(1L);
        mockUser.setEmail("test_email@gmail.com");

        Mockito.when(userDAO.findByEmail(request.getEmail()))
                .thenReturn(Optional.of(mockUser));

        User result = authenticationService.login(request);

        Assertions.assertNotNull(result);
        Assertions.assertEquals("test_email@gmail.com", result.getEmail());
    }

    @Test
    void loginTest_InvalidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test_email@gmail.com");
        request.setPassword("wrong_password");

        // Mock authentication failure
        Mockito.doThrow(new BadCredentialsException("Invalid credentials"))
                .when(authenticationManager)
                .authenticate(Mockito.any());

        Assertions.assertThrows(
                BadCredentialsException.class,
                () -> authenticationService.login(request)
        );
    }

    @Test
    void loginTest_UserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("notfound@gmail.com");
        request.setPassword("password");

        Mockito.when(userDAO.findByEmail(request.getEmail()))
                .thenReturn(Optional.empty());

        Assertions.assertThrows(
                NoSuchElementException.class,
                () -> authenticationService.login(request)
        );
    }
}
