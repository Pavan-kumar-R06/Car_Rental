let currentUser = null;
let currentSessionId = null;

function initAuth() {
    // Check for existing session
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
        fetch('/api/user', {
            headers: {
                'Authorization': `Bearer ${sessionId}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                currentUser = data.user;
                currentSessionId = sessionId;
                updateUIForAuth();
            }
        })
        .catch(() => {
            localStorage.removeItem('sessionId');
        });
    }
}

function login(email, password) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            currentSessionId = data.sessionId;
            localStorage.setItem('sessionId', data.sessionId);
            updateUIForAuth();
            return true;
        }
        return false;
    });
}

function register(name, email, password) {
    return fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            currentUser = data.user;
            currentSessionId = data.sessionId;
            localStorage.setItem('sessionId', data.sessionId);
            updateUIForAuth();
            return true;
        }
        return false;
    });
}

function logout() {
    if (currentSessionId) {
        fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: currentSessionId })
        });
    }
    currentUser = null;
    currentSessionId = null;
    localStorage.removeItem('sessionId');
    updateUIForAuth();
    window.location.href = '/';
}

function updateUIForAuth() {
    const authElements = document.querySelectorAll('.auth-dependent');
    authElements.forEach(el => {
        if (currentUser) {
            el.innerHTML = el.dataset.auth;
        } else {
            el.innerHTML = el.dataset.guest;
        }
    });
}

function isLoggedIn() {
    return currentUser !== null;
}

function getCurrentUser() {
    return currentUser;
}