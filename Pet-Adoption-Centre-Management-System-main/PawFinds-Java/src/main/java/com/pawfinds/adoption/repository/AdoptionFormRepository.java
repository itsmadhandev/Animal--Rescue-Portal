package com.pawfinds.adoption.repository;

import com.pawfinds.adoption.model.AdoptionForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdoptionFormRepository extends JpaRepository<AdoptionForm, Long> {
    List<AdoptionForm> findByStatus(String status);
    List<AdoptionForm> findByPetId(Integer petId);
    List<AdoptionForm> findByEmail(String email);
}
