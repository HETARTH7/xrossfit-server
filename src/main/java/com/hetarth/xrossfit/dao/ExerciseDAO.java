package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.workouttracker.ExerciseDTO;
import com.hetarth.xrossfit.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDAO extends JpaRepository<Exercise, Long> {
    @Query("""
       SELECT e.id AS id,
              e.exerciseName AS exerciseName,
              e.exerciseType AS exerciseType
       FROM Exercise e
       """)
    List<ExerciseDTO> getExercises();
}
