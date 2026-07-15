// Adoption Form JavaScript

let selectedPet = null;

// Load Pet Information
async function loadPetInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');
    
    if (!petId) {
        showNotification('No pet selected. Redirecting...', 'error');
        setTimeout(() => {
            window.location.href = 'pets.html';
        }, 2000);
        return;
    }

    try {
        selectedPet = await apiCall(API.pets.getById(petId));
        const petInfo = document.getElementById('petInfo');
        const imageUrl = selectedPet.imageUrl || getDefaultPetImage(selectedPet.petType);
        
        petInfo.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <img src="${imageUrl}" alt="${selectedPet.petName}" 
                     style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px;"
                     onerror="this.src='${getDefaultPetImage(selectedPet.petType)}'">
                <div>
                    <h3 style="margin-bottom: 0.5rem;">${selectedPet.petName}</h3>
                    <p style="margin: 0; color: #666;">
                        <i class="fas fa-paw"></i> ${selectedPet.petType} • 
                        ${selectedPet.breed} • 
                        ${selectedPet.age} years old • 
                        ${selectedPet.gender}
                    </p>
                    <p style="margin: 0.5rem 0 0; color: #666;">
                        <i class="fas fa-map-marker-alt"></i> ${selectedPet.location}
                    </p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading pet info:', error);
        showNotification('Failed to load pet information', 'error');
    }
}

// Toggle other pets details field
document.getElementById('hasOtherPets')?.addEventListener('change', (e) => {
    const detailsGroup = document.getElementById('otherPetsDetailsGroup');
    if (e.target.checked) {
        detailsGroup.style.display = 'block';
    } else {
        detailsGroup.style.display = 'none';
        document.getElementById('otherPetsDetails').value = '';
    }
});

// Handle form submission
document.getElementById('adoptionForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedPet) {
        showNotification('Pet information not loaded. Please try again.', 'error');
        return;
    }

    const formData = {
        adopterName: document.getElementById('adopterName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        occupation: document.getElementById('occupation').value,
        petId: selectedPet.id,
        petName: selectedPet.petName,
        reasonForAdoption: document.getElementById('reasonForAdoption').value,
        hasExperience: document.getElementById('hasExperience').checked,
        hasOtherPets: document.getElementById('hasOtherPets').checked,
        otherPetsDetails: document.getElementById('otherPetsDetails').value,
        hasYard: document.getElementById('hasYard').checked
    };

    try {
        // Use MongoDB endpoint to store adoption form
        await apiCall(API.adoptionFormsMongo.create(), {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        showNotification('Application submitted successfully! Your details are saved in MongoDB. We will review it and get back to you soon.', 'success');
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    } catch (error) {
        console.error('Error submitting adoption form:', error);
        showNotification('Failed to submit application. Please try again.', 'error');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPetInfo();
});
