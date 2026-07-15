package com.pawfinds.adoption.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Pet name is required")
    @Column(nullable = false)
    private String petName;
    
    @NotBlank(message = "Pet type is required")
    @Column(nullable = false)
    private String petType; // Dog, Cat, Bird, etc.
    
    private String breed;
    
    @Column(nullable = false)
    private Integer age;
    
    @Column(nullable = false)
    private String gender; // Male, Female
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String location;
    
    @Column(nullable = false)
    private String contactNumber;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private String status = "Available"; // Available, Pending, Adopted
    
    @NotBlank(message = "Owner name is required")
    private String ownerName;
    
    private String ownerEmail;
    
    @Column(nullable = false)
    private Boolean vaccinated = false;
    
    @Column(nullable = false)
    private Boolean trained = false;
    
    @Column(updatable = false)
    private LocalDateTime postedDate;
    
    private LocalDateTime updatedDate;
    
    @PrePersist
    protected void onCreate() {
        postedDate = LocalDateTime.now();
        updatedDate = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
    }
}
