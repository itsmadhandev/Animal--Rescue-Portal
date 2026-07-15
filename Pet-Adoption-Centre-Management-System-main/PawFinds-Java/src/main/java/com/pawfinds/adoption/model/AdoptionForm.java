package com.pawfinds.adoption.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_forms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionForm {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String adopterName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(nullable = false)
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @Column(nullable = false)
    private String phone;
    
    @NotBlank(message = "Address is required")
    @Column(nullable = false, length = 500)
    private String address;
    
    private String occupation;
    
    @Column(nullable = false)
    private Integer petId;
    
    @Column(nullable = false)
    private String petName;
    
    @Column(length = 1000)
    private String reasonForAdoption;
    
    @Column(nullable = false)
    private Boolean hasExperience = false;
    
    @Column(nullable = false)
    private Boolean hasOtherPets = false;
    
    private String otherPetsDetails;
    
    @Column(nullable = false)
    private Boolean hasYard = false;
    
    @Column(nullable = false)
    private String status = "Pending"; // Pending, Approved, Rejected, Adopted
    
    @Column(updatable = false)
    private LocalDateTime submittedDate;
    
    private LocalDateTime reviewedDate;
    
    private String adminComments;
    
    @PrePersist
    protected void onCreate() {
        submittedDate = LocalDateTime.now();
    }
}
