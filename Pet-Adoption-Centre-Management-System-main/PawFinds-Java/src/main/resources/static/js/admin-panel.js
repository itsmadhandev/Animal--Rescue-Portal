// Admin Panel JavaScript

// Check if admin is logged in
function checkAdminAuth() {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn');
    const username = sessionStorage.getItem('adminUsername');
    
    if (!isLoggedIn || !username) {
        window.location.href = 'admin-login.html';
        return false;
    }
    
    document.getElementById('adminName').textContent = username;
    return true;
}

// Logout function
function logout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 1000);
}

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.admin-menu li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active class to clicked menu item
    event.target.closest('li').classList.add('active');
    
    // Load data for the section
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'pets':
            loadPetsTable();
            break;
        case 'adoptions':
            loadAdoptionRequests('Pending');
            break;
        case 'approved':
            loadAdoptionRequests('Approved');
            break;
        case 'adopted':
            loadAdoptionRequests('Adopted');
            break;
    }
}

// Load Dashboard
async function loadDashboard() {
    try {
        const [pets, adoptionForms] = await Promise.all([
            apiCall(API.pets.getAll()),
            apiCall(API.adoptionFormsMongo.getAll()) // MongoDB adoption forms
        ]);
        
        // Update dashboard cards
        document.getElementById('totalPets').textContent = pets.length;
        document.getElementById('availablePets').textContent = 
            pets.filter(p => p.status === 'Available').length;
        document.getElementById('adoptedPets').textContent = 
            pets.filter(p => p.status === 'Adopted').length;
        document.getElementById('pendingRequests').textContent = 
            adoptionForms.filter(f => f.status === 'Pending').length;
        
        // Load recent activities
        const recentActivities = document.getElementById('recentActivities');
        const recentForms = adoptionForms.slice(-5).reverse();
        
        if (recentForms.length === 0) {
            recentActivities.innerHTML = '<p>No recent activities</p>';
        } else {
            recentActivities.innerHTML = recentForms.map(form => `
                <div style="padding: 1rem; border-bottom: 1px solid #ECF0F1;">
                    <strong>${form.adopterName}</strong> applied to adopt <strong>${form.petName}</strong>
                    <br><small>${formatDate(form.submittedDate)}</small>
                    <br><span class="pet-status status-${form.status.toLowerCase()}">${form.status}</span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load Pets Table
async function loadPetsTable() {
    try {
        const pets = await apiCall(API.pets.getAll());
        const tbody = document.getElementById('petsTableBody');
        
        if (pets.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No pets found</td></tr>';
            return;
        }
        
        tbody.innerHTML = pets.map(pet => `
            <tr>
                <td>${pet.id}</td>
                <td>${pet.petName}</td>
                <td>${pet.petType}</td>
                <td>${pet.breed}</td>
                <td>${pet.age}</td>
                <td><span class="pet-status status-${pet.status.toLowerCase()}">${pet.status}</span></td>
                <td>${formatDate(pet.postedDate)}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="viewPetDetails(${pet.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deletePet(${pet.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading pets:', error);
    }
}

// Load Adoption Requests
async function loadAdoptionRequests(status) {
    try {
        // Fetch from MongoDB - customer adoption details are stored in MongoDB Compass
        const forms = await apiCall(API.adoptionFormsMongo.getByStatus(status));
        let tbody;
        
        if (status === 'Pending') {
            tbody = document.getElementById('adoptionsTableBody');
        } else if (status === 'Approved') {
            tbody = document.getElementById('approvedTableBody');
        } else {
            tbody = document.getElementById('adoptedTableBody');
        }
        
        if (forms.length === 0) {
            const colspan = status === 'Adopted' ? 5 : (status === 'Approved' ? 6 : 7);
            tbody.innerHTML = `<tr><td colspan="${colspan}" class="text-center">No ${status.toLowerCase()} requests found</td></tr>`;
            return;
        }
        
        if (status === 'Pending') {
            tbody.innerHTML = forms.map(form => `
                <tr>
                    <td>${form.id}</td>
                    <td>${form.adopterName}</td>
                    <td>${form.email}</td>
                    <td>${form.phone}</td>
                    <td>${form.petName}</td>
                    <td>${formatDate(form.submittedDate)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewFormDetails('${form.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-success btn-sm" onclick="updateFormStatus('${form.id}', 'Approved')">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="updateFormStatus('${form.id}', 'Rejected')">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </td>
                </tr>
            `).join('');
        } else if (status === 'Approved') {
            tbody.innerHTML = forms.map(form => `
                <tr>
                    <td>${form.id}</td>
                    <td>${form.adopterName}</td>
                    <td>${form.petName}</td>
                    <td>${formatDate(form.reviewedDate)}</td>
                    <td>${form.adminComments || 'N/A'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewFormDetails('${form.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-success btn-sm" onclick="updateFormStatus('${form.id}', 'Adopted')">
                            <i class="fas fa-heart"></i> Mark Adopted
                        </button>
                    </td>
                </tr>
            `).join('');
        } else {
            tbody.innerHTML = forms.map(form => `
                <tr>
                    <td>${form.id}</td>
                    <td>${form.adopterName}</td>
                    <td>${form.petName}</td>
                    <td>${formatDate(form.reviewedDate)}</td>
                    <td>${form.email}<br>${form.phone}</td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading adoption requests:', error);
    }
}

// View Pet Details
async function viewPetDetails(petId) {
    try {
        const pet = await apiCall(API.pets.getById(petId));
        const modal = document.getElementById('detailsModal');
        const modalDetails = document.getElementById('modalDetails');
        
        const imageUrl = pet.imageUrl || getDefaultPetImage(pet.petType);
        
        modalDetails.innerHTML = `
            <h2>Pet Details</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <img src="${imageUrl}" alt="${pet.petName}" 
                         style="width: 100%; border-radius: 10px;"
                         onerror="this.src='${getDefaultPetImage(pet.petType)}'">
                </div>
                <div>
                    <p><strong>Name:</strong> ${pet.petName}</p>
                    <p><strong>Type:</strong> ${pet.petType}</p>
                    <p><strong>Breed:</strong> ${pet.breed}</p>
                    <p><strong>Age:</strong> ${pet.age} years</p>
                    <p><strong>Gender:</strong> ${pet.gender}</p>
                    <p><strong>Location:</strong> ${pet.location}</p>
                    <p><strong>Status:</strong> ${pet.status}</p>
                    <p><strong>Vaccinated:</strong> ${pet.vaccinated ? 'Yes' : 'No'}</p>
                    <p><strong>Trained:</strong> ${pet.trained ? 'Yes' : 'No'}</p>
                    <p><strong>Description:</strong><br>${pet.description}</p>
                    <hr>
                    <p><strong>Owner:</strong> ${pet.ownerName}</p>
                    <p><strong>Contact:</strong> ${pet.contactNumber}</p>
                    ${pet.ownerEmail ? `<p><strong>Email:</strong> ${pet.ownerEmail}</p>` : ''}
                    <p><strong>Posted:</strong> ${formatDate(pet.postedDate)}</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading pet details:', error);
        showNotification('Failed to load pet details', 'error');
    }
}

// View Form Details
async function viewFormDetails(formId) {
    try {
        const form = await apiCall(API.adoptionFormsMongo.getById(formId));
        const modal = document.getElementById('detailsModal');
        const modalDetails = document.getElementById('modalDetails');
        
        modalDetails.innerHTML = `
            <h2>Adoption Form Details</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <h3>Adopter Information</h3>
                    <p><strong>Name:</strong> ${form.adopterName}</p>
                    <p><strong>Email:</strong> ${form.email}</p>
                    <p><strong>Phone:</strong> ${form.phone}</p>
                    <p><strong>Address:</strong> ${form.address}</p>
                    <p><strong>Occupation:</strong> ${form.occupation || 'N/A'}</p>
                </div>
                <div>
                    <h3>Pet Information</h3>
                    <p><strong>Pet Name:</strong> ${form.petName}</p>
                    <p><strong>Pet ID:</strong> ${form.petId}</p>
                    <p><strong>Status:</strong> <span class="pet-status status-${form.status.toLowerCase()}">${form.status}</span></p>
                    <p><strong>Submitted:</strong> ${formatDate(form.submittedDate)}</p>
                    ${form.reviewedDate ? `<p><strong>Reviewed:</strong> ${formatDate(form.reviewedDate)}</p>` : ''}
                </div>
            </div>
            <div style="margin-top: 1rem;">
                <h3>Additional Details</h3>
                <p><strong>Reason for Adoption:</strong><br>${form.reasonForAdoption || 'N/A'}</p>
                <p><strong>Has Experience with Pets:</strong> ${form.hasExperience ? 'Yes' : 'No'}</p>
                <p><strong>Has Other Pets:</strong> ${form.hasOtherPets ? 'Yes' : 'No'}</p>
                ${form.hasOtherPets && form.otherPetsDetails ? 
                    `<p><strong>Other Pets Details:</strong> ${form.otherPetsDetails}</p>` : ''}
                <p><strong>Has Yard:</strong> ${form.hasYard ? 'Yes' : 'No'}</p>
                ${form.adminComments ? `<p><strong>Admin Comments:</strong> ${form.adminComments}</p>` : ''}
            </div>
        `;
        
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading form details:', error);
        showNotification('Failed to load form details', 'error');
    }
}

// Update Form Status
async function updateFormStatus(formId, newStatus) {
    const comments = prompt(`Enter comments for ${newStatus} status:`);
    
    try {
        // Get the form details to know which pet was adopted
        const form = await apiCall(API.adoptionFormsMongo.getById(formId));
        
        // Update the adoption form status
        await apiCall(API.adoptionFormsMongo.updateStatus(formId), {
            method: 'PATCH',
            body: JSON.stringify({
                status: newStatus,
                comments: comments || ''
            })
        });
        
        // If marking as Adopted, also update the pet status
        if (newStatus === 'Adopted' && form.petId) {
            try {
                await apiCall(API.pets.updateStatus(form.petId), {
                    method: 'PATCH',
                    body: JSON.stringify({ status: 'Adopted' })
                });
                showNotification(`Pet marked as Adopted! It will now show as "Not Available" for others.`, 'success');
            } catch (petError) {
                console.error('Error updating pet status:', petError);
                showNotification('Form updated, but failed to update pet status', 'warning');
            }
        } else {
            showNotification(`Form ${newStatus} successfully!`, 'success');
        }
        
        // Reload the current section
        const activeSection = document.querySelector('.admin-section.active').id;
        if (activeSection === 'adoptions') {
            loadAdoptionRequests('Pending');
        } else if (activeSection === 'approved') {
            loadAdoptionRequests('Approved');
        } else if (activeSection === 'dashboard') {
            loadDashboard();
        }
    } catch (error) {
        console.error('Error updating form status:', error);
        showNotification('Failed to update form status', 'error');
    }
}

// Delete Pet
async function deletePet(petId) {
    if (!confirm('Are you sure you want to delete this pet?')) {
        return;
    }
    
    try {
        await apiCall(API.pets.delete(petId), {
            method: 'DELETE'
        });
        
        showNotification('Pet deleted successfully!', 'success');
        loadPetsTable();
    } catch (error) {
        console.error('Error deleting pet:', error);
        showNotification('Failed to delete pet', 'error');
    }
}

// Close Details Modal
function closeDetailsModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (checkAdminAuth()) {
        loadDashboard();
    }
});
