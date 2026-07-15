// Services Page JavaScript

// Post Pet Modal Functions
function openPostPetModal() {
    document.getElementById('postPetModal').style.display = 'block';
}

function closePostPetModal() {
    document.getElementById('postPetModal').style.display = 'none';
    document.getElementById('postPetForm').reset();
}

// Handle Post Pet Form Submission
document.getElementById('postPetForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const petData = {
        petName: document.getElementById('petName').value,
        petType: document.getElementById('petType').value,
        breed: document.getElementById('breed').value,
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        description: document.getElementById('description').value,
        location: document.getElementById('location').value,
        ownerName: document.getElementById('ownerName').value,
        contactNumber: document.getElementById('contactNumber').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        imageUrl: document.getElementById('imageUrl').value,
        vaccinated: document.getElementById('vaccinated').checked,
        trained: document.getElementById('trained').checked,
        status: 'Available'
    };

    try {
        await apiCall(API.pets.create(), {
            method: 'POST',
            body: JSON.stringify(petData)
        });

        showNotification('Pet posted successfully! It will be visible after admin approval.', 'success');
        closePostPetModal();
        
        // Redirect to pets page after 2 seconds
        setTimeout(() => {
            window.location.href = 'pets.html';
        }, 2000);
    } catch (error) {
        console.error('Error posting pet:', error);
        showNotification('Failed to post pet. Please try again.', 'error');
    }
});

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById('postPetModal');
    if (event.target == modal) {
        closePostPetModal();
    }
};

// Check if user came from a specific service link
const hash = window.location.hash;
if (hash === '#post') {
    setTimeout(() => {
        openPostPetModal();
    }, 500);
}
