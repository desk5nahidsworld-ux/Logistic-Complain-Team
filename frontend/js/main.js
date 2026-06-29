// API Configuration
const API_URL = 'http://localhost:5000/api';

// Get Token from LocalStorage
function getToken() {
    return localStorage.getItem('token');
}

// Store Token
function setToken(token) {
    localStorage.setItem('token', token);
}

// Store User Data
function setUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

// Get User Data
function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check Authentication
function isAuthenticated() {
    return !!getToken();
}

// API Call with Auth
async function apiCall(endpoint, method = 'GET', data = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok && response.status === 401) {
            logout();
        }

        return { success: response.ok, data: result, status: response.status };
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Calculate Total
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
}

console.log('✅ Main.js loaded');
