package com.ecobazaar.repository;

import com.ecobazaar.entity.Role;
import com.ecobazaar.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u JOIN FETCH u.roles WHERE u.email = :email")
    Optional<User> findByEmailWithRoles(@Param("email") String email);
    
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :roleName")
    List<User> findUsersByRole(@Param("roleName") Role.RoleName roleName);
    
    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.email = :email AND r.name = :roleName AND u.enabled = true")
    Optional<User> findByEmailAndRole(@Param("email") String email, @Param("roleName") Role.RoleName roleName);
}
