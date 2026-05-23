package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dao.LogMetricDAO;
import com.hetarth.xrossfit.dto.workouttracker.MetricValueRequest;
import com.hetarth.xrossfit.entity.ExerciseLog;
import com.hetarth.xrossfit.entity.LogMetric;
import com.hetarth.xrossfit.entity.Metric;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogMetricService {
    private final LogMetricDAO logMetricDAO;

    public void logExerciseMetrics(List<MetricValueRequest> logMetricRequest, ExerciseLog savedLog) {
        List<LogMetric> logMetrics = logMetricRequest.stream().map(metricValueRequest -> {
            LogMetric logMetric = new LogMetric();
            logMetric.setLog(savedLog);

            Metric metric = new Metric();
            metric.setId(metricValueRequest.getMetricId());
            logMetric.setMetric(metric);
            logMetric.setValue(metricValueRequest.getValue());
            return logMetric;
        }).toList();
        logMetricDAO.saveAll(logMetrics);
    }
}
