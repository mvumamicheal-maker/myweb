/**
 * ICT251 Activity 3 - Main JavaScript Logic
 * Author: Micheal Mvuma (ID: 202500736)
 */

document.addEventListener('DOMContentLoaded', () => {

    // FEATURE 1: Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const isExpanded = navbar.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // FEATURE 2: Theme Switcher (Light / Dark)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
        });
    }

    // FEATURE 3: Project Search / Filter
    const filterButtons = document.querySelectorAll('.filter-btn:not(.reset)');
    const resetButton = document.getElementById('reset-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const filterMessage = document.getElementById('filter-message');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-filter');
            
            let visibleCount = 0;
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                filterMessage.style.display = 'block';
                filterMessage.textContent = 'No projects found matching this filter.';
            } else {
                filterMessage.style.display = 'none';
            }
        });
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0].classList.add('active');
            projectCards.forEach(card => card.style.display = 'block');
            filterMessage.style.display = 'none';
        });
    }

    // COMPULSORY FEATURE: Contact Form Validation & Local Preview
    const contactForm = document.getElementById('contact-form');
    const formPreview = document.getElementById('form-preview');
    const previewText = document.getElementById('preview-text');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Keep submission local

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            // Reset errors
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            formPreview.style.display = 'none';

            let isValid = true;

            // Validate Name (reject empty or whitespace-only)
            const nameVal = nameInput.value.trim();
            if (!nameVal) {
                nameError.textContent = 'Name cannot be empty or whitespace-only.';
                isValid = false;
            }

            // Validate Email format
            const emailVal = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailVal)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            // Validate Message (reject empty or whitespace-only)
            const messageVal = messageInput.value.trim();
            if (!messageVal) {
                messageError.textContent = 'Message cannot be empty or whitespace-only.';
                isValid = false;
            }

            // If valid, display local preview summary using textContent
            if (isValid) {
                formPreview.style.display = 'block';
                previewText.textContent = `Data successfully validated (Browser demonstration only). Name: ${nameVal}, Email: ${emailVal}, Message: "${messageVal}"`;
                contactForm.reset();
            }
        });
    }
});

