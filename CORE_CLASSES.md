# Core Conceptual Classes and Relationships

## 5 Core Classes

### 1. Pet
- **Responsibility**: Represents an animal available for adoption
- **Attributes**: ID, name, species, breed, age, status (available/adopted)
- **Relationships**: 
  - Many-to-One with Shelter (a pet belongs to one shelter)
  - One-to-Many with AdoptionApplication (a pet can have multiple adoption applications)

### 2. Shelter
- **Responsibility**: Represents an animal shelter facility
- **Attributes**: ID, name, address, phone, email
- **Relationships**:
  - One-to-Many with Pet (a shelter can have multiple pets)
  - One-to-Many with AdoptionApplication (a shelter processes multiple applications)

### 3. Adopter
- **Responsibility**: Represents a person who wants to adopt a pet
- **Attributes**: ID, firstName, lastName, email, phone, address
- **Relationships**:
  - One-to-Many with AdoptionApplication (an adopter can submit multiple applications)

### 4. AdoptionApplication
- **Responsibility**: Manages the adoption application process and validates pet availability
- **Attributes**: ID, adopterId, petId, shelterId, applicationDate, status
- **Relationships**:
  - Many-to-One with Adopter (multiple applications from one adopter)
  - Many-to-One with Pet (multiple applications for one pet)
  - Many-to-One with Shelter (multiple applications to one shelter)

### 5. MedicalRecord
- **Responsibility**: Tracks health and medical history of pets
- **Attributes**: ID, petId, visitDate, diagnosis, treatment, veterinarianName
- **Relationships**:
  - Many-to-One with Pet (multiple medical records for one pet)

## Class Diagram Relationships

```
Shelter (1) ----< (Many) Pet
Shelter (1) ----< (Many) AdoptionApplication
Adopter (1) ----< (Many) AdoptionApplication
Pet (1) ----< (Many) AdoptionApplication
Pet (1) ----< (Many) MedicalRecord
```

## Single Responsibility Principle

Each class has a single, well-defined responsibility:
- **Pet**: Manages pet data and attributes
- **Shelter**: Manages shelter information
- **Adopter**: Manages adopter information
- **AdoptionApplication**: Manages application workflow and business logic (e.g., checking pet availability)
- **MedicalRecord**: Manages pet health records
