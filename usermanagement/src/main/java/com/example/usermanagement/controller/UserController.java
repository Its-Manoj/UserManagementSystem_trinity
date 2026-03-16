package com.example.usermanagement.controller;

import com.example.usermanagement.dto.LoginRequest;
import com.example.usermanagement.dto.UpdateUserDTO;
import com.example.usermanagement.dto.UserDTO;
import com.example.usermanagement.dto.UserResponseDTO;
import com.example.usermanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDTO) {
        String response = userService.registerUser(userDTO);

        if (response.contains("already")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", response));
        }

        return ResponseEntity.ok(Map.of("message", response));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = userService.loginUser(loginRequest);

        if (Boolean.FALSE.equals(response.get("success"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<UserResponseDTO>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(userService.getAllUsers(page, size));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<UserResponseDTO>> searchUsers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(userService.searchUsers(keyword, page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserDTO updateUserDTO) {
        String response = userService.updateUser(id, updateUserDTO);

        if (response.equals("User not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", response));
        }

        if (response.contains("already")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", response));
        }

        return ResponseEntity.ok(Map.of("message", response));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        String response = userService.deleteUser(id);

        if (response.equals("User not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", response));
        }

        return ResponseEntity.ok(Map.of("message", response));
    }
}