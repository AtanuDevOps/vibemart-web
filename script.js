// Vibe Mart - Main JavaScript File

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Lightbox Functionality
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const productImages = document.querySelectorAll('.product-card img, .offer-card img');
    
    // Add click event to all product images
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Feedback Wall Functionality
    const feedbackForm = document.getElementById('submit-feedback');
    const feedbackWall = document.getElementById('feedback-wall');
    const feedbackName = document.getElementById('feedback-name');
    const feedbackMessage = document.getElementById('feedback-message');
    
    // Load existing feedback from localStorage if available
    loadFeedback();
    
    if (feedbackForm) {
        feedbackForm.addEventListener('click', function() {
            if (feedbackName.value.trim() === '' || feedbackMessage.value.trim() === '') {
                alert('Please enter your name and feedback message.');
                return;
            }
            
            // Create new feedback card
            addFeedback(feedbackName.value, feedbackMessage.value);
            
            // Clear form fields
            feedbackName.value = '';
            feedbackMessage.value = '';
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Function to add feedback to the wall
    function addFeedback(name, message) {
        // Create feedback card element
        const feedbackCard = document.createElement('div');
        feedbackCard.classList.add('feedback-card');
        
        // Add content to the card
        feedbackCard.innerHTML = `
            <h4>${name}</h4>
            <p>${message}</p>
        `;
        
        // Add to the wall
        feedbackWall.prepend(feedbackCard);
        
        // Save to localStorage
        saveFeedback();
    }
    
    // Function to save feedback to localStorage
    function saveFeedback() {
        const feedbackCards = document.querySelectorAll('.feedback-card');
        const feedbackData = [];
        
        feedbackCards.forEach(card => {
            const name = card.querySelector('h4').textContent;
            const message = card.querySelector('p').textContent;
            
            feedbackData.push({ name, message });
        });
        
        localStorage.setItem('vibeMartFeedback', JSON.stringify(feedbackData));
    }
    
    // Function to load feedback from localStorage
    function loadFeedback() {
        const savedFeedback = localStorage.getItem('vibeMartFeedback');
        
        if (savedFeedback && feedbackWall) {
            const feedbackData = JSON.parse(savedFeedback);
            
            feedbackData.forEach(item => {
                const feedbackCard = document.createElement('div');
                feedbackCard.classList.add('feedback-card');
                
                feedbackCard.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>${item.message}</p>
                `;
                
                feedbackWall.appendChild(feedbackCard);
            });
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Create images directory
// Note: This is just a placeholder comment as JavaScript running in the browser
// cannot create directories on the server. This would need to be done manually
// or through server-side code.