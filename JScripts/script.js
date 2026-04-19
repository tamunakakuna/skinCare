import { fetchProducts, renderProducts, allProducts } from './products.js';
import * as ui from './interface_logic.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');

    const products = await fetchProducts(productList);
    renderProducts(products, productList);

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
        renderProducts(filtered, productList);
    });

    ui.initFormValidation();
    ui.initScrollEffects();

    // ბურგერ მენიუს ლოგიკა
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Scroll to top
    const scrollBtn = document.getElementById("scrollToTop");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});