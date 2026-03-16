package com.example.usermanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false, length = 10)
    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;

    private String gender;

    private String city;

    @Column(length = 500)
    private String rolesInterested;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private LocalDateTime createdAt;
}