
export let allProducts = [];
export let totalItems = 0;

// API ფუნქცია
export async function fetchProducts(container) {
    try {
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
        const data = await response.json();
        
        allProducts.length = 0; 
        allProducts.push(...data.slice(0, 12)); 
        
        return allProducts; 
    } catch (error) {
        if (container) container.innerHTML = '<p>შეცდომა მონაცემების ჩატვირთვისას.</p>';
        throw error;
    }
}


export function renderProducts(products, container) {
    container.innerHTML = '';
    if (products.length === 0) {
        container.innerHTML = '<p>პროდუქტი ვერ მოიძებნა.</p>';
        return;
    }
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.price || '--.--'} $</p>
            <div class="cart-controls">
                <button class="add-btn" data-id="${product.id}">add</button>
                <span id="qty-${product.id}" class="product-qty">0</span>
                <button class="remove-btn" data-id="${product.id}">remove</button>
            </div>`;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('product-search');
    const cartCount = document.getElementById('cart-count'); // კალათის ციფრი

    
    const products = await fetchProducts(productList);
    renderProducts(products, productList);

    // კალათაში დამატების ლოგიკა (Event Delegation)
    productList.addEventListener('click', (e) => {
        // ვამოწმებ, დავაჭირეთ თუ არა add-btn კლასის მქონე ღილაკს
        if (e.target.classList.contains('add-btn')) {
            const productId = e.target.dataset.id;
            const qtySpan = document.getElementById(`qty-${productId}`);
            
            // რაოდენობის გაზრდა ვიზუალურად
            let currentQty = parseInt(qtySpan.textContent);
            qtySpan.textContent = currentQty + 1;

            // კალათის საერთო რაოდენობის განახლება
            let total = parseInt(cartCount.textContent);
            cartCount.textContent = total + 1;
        }

        // Remove ღილაკი
        if (e.target.classList.contains('remove-btn')) {
            const productId = e.target.dataset.id;
            const qtySpan = document.getElementById(`qty-${productId}`);
            let currentQty = parseInt(qtySpan.textContent);

            if (currentQty > 0) {
                qtySpan.textContent = currentQty - 1;
                let total = parseInt(cartCount.textContent);
                cartCount.textContent = total - 1;
            }
        }
    });

    // ძებნა...
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(searchTerm));
        renderProducts(filtered, productList);
    });

    ui.initFormValidation();
    ui.initBurgerMenu();
    ui.initScrollEffects();
});