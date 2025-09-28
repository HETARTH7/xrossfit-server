package com.hetarth.xrossfit.service;

import com.hetarth.xrossfit.dao.UserDAO;
import com.hetarth.xrossfit.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceImplTest {
    @Mock
    private UserDAO userDAO;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    public void signupTest_Happy(){

    }

    @Test
    public void signupTest_usernameExists(){

    }

    @Test
    public void signupTest_emailExists(){

    }

    @Test
    public void signupTest_nullFirstName(){

    }

    @Test
    public void signupTest_nullLastName(){

    }

    @Test
    public void signupTest_nullUsername(){

    }

    @Test
    public void signupTest_nullEmail(){

    }

    @Test
    public void signupTest_nullPassword(){

    }
}
