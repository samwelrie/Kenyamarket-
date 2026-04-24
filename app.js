function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "seller@kenya.com" && password === "123456") {
        localStorage.setItem("currentUser", JSON.stringify({ name: "Mike Seller", role: "seller" }));
        window.location.href = "seller-dashboard.html";
    } 
    else if (email === "customer@kenya.com" && password === "123456") {
        localStorage.setItem("currentUser", JSON.stringify({ name: "John Doe", role: "customer" }));
        window.location.href = "index.html";
    } 
    else {
        alert("Wrong email or password!\n\nUse:\nseller@kenya.com / 123456");
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Make the function available
window.handleLogin = handleLogin;
window.logout = logout;
