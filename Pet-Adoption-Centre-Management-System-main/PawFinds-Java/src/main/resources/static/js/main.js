// Main JavaScript for Home Page

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// Load Featured Pets
async function loadFeaturedPets() {
    const grid = document.getElementById('featuredPetsGrid');
    if (!grid) return;

    try {
        const pets = await apiCall(API.pets.getAvailable());
        
        if (pets.length === 0) {
            grid.innerHTML = '<div class="text-center"><p>No pets available at the moment.</p></div>';
            return;
        }

        // Show only first 6 pets
        const featuredPets = pets.slice(0, 6);
        
        grid.innerHTML = featuredPets.map(pet => createPetCard(pet)).join('');
        
        // Add click event to view details
        document.querySelectorAll('.view-pet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const petId = e.target.dataset.petId;
                window.location.href = `pets.html?id=${petId}`;
            });
        });

    } catch (error) {
        console.error('Error loading featured pets:', error);
        grid.innerHTML = '<div class="text-center"><p>Failed to load pets. Please try again later.</p></div>';
    }
}

// Create Pet Card HTML
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
                    <span><i class="fas fa-paw"></i> ${pet.petType}</span>
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
                        <i class="fas fa-eye"></i> View Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Load pets when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedPets();
});
