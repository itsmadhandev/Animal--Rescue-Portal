package com.pawfinds.adoption.repository;

import com.pawfinds.adoption.model.AdoptionFormMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionFormMongoRepository extends MongoRepository<AdoptionFormMongo, String> {
    
    List<AdoptionFormMongo> findByStatus(String status);
    
    List<AdoptionFormMongo> findByEmail(String email);
    
    List<AdoptionFormMongo> findByPetId(Integer petId);
    
    List<AdoptionFormMongo> findByAdopterNameContainingIgnoreCase(String name);
}
