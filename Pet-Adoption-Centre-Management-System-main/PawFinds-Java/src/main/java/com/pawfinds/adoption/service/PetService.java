package com.pawfinds.adoption.service;

import com.pawfinds.adoption.model.Pet;
import com.pawfinds.adoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }
    
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    public List<Pet> getPetsByStatus(String status) {
        return petRepository.findByStatus(status);
    }
    
    public List<Pet> getPetsByType(String petType) {
        return petRepository.findByPetType(petType);
    }
    
    public List<Pet> getAvailablePetsByType(String petType) {
        return petRepository.findByPetTypeAndStatus(petType, "Available");
    }
    
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
    
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        
        pet.setPetName(petDetails.getPetName());
        pet.setPetType(petDetails.getPetType());
        pet.setBreed(petDetails.getBreed());
        pet.setAge(petDetails.getAge());
        pet.setGender(petDetails.getGender());
        pet.setDescription(petDetails.getDescription());
        pet.setLocation(petDetails.getLocation());
        pet.setContactNumber(petDetails.getContactNumber());
        pet.setImageUrl(petDetails.getImageUrl());
        pet.setStatus(petDetails.getStatus());
        pet.setVaccinated(petDetails.getVaccinated());
        pet.setTrained(petDetails.getTrained());
        
        return petRepository.save(pet);
    }
    
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
    
    public Pet updatePetStatus(Long id, String status) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
        pet.setStatus(status);
        return petRepository.save(pet);
    }
}
