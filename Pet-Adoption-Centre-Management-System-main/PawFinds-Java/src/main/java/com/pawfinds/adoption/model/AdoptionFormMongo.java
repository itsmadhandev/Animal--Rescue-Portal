package com.pawfinds.adoption.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "adoption_forms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionFormMongo {
    
    @Id
    private String id;
    
    @NotBlank(message = "Name is required")
    private String adopterName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    private String phone;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    private String occupation;
    
    private Integer petId;
    
    private String petName;
    
    private String reasonForAdoption;
    
    private Boolean hasExperience = false;
    
    private Boolean hasOtherPets = false;
    
    private String otherPetsDetails;
    
    private Boolean hasYard = false;
    
    private String status = "Pending"; // Pending, Approved, Rejected, Adopted
    
    private LocalDateTime submittedDate;
    
    private LocalDateTime reviewedDate;
    
    private String adminComments;
    
    // Constructor without id for new documents
    public AdoptionFormMongo(String adopterName, String email, String phone, String address,
                            String occupation, Integer petId, String petName, String reasonForAdoption,
                            Boolean hasExperience, Boolean hasOtherPets, String otherPetsDetails,
                            Boolean hasYard, String status) {
        this.adopterName = adopterName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.occupation = occupation;
        this.petId = petId;
        this.petName = petName;
        this.reasonForAdoption = reasonForAdoption;
        this.hasExperience = hasExperience;
        this.hasOtherPets = hasOtherPets;
        this.otherPetsDetails = otherPetsDetails;
        this.hasYard = hasYard;
        this.status = status;
        this.submittedDate = LocalDateTime.now();
    }
}
