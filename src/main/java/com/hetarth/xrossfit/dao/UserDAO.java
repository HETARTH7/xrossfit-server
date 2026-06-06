package com.hetarth.xrossfit.dao;

import com.hetarth.xrossfit.dto.notification.UserDTO;
import com.hetarth.xrossfit.dto.user.PersonalDetailsResponse;
import com.hetarth.xrossfit.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User, Long> {
    boolean existsByDisplayName(String displayName);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("SELECT u.id as id, u.displayName as username, u.email as email FROM User u")
    List<UserDTO> getUserIds();

    @Query("SELECT u.firstName as firstName, u.lastName as lastName, u.displayName as displayName, u.email as email, u.emailVerified as emailVerified, u.phoneNumber as phoneNumber FROM User u where u.id = :userId")
    PersonalDetailsResponse getPersonalDetails(@Param("userId") Long userId);
}
