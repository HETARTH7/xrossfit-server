package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseDAO extends JpaRepository<Exercise, Long> {
    @Query("select e.exerciseName from Exercise e")
    List<String> getExerciseNames();
}
