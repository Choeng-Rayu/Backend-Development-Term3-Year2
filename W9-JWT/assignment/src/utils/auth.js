// Decode JWT token without verification (for client-side use only)
function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const decoded = decodeToken(token);
        if (!decoded) return null;
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            return null;
        }
        
        return decoded;
    } catch (error) {
        localStorage.removeItem('token');
        return null;
    }
}

export function setToken(token) {
    localStorage.setItem('token', token);
    // Update API defaults for future requests
    import('../api.js').then(({ default: API }) => {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
}

export function getToken() {
    return localStorage.getItem('token');
}

export function logout() {
    localStorage.removeItem('token');
    // Remove authorization header
    import('../api.js').then(({ default: API }) => {
        delete API.defaults.headers.common['Authorization'];
    });
}