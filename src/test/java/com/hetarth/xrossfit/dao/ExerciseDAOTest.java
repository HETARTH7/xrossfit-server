package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.entity.Exercise;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class ExerciseDAOTest {

    @Autowired
    private ExerciseDAO exerciseDAO;

    @Test
    void shouldFetchExercises() {

        // Arrange
        Exercise exercise1 = new Exercise();
        exercise1.setExerciseName("Push Up");
        exercise1.setExerciseType("CHEST");

        Exercise exercise2 = new Exercise();
        exercise2.setExerciseName("Squat");
        exercise2.setExerciseType("LEGS");

        exerciseDAO.save(exercise1);
        exerciseDAO.save(exercise2);

        // Act
        List<ExerciseDTO> exercises = exerciseDAO.getExercises();

        // Assert
        assertThat(exercises).isNotNull();
        assertThat(exercises).hasSize(2);

        assertThat(exercises.get(0).getExerciseName()).isEqualTo("Push Up");
        assertThat(exercises.get(0).getExerciseType()).isEqualTo("CHEST");

        assertThat(exercises.get(1).getExerciseName()).isEqualTo("Squat");
        assertThat(exercises.get(1).getExerciseType()).isEqualTo("LEGS");
    }
}