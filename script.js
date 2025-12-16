// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize all page functionality
function initializePage() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize word reveal on scroll
    initWordReveal();
    
    // Initialize scroll sections
    initScrollSections();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize scroll animations
    initScrollAnimations();
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2000);
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink(navLinks);
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink(navLinks) {
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    // Check each section
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });
    
    // Update active class on nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const icon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        
        // Change icon
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollProgressBar = scrollProgress.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    });
}

// Parallax effect for hero section
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
}

// Word reveal on scroll
function initWordReveal() {
    const words = document.querySelectorAll('.word');
    const wordReveal = document.getElementById('wordReveal');
    const totalWords = words.length;
    let currentWordIndex = 0;
    
    // Function to update active word
    function updateWord() {
        // Remove active class from all words
        words.forEach(word => {
            word.classList.remove('active');
        });
        
        // Add active class to current word
        words[currentWordIndex].classList.add('active');
        
        // Increment word index
        currentWordIndex = (currentWordIndex + 1) % totalWords;
    }
    
    // Initial word
    updateWord();
    
    // Update word on scroll
    let lastScrollY = window.scrollY;
    let scrollThreshold = 100; // Change word every 100px of scrolling
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
        
        if (scrollDelta >= scrollThreshold) {
            updateWord();
            lastScrollY = scrollY;
        }
    });
    
    // Also update word on timer for users who don't scroll immediately
    setInterval(updateWord, 3000);
}

// Scroll sections with image/text reveal
function initScrollSections() {
    const scrollSections = document.querySelectorAll('.scroll-section');
    
    // Create Intersection Observer for scroll sections
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Update body background color based on section
                const bgColor = entry.target.getAttribute('data-bg-color');
                if (bgColor) {
                    document.body.style.backgroundColor = bgColor;
                }
            }
        });
    }, observerOptions);
    
    // Observe each scroll section
    scrollSections.forEach(section => {
        observer.observe(section);
    });
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                showFormMessage('Thank you for subscribing to ZURI. Welcome to our exclusive circle.', 'success');
                emailInput.value = '';
                submitBtn.textContent = 'Subscribe';
                submitBtn.disabled = false;
                
                // Log subscription
                console.log(`New subscription: ${email}`);
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing message if present
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.padding = '1rem';
    messageEl.style.marginTop = '1rem';
    messageEl.style.borderRadius = 'var(--radius)';
    messageEl.style.textAlign = 'center';
    messageEl.style.fontWeight = '500';
    
    if (type === 'success') {
        messageEl.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
        messageEl.style.color = '#48bb78';
        messageEl.style.border = '1px solid #48bb78';
    } else {
        messageEl.style.backgroundColor = 'rgba(245, 101, 101, 0.1)';
        messageEl.style.color = '#f56565';
        messageEl.style.border = '1px solid #f56565';
    }
    
    // Add to newsletter form
    const newsletterContent = document.querySelector('.newsletter-content');
    newsletterContent.appendChild(messageEl);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll animations for elements
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.collection-card, .scroll-section-text, .scroll-section-image');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-up {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-up.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .collection-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .collection-card:nth-child(3) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
}

// Collection card hover animations
document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
    });
});