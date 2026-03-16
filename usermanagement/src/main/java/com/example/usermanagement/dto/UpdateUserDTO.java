package com.example.usermanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.util.List;

@Data
public class UpdateUserDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    @Pattern(regexp = "^[a-z0-9]+@gmail\\.com$", message = "Email must be a valid gmail address")
    private String email;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "City is required")
    private String city;

    @NotEmpty(message = "At least one role must be selected")
    private List<String> rolesInterested;

    @Pattern(regexp = "^[A-Z][A-Za-z0-9]*$", message = "Username must start with capital letter and contain only letters and numbers")
    private String username;
}