package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserDAOTest {

    @Autowired
    private UserDAO userDAO;

    @Test
    void existsByDisplayName_shouldReturnTrue_whenDisplayNameExists() {
        // Arrange
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setDisplayName("john_doe");
        user.setEmail("john@test.com");
        user.setPassword("password123");

        userDAO.save(user);

        // Act
        boolean exists = userDAO.existsByDisplayName("john_doe");

        // Assert
        assertThat(exists).isTrue();
    }

    @Test
    void existsByDisplayName_shouldReturnFalse_whenDisplayNameDoesNotExist() {
        // Act
        boolean exists = userDAO.existsByDisplayName("unknown_user");

        // Assert
        assertThat(exists).isFalse();
    }
}