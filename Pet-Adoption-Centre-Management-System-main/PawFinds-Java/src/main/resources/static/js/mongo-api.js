// MongoDB API Configuration for Adoption Forms
const MONGO_API = {
    adoptionForms: {
        getAll: () => `${API_BASE_URL}/mongo/adoption-forms`,
        getById: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}`,
        getByStatus: (status) => `${API_BASE_URL}/mongo/adoption-forms/status/${status}`,
        getByEmail: (email) => `${API_BASE_URL}/mongo/adoption-forms/email/${email}`,
        getByPetId: (petId) => `${API_BASE_URL}/mongo/adoption-forms/pet/${petId}`,
        create: () => `${API_BASE_URL}/mongo/adoption-forms`,
        updateStatus: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}/status`,
        delete: (id) => `${API_BASE_URL}/mongo/adoption-forms/${id}`
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MONGO_API };
}
