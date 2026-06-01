package com.hetarth.xrossfit.service.user;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.dto.notification.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDAO userDAO;

    public List<UserDTO> getUserIds() {
        return userDAO.getUserIds();
    }
}
