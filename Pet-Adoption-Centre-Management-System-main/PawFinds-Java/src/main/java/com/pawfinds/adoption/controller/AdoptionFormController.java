package com.pawfinds.adoption.controller;

import com.pawfinds.adoption.model.AdoptionForm;
import com.pawfinds.adoption.service.AdoptionFormService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adoption-forms")
@CrossOrigin(origins = "*")
public class AdoptionFormController {
    
    @Autowired
    private AdoptionFormService adoptionFormService;
    
    @GetMapping
    public ResponseEntity<List<AdoptionForm>> getAllAdoptionForms() {
        return ResponseEntity.ok(adoptionFormService.getAllAdoptionForms());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionForm> getAdoptionFormById(@PathVariable Long id) {
        return adoptionFormService.getAdoptionFormById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdoptionForm>> getAdoptionFormsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(adoptionFormService.getAdoptionFormsByStatus(status));
    }
    
    @PostMapping
    public ResponseEntity<AdoptionForm> submitAdoptionForm(@Valid @RequestBody AdoptionForm form) {
        try {
            AdoptionForm submittedForm = adoptionFormService.submitAdoptionForm(form);
            return ResponseEntity.status(HttpStatus.CREATED).body(submittedForm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdoptionForm> updateAdoptionFormStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            String comments = statusUpdate.getOrDefault("comments", "");
            AdoptionForm updatedForm = adoptionFormService.updateAdoptionFormStatus(id, status, comments);
            return ResponseEntity.ok(updatedForm);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptionForm(@PathVariable Long id) {
        try {
            adoptionFormService.deleteAdoptionForm(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
