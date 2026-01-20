package com.animalrescue.model;

/**
 * Represents an animal available for adoption.
 * Follows Single Responsibility Principle by managing only pet-related data.
 */
public class Pet {
    
    private int id;
    private String name;
    private String species;
    private String breed;
    private int age;
    private String status; // "available" or "adopted"
    private int shelterId;
    
    /**
     * Default constructor
     */
    public Pet() {
    }
    
    /**
     * Constructor with all parameters
     * 
     * @param id Pet identifier
     * @param name Pet name
     * @param species Pet species (e.g., Dog, Cat)
     * @param breed Pet breed
     * @param age Pet age in years
     * @param status Pet status (available/adopted)
     * @param shelterId Shelter where pet is located
     */
    public Pet(int id, String name, String species, String breed, int age, String status, int shelterId) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.status = status;
        this.shelterId = shelterId;
    }
    
    /**
     * Gets the pet ID
     * 
     * @return pet ID
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the pet ID
     * 
     * @param id pet ID
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * Gets the pet name
     * 
     * @return pet name
     */
    public String getName() {
        return name;
    }
    
    /**
     * Sets the pet name
     * 
     * @param name pet name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the pet species
     * 
     * @return pet species
     */
    public String getSpecies() {
        return species;
    }
    
    /**
     * Sets the pet species
     * 
     * @param species pet species
     */
    public void setSpecies(String species) {
        this.species = species;
    }
    
    /**
     * Gets the pet breed
     * 
     * @return pet breed
     */
    public String getBreed() {
        return breed;
    }
    
    /**
     * Sets the pet breed
     * 
     * @param breed pet breed
     */
    public void setBreed(String breed) {
        this.breed = breed;
    }
    
    /**
     * Gets the pet age
     * 
     * @return pet age in years
     */
    public int getAge() {
        return age;
    }
    
    /**
     * Sets the pet age
     * 
     * @param age pet age in years
     */
    public void setAge(int age) {
        this.age = age;
    }
    
    /**
     * Gets the pet status
     * 
     * @return pet status
     */
    public String getStatus() {
        return status;
    }
    
    /**
     * Sets the pet status
     * 
     * @param status pet status (available/adopted)
     */
    public void setStatus(String status) {
        this.status = status;
    }
    
    /**
     * Gets the shelter ID where pet is located
     * 
     * @return shelter ID
     */
    public int getShelterId() {
        return shelterId;
    }
    
    /**
     * Sets the shelter ID where pet is located
     * 
     * @param shelterId shelter ID
     */
    public void setShelterId(int shelterId) {
        this.shelterId = shelterId;
    }
}
