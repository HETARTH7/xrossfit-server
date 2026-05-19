package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;
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

    @Test
    void existsByEmail_shouldReturnTrue_whenEmailExists() {
        // Arrange
        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setDisplayName("jane_doe");
        user.setEmail("jane@test.com");
        user.setPassword("password123");

        userDAO.save(user);

        // Act
        boolean exists = userDAO.existsByEmail("jane@test.com");

        // Assert
        assertThat(exists).isTrue();
    }

    @Test
    void existsByEmail_shouldReturnFalse_whenEmailDoesNotExist() {
        // Act
        boolean exists = userDAO.existsByEmail("unknown@test.com");

        // Assert
        assertThat(exists).isFalse();
    }

    @Test
    void findByEmail_shouldReturnUser_whenEmailExists() {
        // Arrange
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setDisplayName("john_doe");
        user.setEmail("john@test.com");
        user.setPassword("password123");

        User savedUser = userDAO.save(user);

        // Act
        Optional<User> result = userDAO.findByEmail("john@test.com");

        // Assert
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(savedUser.getId());
        assertThat(result.get().getEmail()).isEqualTo("john@test.com");
        assertThat(result.get().getDisplayName()).isEqualTo("john_doe");
    }

    @Test
    void findByEmail_shouldReturnEmpty_whenEmailDoesNotExist() {
        // Act
        Optional<User> result = userDAO.findByEmail("unknown@test.com");

        // Assert
        assertThat(result).isEmpty();
    }
}
