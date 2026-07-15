// API Configuration
const API_BASE_URL = 'http://localhost:8081/api';

// API Endpoints
const API = {
    // Pet Endpoints
    pets: {
        getAll: () => `${API_BASE_URL}/pets`,
        getById: (id) => `${API_BASE_URL}/pets/${id}`,
        getByStatus: (status) => `${API_BASE_URL}/pets/status/${status}`,
        getByType: (type) => `${API_BASE_URL}/pets/type/${type}`,
        getAvailable: () => `${API_BASE_URL}/pets/available`,
        create: () => `${API_BASE_URL}/pets`,
        update: (id) => `${API_BASE_URL}/pets/${id}`,
        updateStatus: (id) => `${API_BASE_URL}/pets/${id}/status`,
        delete: (id) => `${API_BASE_URL}/pets/${id}`
    },
    
    // Adoption Form Endpoints (H2 Database)
    adoptionForms: {
        getAll: () => `${API_BASE_URL}/adoption-forms`,
        getById: (id) => `${API_BASE_URL}/adoption-forms/${id}`,
        getByStatus: (status) => `${API_BASE_URL}/adoption-forms/status/${status}`,
        create: () => `${API_BASE_URL}/adoption-forms`,
        updateStatus: (id) => `${API_BASE_URL}/adoption-forms/${id}/status`,
        delete: (id) => `${API_BASE_URL}/adoption-forms/${id}`
    },
    
    // Adoption Form Endpoints (MongoDB - Customer Details)
    adoptionFormsMongo: {
        getAll: () => `${API_BASE_URL}/mongo/adoption-forms`,
        getById: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}`,
        getByStatus: (status) => `${API_BASE_URL}/mongo/adoption-forms/status/${status}`,
        create: () => `${API_BASE_URL}/mongo/adoption-forms`,
        updateStatus: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}/status`,
        delete: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}`
    },
    
    // Admin Endpoints
    admin: {
        register: () => `${API_BASE_URL}/admin/register`,
        login: () => `${API_BASE_URL}/admin/login`,
        validate: (username) => `${API_BASE_URL}/admin/validate?username=${username}`
    }
};

// Helper function to make API calls
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get default pet image based on type
function getDefaultPetImage(petType) {
    const images = {
        'Dog': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
        'Cat': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500',
        'Bird': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500',
        'Rabbit': 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500',
        'Other': 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500'
    };
    return images[petType] || images['Other'];
}
