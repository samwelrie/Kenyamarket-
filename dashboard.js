// js/dashboard.js - Shared Dashboard Functions

function setupDashboard() {
    // Add Product
    document.querySelectorAll('#add-product-btn, #add-product-top').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                KenyaMarket.showToast("Product upload modal opened (Full form coming soon)");
            });
        }
    });

    // Delete buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            if (confirm("Delete this item?")) {
                e.target.closest('tr, .product-card').remove();
                KenyaMarket.showToast("Item deleted successfully");
            }
        }
    });
}

// Auto initialize
document.addEventListener('DOMContentLoaded', setupDashboard);
