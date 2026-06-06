package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.user.PersonalDetailsResponse;
import com.hetarth.xrossfit.entity.User;
import com.hetarth.xrossfit.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/personal-details")
    public ResponseEntity<PersonalDetailsResponse> getPersonalDetails(@AuthenticationPrincipal User user) {
        log.info("Fetching personal details for: {}", user.getDisplayName());
        try {
            PersonalDetailsResponse response = userService.getPersonalDetails(user.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
