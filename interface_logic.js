// ფორმის ვალიდაცია
export function initFormValidation() {
    const contactForm = document.getElementById('registration-form') || document.getElementById('contact-form');
    if (!contactForm) return;
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input[required]');
        let allFilled = [...inputs].every(input => input.value.trim() !== '');
        if (allFilled) {
            alert('ფორმა წარმატებით გაიგზავნა!');
            contactForm.reset();
        } else {
            alert('გთხოვთ შეავსოთ ყველა ველი!');
        }
    });
}

// ბურგერ მენიუ
export function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}

// სქროლის ეფექტები
export function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        const scrollBtn = document.getElementById('scrollToTop');
        if (window.scrollY > 100) {
            if (header) header.classList.add('scrolled');
            if (scrollBtn) scrollBtn.style.display = 'block';
        } else {
            if (header) header.classList.remove('scrolled');
            if (scrollBtn) scrollBtn.style.display = 'none';
        }
    });
}