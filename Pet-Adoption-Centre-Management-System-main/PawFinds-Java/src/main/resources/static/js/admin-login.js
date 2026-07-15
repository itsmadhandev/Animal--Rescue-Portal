// Admin Login JavaScript

// Show Register Form
function showRegisterForm() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('adminRegisterForm').reset();
}

// Handle Login Form
document.getElementById('adminLoginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await apiCall(API.admin.login(), {
            method: 'POST',
            body: JSON.stringify(credentials)
        });

        if (response.success) {
            // Store admin info in sessionStorage
            sessionStorage.setItem('adminUsername', response.username);
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            
            showNotification('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'admin-panel.html';
            }, 1500);
        } else {
            showNotification('Invalid username or password', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    }
});

// Handle Register Form
document.getElementById('adminRegisterForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    const adminData = {
        username: document.getElementById('regUsername').value,
        email: document.getElementById('regEmail').value,
        fullName: document.getElementById('regFullName').value,
        password: password
    };

    try {
        await apiCall(API.admin.register(), {
            method: 'POST',
            body: JSON.stringify(adminData)
        });

        showNotification('Registration successful! You can now login.', 'success');
        closeRegisterModal();
        
        // Fill login form with registered username
        document.getElementById('username').value = adminData.username;
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Username or email might already exist.', 'error');
    }
});

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById('registerModal');
    if (event.target == modal) {
        closeRegisterModal();
    }
};
