package com.example.usermanagement.service;

import com.example.usermanagement.dto.LoginRequest;
import com.example.usermanagement.dto.UpdateUserDTO;
import com.example.usermanagement.dto.UserDTO;
import com.example.usermanagement.dto.UserResponseDTO;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(UserDTO dto) {
        if (userRepository.existsByMobile(dto.getMobile())) {
            return "Mobile number already registered. Please login.";
        }

        if (userRepository.existsByEmail(dto.getEmail())) {
            return "Email already registered. Please login.";
        }

        if (userRepository.existsByUsername(dto.getUsername())) {
            return "Username already registered. Please login.";
        }

        User user = new User();
        user.setName(dto.getName());
        user.setMobile(dto.getMobile());
        user.setEmail(dto.getEmail());
        user.setGender(dto.getGender());
        user.setCity(dto.getCity());
        user.setRolesInterested(String.join(",", dto.getRolesInterested()));
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        return "User registered successfully";
    }

    public Map<String, Object> loginUser(LoginRequest request) {
        Map<String, Object> response = new HashMap<>();

        User user = userRepository
                .findByUsernameAndPassword(request.getUsername(), request.getPassword())
                .orElse(null);

        if (user == null) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("username", user.getUsername());
        return response;
    }

    public Page<UserResponseDTO> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAllByOrderByCreatedAtDesc(pageable).map(this::convertToDTO);
    }

    public Page<UserResponseDTO> searchUsers(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.searchUsers(keyword, pageable).map(this::convertToDTO);
    }

    public String updateUser(Long id, UpdateUserDTO dto) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        if (userRepository.existsByMobileAndIdNot(dto.getMobile(), id)) {
            return "Mobile number already registered with another user";
        }

        if (userRepository.existsByEmailAndIdNot(dto.getEmail(), id)) {
            return "Email already registered with another user";
        }

        if (userRepository.existsByUsernameAndIdNot(dto.getUsername(), id)) {
            return "Username already registered with another user";
        }

        User user = optionalUser.get();
        user.setName(dto.getName());
        user.setMobile(dto.getMobile());
        user.setEmail(dto.getEmail());
        user.setGender(dto.getGender());
        user.setCity(dto.getCity());
        user.setRolesInterested(String.join(",", dto.getRolesInterested()));
        user.setUsername(dto.getUsername());

        userRepository.save(user);
        return "User details updated successfully";
    }

    private UserResponseDTO convertToDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setMobile(user.getMobile());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setCity(user.getCity());
        dto.setUsername(user.getUsername());
        dto.setCreatedAt(user.getCreatedAt());

        if (user.getRolesInterested() != null && !user.getRolesInterested().isEmpty()) {
            dto.setRolesInterested(Arrays.asList(user.getRolesInterested().split(",")));
        } else {
            dto.setRolesInterested(new ArrayList<>());
        }

        return dto;
    }
    public String deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}