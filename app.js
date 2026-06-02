// ================== KenyaMarket - Core App.js ==================

const KenyaMarket = {
    currentUser: null,

    init() {
        this.loadCurrentUser();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupGlobalButtons();
        console.log("✅ KenyaMarket initialized successfully");
    },

    loadCurrentUser() {
        const userData = localStorage.getItem("currentUser");
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUIBasedOnAuth();
        }
    },

    updateUIBasedOnAuth() {
        // Show/hide elements based on login status
        document.querySelectorAll('.logged-in').forEach(el => {
            el.style.display = this.currentUser ? 'flex' : 'none';
        });
        document.querySelectorAll('.logged-out').forEach(el => {
            el.style.display = this.currentUser ? 'none' : 'flex';
        });
    },

    // ===================== NAVIGATION =====================
    navigateTo(page) {
        window.location.href = page;
    },

    setupNavigation() {
        // All links with data-nav attribute
        document.querySelectorAll('a[data-nav], button[data-nav]').forEach(element => {
            element.addEventListener('click', (e) => {
                const targetPage = element.getAttribute('data-nav');
                if (targetPage) {
                    this.navigateTo(targetPage);
                }
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

    // ===================== AUTH =====================
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

    // ===================== HELPER FUNCTIONS =====================
    showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    },

    setupGlobalButtons() {
        // Logout buttons
        document.querySelectorAll('.logout-btn, #logout-btn').forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });
    }
};

// ===================== INITIALIZE =====================
document.addEventListener('DOMContentLoaded', () => {
    KenyaMarket.init();
});

// Make some functions globally available for backward compatibility
window.KenyaMarket = KenyaMarket;
window.logout = () => KenyaMarket.logout();
window.toggleMenu = () => {
    const navMenu = document.getElementById("navMenu");
    const hamburger = document.getElementById("hamburger");
    if (navMenu) navMenu.classList.toggle("active");
    if (hamburger) hamburger.classList.toggle("active");
};
