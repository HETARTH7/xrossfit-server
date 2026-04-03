package com.hetarth.xrossfit.dto.workouttracker;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LogMetricResponse {
    private Long logMetricId;
    private String metricName;
    private Double metricValue;
    private String metricUnit;
}
