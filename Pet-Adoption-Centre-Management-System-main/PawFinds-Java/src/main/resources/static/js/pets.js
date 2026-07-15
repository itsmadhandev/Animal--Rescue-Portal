// Pets Page JavaScript

let allPets = [];
let filteredPets = [];

// Load all pets
async function loadAllPets() {
    const grid = document.getElementById('allPetsGrid');
    if (!grid) return;

    try {
        // Load all pets to show adopted status
        allPets = await apiCall(API.pets.getAll());
        filteredPets = [...allPets];
        displayPets(filteredPets);
    } catch (error) {
        console.error('Error loading pets:', error);
        grid.innerHTML = '<div class="text-center"><p>Failed to load pets. Please try again later.</p></div>';
    }
}

// Display pets
function displayPets(pets) {
    const grid = document.getElementById('allPetsGrid');
    
    if (pets.length === 0) {
        grid.innerHTML = '<div class="text-center"><p>No pets found matching your filters.</p></div>';
        return;
    }

    grid.innerHTML = pets.map(pet => createPetCard(pet)).join('');
    
    // Add click events
    document.querySelectorAll('.view-pet-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const petId = e.target.dataset.petId;
            showPetDetails(petId);
        });
    });

    document.querySelectorAll('.adopt-pet-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const petId = e.target.dataset.petId;
            openAdoptionForm(petId);
        });
    });
}

// Create Pet Card
function createPetCard(pet) {
    const imageUrl = pet.imageUrl || getDefaultPetImage(pet.petType);
    
    return `
        <div class="pet-card">
            <img src="${imageUrl}" alt="${pet.petName}" class="pet-card-image" 
                 onerror="this.src='${getDefaultPetImage(pet.petType)}'">
            <div class="pet-card-content">
                <div class="pet-card-header">
                    <h3>${pet.petName}</h3>
                    <span class="pet-status status-${pet.status.toLowerCase()}">${pet.status}</span>
                </div>
                <div class="pet-info">
                    <span><i class="fas fa-paw"></i> ${pet.breed}</span>
                    <span><i class="fas fa-calendar"></i> ${pet.age} years</span>
                    <span><i class="fas fa-${pet.gender === 'Male' ? 'mars' : 'venus'}"></i> ${pet.gender}</span>
                </div>
                <p class="pet-description">${pet.description || 'No description available'}</p>
                <div class="pet-tags">
                    <span class="pet-tag"><i class="fas fa-map-marker-alt"></i> ${pet.location}</span>
                    ${pet.vaccinated ? '<span class="pet-tag"><i class="fas fa-syringe"></i> Vaccinated</span>' : ''}
                    ${pet.trained ? '<span class="pet-tag"><i class="fas fa-graduation-cap"></i> Trained</span>' : ''}
                </div>
                <div class="pet-card-footer">
                    <button class="btn btn-primary view-pet-btn" data-pet-id="${pet.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    ${pet.status === 'Available' ? 
                        `<button class="btn btn-secondary adopt-pet-btn" data-pet-id="${pet.id}">
                            <i class="fas fa-heart"></i> Adopt
                        </button>` : 
                        `<button class="btn btn-disabled" disabled style="background: #95a5a6; cursor: not-allowed;">
                            <i class="fas fa-ban"></i> Not Available
                        </button>`
                    }
                </div>
            </div>
        </div>
    `;
}

// Apply filters
function applyFilters() {
    const petType = document.getElementById('petTypeFilter').value;
    const status = document.getElementById('statusFilter').value;
    const gender = document.getElementById('genderFilter').value;

    filteredPets = allPets.filter(pet => {
        const typeMatch = !petType || pet.petType === petType;
        const statusMatch = !status || pet.status === status;
        const genderMatch = !gender || pet.gender === gender;
        return typeMatch && statusMatch && genderMatch;
    });

    displayPets(filteredPets);
}

// Show pet details in modal
async function showPetDetails(petId) {
    try {
        const pet = await apiCall(API.pets.getById(petId));
        const modal = document.getElementById('petModal');
        const modalDetails = document.getElementById('modalPetDetails');
        
        const imageUrl = pet.imageUrl || getDefaultPetImage(pet.petType);
        
        modalDetails.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <img src="${imageUrl}" alt="${pet.petName}" 
                         style="width: 100%; border-radius: 15px;"
                         onerror="this.src='${getDefaultPetImage(pet.petType)}'">
                </div>
                <div>
                    <h2>${pet.petName}</h2>
                    <p><strong>Type:</strong> ${pet.petType}</p>
                    <p><strong>Breed:</strong> ${pet.breed}</p>
                    <p><strong>Age:</strong> ${pet.age} years</p>
                    <p><strong>Gender:</strong> ${pet.gender}</p>
                    <p><strong>Location:</strong> ${pet.location}</p>
                    <p><strong>Status:</strong> <span class="pet-status status-${pet.status.toLowerCase()}">${pet.status}</span></p>
                    <p><strong>Vaccinated:</strong> ${pet.vaccinated ? 'Yes' : 'No'}</p>
                    <p><strong>Trained:</strong> ${pet.trained ? 'Yes' : 'No'}</p>
                    <p><strong>Description:</strong><br>${pet.description || 'No description available'}</p>
                    <div style="margin-top: 2rem;">
                        <p><strong>Owner:</strong> ${pet.ownerName}</p>
                        <p><strong>Contact:</strong> ${pet.contactNumber}</p>
                        ${pet.ownerEmail ? `<p><strong>Email:</strong> ${pet.ownerEmail}</p>` : ''}
                    </div>
                    ${pet.status === 'Available' ? 
                        `<button class="btn btn-primary btn-block" onclick="openAdoptionForm(${pet.id})" style="margin-top: 2rem;">
                            <i class="fas fa-heart"></i> Adopt ${pet.petName}
                        </button>` : 
                        `<div style="margin-top: 2rem; padding: 1rem; background: #ffebee; border-radius: 8px; text-align: center;">
                            <i class="fas fa-heart" style="color: #e74c3c;"></i> 
                            <strong style="color: #c0392b;">This pet has been adopted!</strong>
                            <p style="margin-top: 0.5rem; color: #666;">Thank you for your interest. Please check other available pets.</p>
                        </div>`
                    }
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading pet details:', error);
        showNotification('Failed to load pet details', 'error');
    }
}

// Open adoption form
function openAdoptionForm(petId) {
    localStorage.setItem('adoptionPetId', petId);
    window.location.href = `adoption-form.html?petId=${petId}`;
}

// Close modal
const modal = document.getElementById('petModal');
const closeBtn = document.querySelector('.close');

if (closeBtn) {
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Check for specific pet in URL
const urlParams = new URLSearchParams(window.location.search);
const petId = urlParams.get('id');

if (petId) {
    showPetDetails(petId);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAllPets();
});
