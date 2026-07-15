package com.pawfinds.adoption.service;

import com.pawfinds.adoption.model.AdoptionFormMongo;
import com.pawfinds.adoption.repository.AdoptionFormMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionFormMongoService {
    
    @Autowired
    private AdoptionFormMongoRepository adoptionFormMongoRepository;
    
    @Autowired
    private PetService petService;
    
    public List<AdoptionFormMongo> getAllAdoptionForms() {
        return adoptionFormMongoRepository.findAll();
    }
    
    public Optional<AdoptionFormMongo> getAdoptionFormById(String id) {
        return adoptionFormMongoRepository.findById(id);
    }
    
    public List<AdoptionFormMongo> getAdoptionFormsByStatus(String status) {
        return adoptionFormMongoRepository.findByStatus(status);
    }
    
    public List<AdoptionFormMongo> getAdoptionFormsByEmail(String email) {
        return adoptionFormMongoRepository.findByEmail(email);
    }
    
    public List<AdoptionFormMongo> getAdoptionFormsByPetId(Integer petId) {
        return adoptionFormMongoRepository.findByPetId(petId);
    }
    
    public AdoptionFormMongo submitAdoptionForm(AdoptionFormMongo form) {
        form.setSubmittedDate(LocalDateTime.now());
        form.setStatus("Pending");
        return adoptionFormMongoRepository.save(form);
    }
    
    public AdoptionFormMongo updateAdoptionFormStatus(String id, String status, String comments) {
        Optional<AdoptionFormMongo> formOptional = adoptionFormMongoRepository.findById(id);
        if (formOptional.isPresent()) {
            AdoptionFormMongo form = formOptional.get();
            form.setStatus(status);
            form.setAdminComments(comments);
            form.setReviewedDate(LocalDateTime.now());
            
            // If marking as Adopted, update the pet status as well
            if ("Adopted".equals(status) && form.getPetId() != null) {
                try {
                    petService.updatePetStatus(form.getPetId().longValue(), "Adopted");
                } catch (Exception e) {
                    // Log error but don't fail the adoption form update
                    System.err.println("Failed to update pet status: " + e.getMessage());
                }
            }
            
            return adoptionFormMongoRepository.save(form);
        }
        throw new RuntimeException("Adoption form not found with id: " + id);
    }
    
    public void deleteAdoptionForm(String id) {
        adoptionFormMongoRepository.deleteById(id);
    }
}
