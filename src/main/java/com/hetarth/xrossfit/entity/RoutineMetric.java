package com.hetarth.xrossfit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "routine_metrics")
public class RoutineMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "routine_exercise_id", nullable = false)
    private RoutineExercise routineExercise;
    @ManyToOne
    @JoinColumn(name = "metric_id", nullable = false)
    private Metric metric;
    @Column(nullable = false)
    private Double targetValue;
}
