package com.example.usermanagement.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponseDTO {
    private Long id;
    private String name;
    private String mobile;
    private String email;
    private String gender;
    private String city;
    private List<String> rolesInterested;
    private String username;
    private LocalDateTime createdAt;
}