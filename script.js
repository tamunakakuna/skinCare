import { fetchProducts, renderProducts, allProducts } from './products.js';
import * as ui from './interface_logic.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');

    // 1. პროდუქტების ჩატვირთვა
    const products = await fetchProducts(productList);
    renderProducts(products, productList);

    // 2. ძებნა 
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
        renderProducts(filtered, productList);
    });

    // UI ფუნქციების გაშვება
    ui.initFormValidation();
    ui.initBurgerMenu();
    ui.initScrollEffects();
});