package com.pawfinds.adoption.controller;

import com.pawfinds.adoption.model.AdoptionFormMongo;
import com.pawfinds.adoption.service.AdoptionFormMongoService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mongo/adoption-forms")
@CrossOrigin(origins = "*")
public class AdoptionFormMongoController {
    
    @Autowired
    private AdoptionFormMongoService adoptionFormMongoService;
    
    @GetMapping
    public ResponseEntity<List<AdoptionFormMongo>> getAllAdoptionForms() {
        return ResponseEntity.ok(adoptionFormMongoService.getAllAdoptionForms());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionFormMongo> getAdoptionFormById(@PathVariable String id) {
        return adoptionFormMongoService.getAdoptionFormById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AdoptionFormMongo>> getAdoptionFormsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(adoptionFormMongoService.getAdoptionFormsByStatus(status));
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<List<AdoptionFormMongo>> getAdoptionFormsByEmail(@PathVariable String email) {
        return ResponseEntity.ok(adoptionFormMongoService.getAdoptionFormsByEmail(email));
    }
    
    @GetMapping("/pet/{petId}")
    public ResponseEntity<List<AdoptionFormMongo>> getAdoptionFormsByPetId(@PathVariable Integer petId) {
        return ResponseEntity.ok(adoptionFormMongoService.getAdoptionFormsByPetId(petId));
    }
    
    @PostMapping
    public ResponseEntity<AdoptionFormMongo> submitAdoptionForm(@Valid @RequestBody AdoptionFormMongo form) {
        try {
            AdoptionFormMongo submittedForm = adoptionFormMongoService.submitAdoptionForm(form);
            return ResponseEntity.status(HttpStatus.CREATED).body(submittedForm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<AdoptionFormMongo> updateAdoptionFormStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            String comments = statusUpdate.getOrDefault("comments", "");
            AdoptionFormMongo updatedForm = adoptionFormMongoService.updateAdoptionFormStatus(id, status, comments);
            return ResponseEntity.ok(updatedForm);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptionForm(@PathVariable String id) {
        try {
            adoptionFormMongoService.deleteAdoptionForm(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
