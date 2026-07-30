package com.animalrescue;

import com.animalrescue.model.Pet;
import com.animalrescue.model.Shelter;
import com.animalrescue.model.Adopter;
import com.animalrescue.model.AdoptionApplication;
import com.animalrescue.model.MedicalRecord;
import java.util.Date;

/**
 * Demonstration of the Animal Rescue Portal core classes.
 * Shows usage of Pet and AdoptionApplication with the isPetAvailable logic method.
 */
public class Demo {
    
    public static void main(String[] args) {
        // Create a shelter
        Shelter shelter = new Shelter(1, "Happy Paws Shelter", "123 Main St", "555-1234", "info@happypaws.com");
        System.out.println("Shelter created: " + shelter.getName());
        
        // Create pets
        Pet availablePet = new Pet(1, "Max", "Dog", "Golden Retriever", 3, "available", 1);
        Pet adoptedPet = new Pet(2, "Whiskers", "Cat", "Persian", 2, "adopted", 1);
        System.out.println("Pet created: " + availablePet.getName() + " - Status: " + availablePet.getStatus());
        System.out.println("Pet created: " + adoptedPet.getName() + " - Status: " + adoptedPet.getStatus());
        
        // Create an adopter
        Adopter adopter = new Adopter(1, "John", "Doe", "john.doe@email.com", "555-5678", "456 Oak Ave");
        System.out.println("Adopter created: " + adopter.getFirstName() + " " + adopter.getLastName());
        
        // Create an adoption application
        AdoptionApplication application = new AdoptionApplication(1, 1, 1, 1, new Date(), "pending");
        System.out.println("Application created with ID: " + application.getId());
        
        // Test the isPetAvailable logic method
        System.out.println("\n--- Testing isPetAvailable Method ---");
        System.out.println("Is " + availablePet.getName() + " available? " + application.isPetAvailable(availablePet));
        System.out.println("Is " + adoptedPet.getName() + " available? " + application.isPetAvailable(adoptedPet));
        System.out.println("Is null pet available? " + application.isPetAvailable(null));
        
        // Create a medical record
        MedicalRecord record = new MedicalRecord(1, 1, new Date(), "Annual checkup", "Vaccinations updated", "Dr. Smith");
        System.out.println("\nMedical record created for pet ID: " + record.getPetId());
        
        System.out.println("\nDemo completed successfully!");
    }
}
