package com.hetarth.xrossfit.dto.workouttracker;

import lombok.Getter;

@Getter
public class MetricValueRequest {
    private Long metricId;
    private Double value;
}
