// js/app.js
const API_BASE = "https://kenyamarket-backend.onrender.com";

const KenyaMarket = {
    currentUser: null,

    init() {
        this.loadCurrentUser();
        this.setupNavigation();
        console.log("✅ KenyaMarket connected to backend");
    },

    loadCurrentUser() {
        const user = localStorage.getItem('currentUser');
        if (user) this.currentUser = JSON.parse(user);
    },

    navigateTo(page) {
        window.location.href = page;
    },

    async login(email, password) {
        try {
            const res = await fetch(`${API_BASE}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                this.currentUser = data.user;
                window.location.href = data.user.role === 'seller' ? 'seller-dashboard.html' : 'customer-dashboard.html';
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            alert("Backend error. Using demo mode.");
            // Fallback
            const role = email.includes("seller") ? "seller" : "customer";
            localStorage.setItem('currentUser', JSON.stringify({ name: email.split('@')[0], role }));
            window.location.href = role === 'seller' ? 'seller-dashboard.html' : 'index.html';
        }
    },

    logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1f2937;color:white;padding:14px 24px;border-radius:12px;z-index:9999;';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => KenyaMarket.init());
window.KenyaMarket = KenyaMarket;
