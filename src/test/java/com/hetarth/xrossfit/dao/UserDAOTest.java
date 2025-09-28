package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class UserDAOTest {

    @Autowired
    private UserDAO userDAO;

    @BeforeEach
    public void setup(){
        User user = new User();
        user.setFirstName("test_fname");
        user.setLastName("test_lname");
        user.setUsername("test_username");
        user.setEmail("test_email");
        user.setPassword("test_password");
        userDAO.save(user);
    }

    @Test
    public void existsByUsernameTest_userExists(){
        boolean userExists = userDAO.existsByUsername("test_username");
        Assertions.assertTrue(userExists);
    }

    @Test
    public void existsByUsernameTest_userDoesNotExist(){
        boolean userExists = userDAO.existsByUsername("non_existing_username");
        Assertions.assertFalse(userExists);
    }

    @Test
    public void existsByEmailTest_userExists(){
        boolean userExists = userDAO.existsByEmail("test_email");
        Assertions.assertTrue(userExists);
    }

    @Test
    public void existsByEmailTest_userDoesNotExist(){
        boolean userExists = userDAO.existsByEmail("non_existing_email");
        Assertions.assertFalse(userExists);
    }
}
