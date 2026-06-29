// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            address: document.getElementById('address').value
        };

        const result = await apiCall('/auth/register', 'POST', data);

        if (result.success) {
            setToken(result.data.token);
            setUserData(result.data.user);
            showToast('✅ রেজিস্ট্রেশন সফল', 'success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } else {
            showToast('❌ ' + (result.data.message || 'রেজিস্ট্রেশন ব্যর্থ'), 'danger');
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const result = await apiCall('/auth/login', 'POST', data);

        if (result.success) {
            setToken(result.data.token);
            setUserData(result.data.user);
            showToast('✅ লগইন সফল', 'success');
            setTimeout(() => window.location.href = 'index.html', 1500);
        } else {
            showToast('❌ ' + (result.data.message || 'লগইন ব্যর্থ'), 'danger');
        }
    });
}
