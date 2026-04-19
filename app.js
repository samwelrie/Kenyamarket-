// Navigation
function showLogin() {
    window.location.href = "login.html";
}

function goToProducts() {
    window.location.href = "products.html";
}

// Login & Signup
function login() {
    const email = document.getElementById("email").value.trim();
    if (email) {
        alert("✅ Login successful!\nWelcome to Kenya Market.");
        window.location.href = "products.html";
    } else {
        alert("Please enter your email address");
    }
}

function signup() {
    const email = document.getElementById("email").value.trim();
    if (email) {
        alert("✅ Account created successfully!\nYou can now browse products.");
        window.location.href = "products.html";
    } else {
        alert("Please enter your email address");
    }
}

// Search functionality (for products.html)
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    
    if (searchBar) {
        searchBar.addEventListener("keyup", function() {
            const term = this.value.toLowerCase();
            const productCards = document.querySelectorAll(".product-card");
            
            productCards.forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                card.style.display = title.includes(term) ? "block" : "none";
            });
        });
    }
});
