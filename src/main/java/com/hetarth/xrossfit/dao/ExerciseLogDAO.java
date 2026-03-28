package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.ExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseLogDAO extends JpaRepository<ExerciseLog, Long> {
}
