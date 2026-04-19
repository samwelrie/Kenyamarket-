// Toggle Hamburger Menu
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
}

// Navigation functions
function showLogin() {
    window.location.href = "login.html";
}

function goToProducts() {
    window.location.href = "products.html";
}

// Close menu when clicking a link (for mobile)
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("navMenu");
            if (menu) menu.classList.remove("active");
        });
    });
});
