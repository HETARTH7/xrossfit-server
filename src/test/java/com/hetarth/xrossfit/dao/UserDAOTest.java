package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
public class UserDAOTest {

    @Autowired
    private UserDAO userDAO;

    @BeforeEach
    public void setup(){
        User user = new User();
        user.setFirstName("test_fname");
        user.setLastName("test_lname");
        user.setDisplayName("test_display_name");
        user.setEmail("test_email@gmail.com");
        user.setPassword("test_password");
        userDAO.save(user);
    }

    @Test
    public void existsByUsernameTest_userExists(){
        boolean userExists = userDAO.existsByDisplayName("test_display_name");
        Assertions.assertTrue(userExists);
    }

    @Test
    public void existsByUsernameTest_userDoesNotExist(){
        boolean userExists = userDAO.existsByDisplayName("non_existing_displayname");
        Assertions.assertFalse(userExists);
    }

    @Test
    public void existsByEmailTest_userExists(){
        boolean userExists = userDAO.existsByEmail("test_email@gmail.com");
        Assertions.assertTrue(userExists);
    }

    @Test
    public void existsByEmailTest_userDoesNotExist(){
        boolean userExists = userDAO.existsByEmail("non_existing_email@gmail.com");
        Assertions.assertFalse(userExists);
    }

    @Test
    public void findByEmailTest_userExists(){
        Optional<User> user = userDAO.findByEmail("test_email@gmail.com");
        Assertions.assertTrue(user.isPresent());
    }

    @Test
    public void findByEmailTest_useDoesNotExists(){
        Optional<User> user = userDAO.findByEmail("non_existing_email@gmail.com");
        Assertions.assertTrue(user.isEmpty());
    }
}
