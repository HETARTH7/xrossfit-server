package com.hetarth.xrossfit.dto.workouttracker;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter @Getter
@AllArgsConstructor
public class ExerciseLogDTO {
    private Long logId;
    private String exerciseName;
    private String exerciseType;
    private LocalDateTime timestamp;
}
