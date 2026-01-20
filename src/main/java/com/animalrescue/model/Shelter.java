package com.animalrescue.model;

/**
 * Represents an animal shelter facility.
 * Follows Single Responsibility Principle by managing only shelter-related data.
 */
public class Shelter {
    
    private int id;
    private String name;
    private String address;
    private String phone;
    private String email;
    
    /**
     * Default constructor
     */
    public Shelter() {
    }
    
    /**
     * Constructor with all parameters
     * 
     * @param id Shelter identifier
     * @param name Shelter name
     * @param address Shelter address
     * @param phone Shelter phone number
     * @param email Shelter email
     */
    public Shelter(int id, String name, String address, String phone, String email) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
    
    /**
     * Gets the shelter ID
     * 
     * @return shelter ID
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the shelter ID
     * 
     * @param id shelter ID
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * Gets the shelter name
     * 
     * @return shelter name
     */
    public String getName() {
        return name;
    }
    
    /**
     * Sets the shelter name
     * 
     * @param name shelter name
     */
    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * Gets the shelter address
     * 
     * @return shelter address
     */
    public String getAddress() {
        return address;
    }
    
    /**
     * Sets the shelter address
     * 
     * @param address shelter address
     */
    public void setAddress(String address) {
        this.address = address;
    }
    
    /**
     * Gets the shelter phone number
     * 
     * @return shelter phone number
     */
    public String getPhone() {
        return phone;
    }
    
    /**
     * Sets the shelter phone number
     * 
     * @param phone shelter phone number
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    /**
     * Gets the shelter email
     * 
     * @return shelter email
     */
    public String getEmail() {
        return email;
    }
    
    /**
     * Sets the shelter email
     * 
     * @param email shelter email
     */
    public void setEmail(String email) {
        this.email = email;
    }
}
