// Contact Page JavaScript

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Since we don't have a contact endpoint in the backend,
    // we'll simulate the submission
    console.log('Contact form submitted:', formData);
    
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
});
