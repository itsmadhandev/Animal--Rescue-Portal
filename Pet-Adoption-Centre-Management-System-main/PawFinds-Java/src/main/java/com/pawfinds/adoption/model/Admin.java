package com.pawfinds.adoption.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "admins")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Username is required")
    @Column(unique = true, nullable = false)
    private String username;
    
    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;
    
    @NotBlank(message = "Email is required")
    @Column(unique = true, nullable = false)
    private String email;
    
    private String fullName;
    
    @Column(nullable = false)
    private String role = "ADMIN";
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @Column(updatable = false)
    private LocalDateTime createdDate;
    
    private LocalDateTime lastLogin;
    
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}
