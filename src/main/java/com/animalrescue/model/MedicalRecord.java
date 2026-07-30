package com.animalrescue.model;

import java.util.Date;

/**
 * Represents a medical record for a pet.
 * Follows Single Responsibility Principle by managing only medical record data.
 */
public class MedicalRecord {
    
    private int id;
    private int petId;
    private Date visitDate;
    private String diagnosis;
    private String treatment;
    private String veterinarianName;
    
    /**
     * Default constructor
     */
    public MedicalRecord() {
    }
    
    /**
     * Constructor with all parameters
     * 
     * @param id Medical record identifier
     * @param petId ID of the pet
     * @param visitDate Date of veterinary visit
     * @param diagnosis Medical diagnosis
     * @param treatment Treatment provided
     * @param veterinarianName Name of the veterinarian
     */
    public MedicalRecord(int id, int petId, Date visitDate, String diagnosis, String treatment, String veterinarianName) {
        this.id = id;
        this.petId = petId;
        this.visitDate = visitDate;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.veterinarianName = veterinarianName;
    }
    
    /**
     * Gets the medical record ID
     * 
     * @return medical record ID
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the medical record ID
     * 
     * @param id medical record ID
     */
    public void setId(int id) {
        this.id = id;
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
     * Gets the visit date
     * 
     * @return visit date
     */
    public Date getVisitDate() {
        return visitDate;
    }
    
    /**
     * Sets the visit date
     * 
     * @param visitDate visit date
     */
    public void setVisitDate(Date visitDate) {
        this.visitDate = visitDate;
    }
    
    /**
     * Gets the diagnosis
     * 
     * @return diagnosis
     */
    public String getDiagnosis() {
        return diagnosis;
    }
    
    /**
     * Sets the diagnosis
     * 
     * @param diagnosis diagnosis
     */
    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }
    
    /**
     * Gets the treatment
     * 
     * @return treatment
     */
    public String getTreatment() {
        return treatment;
    }
    
    /**
     * Sets the treatment
     * 
     * @param treatment treatment
     */
    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }
    
    /**
     * Gets the veterinarian name
     * 
     * @return veterinarian name
     */
    public String getVeterinarianName() {
        return veterinarianName;
    }
    
    /**
     * Sets the veterinarian name
     * 
     * @param veterinarianName veterinarian name
     */
    public void setVeterinarianName(String veterinarianName) {
        this.veterinarianName = veterinarianName;
    }
}
