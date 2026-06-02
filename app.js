// ================== KenyaMarket - Core App.js ==================
// Cleaned, Organized & Navigation Ready

const KenyaMarket = {
    currentUser: null,

    init() {
        this.loadCurrentUser();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupGlobalSearch();
        this.setupGlobalButtons();
        console.log("✅ KenyaMarket Core Initialized");
    },

    // ===================== AUTHENTICATION =====================
    loadCurrentUser() {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUIBasedOnAuth();
        }
    },

    updateUIBasedOnAuth() {
        document.querySelectorAll('.logged-in').forEach(el => el.style.display = 'flex');
        document.querySelectorAll('.logged-out').forEach(el => el.style.display = 'none');
    },

    // ===================== NAVIGATION =====================
    navigateTo(page) {
        window.location.href = page;
    },

    setupNavigation() {
        // Support for data-nav attributes and normal links
        document.querySelectorAll('a[data-nav], button[data-nav]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const target = element.getAttribute('data-nav');
                if (target) this.navigateTo(target);
            });
        });
    },

    // ===================== MOBILE MENU =====================
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    },

    // ===================== SEARCH =====================
    setupGlobalSearch() {
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value.trim();
                    if (query) {
                        localStorage.setItem('km_search_query', query);
                        this.navigateTo('products.html');
                    }
                }
            });
        }
    },

    // ===================== AUTH & LOGOUT =====================
    login(email, password) {
        if (email === "seller@kenya.com" && password === "123456") {
            localStorage.setItem("currentUser", JSON.stringify({ 
                name: "Mike Seller", 
                role: "seller",
                email: email 
            }));
            window.location.href = "seller-dashboard.html";
        } 
        else if (email === "customer@kenya.com" && password === "123456") {
            localStorage.setItem("currentUser", JSON.stringify({ 
                name: "John Doe", 
                role: "customer",
                email: email 
            }));
            window.location.href = "index.html";
        } 
        else {
            alert("Wrong email or password!\n\nDemo Accounts:\nSeller: seller@kenya.com / 123456\nCustomer: customer@kenya.com / 123456");
        }
    },

    logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    },

    // ===================== HELPER =====================
    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.style.cssText = `
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white; padding: 14px 24px; border-radius: 8px;
            z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 2800);
    },

    setupGlobalButtons() {
        // All logout buttons
        document.querySelectorAll('.logout-btn, #logout-btn').forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });
    }
};

// ===================== INITIALIZE ON EVERY PAGE =====================
document.addEventListener('DOMContentLoaded', () => {
    KenyaMarket.init();
});

// Global access for backward compatibility with your old code
window.KenyaMarket = KenyaMarket;
window.handleLogin = (email, password) => KenyaMarket.login(email, password);
window.logout = () => KenyaMarket.logout();
window.showLogin = () => KenyaMarket.navigateTo('login.html');
window.toggleMenu = () => {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu) navMenu.classList.toggle("active");
    if (hamburger) hamburger.classList.toggle("active");
};
