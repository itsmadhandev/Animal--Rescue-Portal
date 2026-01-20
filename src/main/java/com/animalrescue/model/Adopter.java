package com.animalrescue.model;

/**
 * Represents a person who wants to adopt a pet.
 * Follows Single Responsibility Principle by managing only adopter-related data.
 */
public class Adopter {
    
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    
    /**
     * Default constructor
     */
    public Adopter() {
    }
    
    /**
     * Constructor with all parameters
     * 
     * @param id Adopter identifier
     * @param firstName Adopter's first name
     * @param lastName Adopter's last name
     * @param email Adopter's email
     * @param phone Adopter's phone number
     * @param address Adopter's address
     */
    public Adopter(int id, String firstName, String lastName, String email, String phone, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
    
    /**
     * Gets the adopter ID
     * 
     * @return adopter ID
     */
    public int getId() {
        return id;
    }
    
    /**
     * Sets the adopter ID
     * 
     * @param id adopter ID
     */
    public void setId(int id) {
        this.id = id;
    }
    
    /**
     * Gets the adopter's first name
     * 
     * @return first name
     */
    public String getFirstName() {
        return firstName;
    }
    
    /**
     * Sets the adopter's first name
     * 
     * @param firstName first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    /**
     * Gets the adopter's last name
     * 
     * @return last name
     */
    public String getLastName() {
        return lastName;
    }
    
    /**
     * Sets the adopter's last name
     * 
     * @param lastName last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    /**
     * Gets the adopter's email
     * 
     * @return email
     */
    public String getEmail() {
        return email;
    }
    
    /**
     * Sets the adopter's email
     * 
     * @param email email
     */
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * Gets the adopter's phone number
     * 
     * @return phone number
     */
    public String getPhone() {
        return phone;
    }
    
    /**
     * Sets the adopter's phone number
     * 
     * @param phone phone number
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    /**
     * Gets the adopter's address
     * 
     * @return address
     */
    public String getAddress() {
        return address;
    }
    
    /**
     * Sets the adopter's address
     * 
     * @param address address
     */
    public void setAddress(String address) {
        this.address = address;
    }
}
