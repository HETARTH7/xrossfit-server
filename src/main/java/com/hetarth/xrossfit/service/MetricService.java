package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dao.MetricDAO;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetricService {
    @Autowired
    private MetricDAO metricDAO;

    public List<MetricDTO> findMetricsByExerciseId(Long exerciseId){
        return metricDAO.findMetricsByExerciseId(exerciseId);
    }
}
