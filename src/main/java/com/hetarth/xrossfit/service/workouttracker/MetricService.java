package com.hetarth.xrossfit.service.workouttracker;

import com.hetarth.xrossfit.dao.MetricDAO;
import com.hetarth.xrossfit.dto.workouttracker.MetricDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetricService {
    private final MetricDAO metricDAO;

    public List<MetricDTO> findMetricsByExerciseId(Long exerciseId){
        try{
            return metricDAO.findMetricsByExerciseId(exerciseId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
