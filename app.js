// ================== LOGIN SYSTEM ==================
let currentUser = null;

function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    // Fake user accounts
    const users = {
        "customer@kenya.com": { name: "John Doe", role: "customer", password: "123456" },
        "seller@kenya.com": { name: "Mike Seller", role: "seller", password: "123456" }
    };

    const user = users ;

    if (user && user.password === password) {
        currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        if (user.role === "seller") {
            window.location.href = "seller-dashboard.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("Wrong email or password. Try these:\n\nCustomer: customer@kenya.com / 123456\nSeller: seller@kenya.com / 123456");
    }
}

// Check if user is already logged in
function checkLoginStatus() {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    window.location.href = "login.html";
}

function showLogin() {
    window.location.href = "login.html";
}

function goToProducts() {
    window.location.href = "products.html";
}

function goToSignup() {
    alert("Signup page will be added later");
}

// Run when page loads
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// Make functions available globally
window.handleLogin = handleLogin;
window.logout = logout;
window.showLogin = showLogin;
window.goToProducts = goToProducts;
window.goToSignup = goToSignup;
