package com.animalrescue.model;

import java.util.Date;

/**
 * Represents an adoption application.
 * Follows Single Responsibility Principle by managing adoption application data and workflow logic.
 */
public class AdoptionApplication {
    
    private int id;
    private int adopterId;
    private int petId;
    private int shelterId;
    private Date applicationDate;
    private String status; // "pending", "approved", "rejected"
    
    /**
     * Default constructor
     */
    public AdoptionApplication() {
    }
    
    /**
     * Constructor with all parameters
     * 
     * @param id Application identifier
     * @param adopterId ID of the adopter
     * @param petId ID of the pet being adopted
     * @param shelterId ID of the shelter
     * @param applicationDate Date of application
     * @param status Application status (pending/approved/rejected)
     */
    public AdoptionApplication(int id, int adopterId, int petId, int shelterId, Date applicationDate, String status) {
        this.id = id;
        this.adopterId = adopterId;
        this.petId = petId;
        this.shelterId = shelterId;
        this.applicationDate = applicationDate;
        this.status = status;
    }
    
    /**
     * Gets the application ID
     * 
     * @return application ID
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the application ID
     * 
     * @param id application ID
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * Gets the adopter ID
     * 
     * @return adopter ID
     */
    public int getAdopterId() {
        return adopterId;
    }
    
    /**
     * Sets the adopter ID
     * 
     * @param adopterId adopter ID
     */
    public void setAdopterId(int adopterId) {
        this.adopterId = adopterId;
    }
    
    /**
     * Gets the pet ID
     * 
     * @return pet ID
     */
    public int getPetId() {
        return petId;
    }
    
    /**
     * Sets the pet ID
     * 
     * @param petId pet ID
     */
    public void setPetId(int petId) {
        this.petId = petId;
    }
    
    /**
     * Gets the shelter ID
     * 
     * @return shelter ID
     */
    public int getShelterId() {
        return shelterId;
    }
    
    /**
     * Sets the shelter ID
     * 
     * @param shelterId shelter ID
     */
    public void setShelterId(int shelterId) {
        this.shelterId = shelterId;
    }
    
    /**
     * Gets the application date
     * 
     * @return application date
     */
    public Date getApplicationDate() {
        return applicationDate;
    }
    
    /**
     * Sets the application date
     * 
     * @param applicationDate application date
     */
    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }
    
    /**
     * Gets the application status
     * 
     * @return application status
     */
    public String getStatus() {
        return status;
    }
    
    /**
     * Sets the application status
     * 
     * @param status application status (pending/approved/rejected)
     */
    public void setStatus(String status) {
        this.status = status;
    }
    
    /**
     * Checks if a pet is available for adoption.
     * A pet is available if its status is "available".
     * 
     * @param pet The pet to check availability for
     * @return true if the pet is available, false otherwise
     */
    public boolean isPetAvailable(Pet pet) {
        if (pet == null) {
            return false;
        }
        return "available".equalsIgnoreCase(pet.getStatus());
    }
}
