package com.pawfinds.adoption.repository;

import com.pawfinds.adoption.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByStatus(String status);
    List<Pet> findByPetType(String petType);
    List<Pet> findByPetTypeAndStatus(String petType, String status);
    List<Pet> findByOwnerEmail(String ownerEmail);
}
