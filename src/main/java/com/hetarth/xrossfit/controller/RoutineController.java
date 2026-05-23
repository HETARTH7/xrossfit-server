package com.hetarth.xrossfit.controller;

import com.hetarth.xrossfit.dto.routine.RoutineRequest;
import com.hetarth.xrossfit.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/routine")
public class RoutineController {
    @PostMapping("/create-new")
    public ResponseEntity<String> createRoutine(@AuthenticationPrincipal User user, @RequestBody RoutineRequest request) {
        try {
            return ResponseEntity.ok("Created new routine.");
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
