package com.example.usermanagement.repository;

import com.example.usermanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByMobile(String mobile);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    boolean existsByMobileAndIdNot(String mobile, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByUsernameAndIdNot(String username, Long id);

    Optional<User> findByUsernameAndPassword(String username, String password);
    Optional<User> findByUsername(String username);

    Page<User> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("""
        SELECT u FROM User u
        WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.mobile) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.city) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.gender) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(u.rolesInterested) LIKE LOWER(CONCAT('%', :keyword, '%'))
        ORDER BY u.createdAt DESC
    """)
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}