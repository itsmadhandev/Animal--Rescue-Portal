package com.pawfinds.adoption.service;

import com.pawfinds.adoption.model.AdoptionForm;
import com.pawfinds.adoption.repository.AdoptionFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionFormService {
    
    @Autowired
    private AdoptionFormRepository adoptionFormRepository;
    
    @Autowired
    private PetService petService;
    
    public List<AdoptionForm> getAllAdoptionForms() {
        return adoptionFormRepository.findAll();
    }
    
    public Optional<AdoptionForm> getAdoptionFormById(Long id) {
        return adoptionFormRepository.findById(id);
    }
    
    public List<AdoptionForm> getAdoptionFormsByStatus(String status) {
        return adoptionFormRepository.findByStatus(status);
    }
    
    public AdoptionForm submitAdoptionForm(AdoptionForm form) {
        form.setStatus("Pending");
        AdoptionForm savedForm = adoptionFormRepository.save(form);
        
        // Update pet status to Pending
        petService.updatePetStatus(form.getPetId().longValue(), "Pending");
        
        return savedForm;
    }
    
    public AdoptionForm updateAdoptionFormStatus(Long id, String status, String comments) {
        AdoptionForm form = adoptionFormRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoption form not found with id: " + id));
        
        form.setStatus(status);
        form.setAdminComments(comments);
        form.setReviewedDate(LocalDateTime.now());
        
        // Update pet status based on adoption form status
        if ("Adopted".equals(status)) {
            petService.updatePetStatus(form.getPetId().longValue(), "Adopted");
        } else if ("Rejected".equals(status)) {
            petService.updatePetStatus(form.getPetId().longValue(), "Available");
        }
        
        return adoptionFormRepository.save(form);
    }
    
    public void deleteAdoptionForm(Long id) {
        adoptionFormRepository.deleteById(id);
    }
}
