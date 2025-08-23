// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const hamburgers = navToggle.querySelectorAll('.hamburger');
            hamburgers.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const hamburgers = navToggle ? navToggle.querySelectorAll('.hamburger') : [];
                hamburgers.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const headerHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Hero CTA smooth scroll
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const headerHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === targetId) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(252, 252, 249, 0.98)';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            } else {
                navbar.style.backgroundColor = 'rgba(252, 252, 249, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightActiveNavLink);

    // Intersection Observer for Achievement Counters
    const achievementMetrics = document.querySelectorAll('.achievement-metric');
    let countersAnimated = false;

    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe the achievements section
    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
        achievementObserver.observe(achievementsSection);
    }

    // Counter Animation Function
    function animateCounters() {
        achievementMetrics.forEach((metric, index) => {
            const finalText = metric.textContent;
            const hasPercent = finalText.includes('%');
            const hasPlus = finalText.includes('+');
            
            let finalNumber;
            if (hasPercent) {
                finalNumber = parseInt(finalText.replace('%', ''));
            } else if (hasPlus) {
                finalNumber = parseInt(finalText.replace('+', ''));
            } else {
                finalNumber = parseInt(finalText) || 0;
            }

            if (finalNumber === 0) return;

            let currentNumber = 0;
            const increment = finalNumber / 50; // 50 frames for smooth animation
            const duration = 1500; // 1.5 seconds
            const stepTime = duration / 50;

            const timer = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }

                let displayText = Math.floor(currentNumber).toString();
                if (hasPercent) displayText += '%';
                if (hasPlus) displayText += '+';
                
                metric.textContent = displayText;
            }, stepTime);
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            let isValid = true;
            let errorMessages = [];
            
            if (!name) {
                isValid = false;
                errorMessages.push('Name is required.');
            }
            
            if (!email) {
                isValid = false;
                errorMessages.push('Email is required.');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessages.push('Please enter a valid email address.');
            }
            
            if (!message) {
                isValid = false;
                errorMessages.push('Message is required.');
            }
            
            // Show validation errors
            const existingError = document.querySelector('.form-error');
            if (existingError) {
                existingError.remove();
            }
            
            if (!isValid) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.style.cssText = `
                    background: var(--color-error);
                    color: white;
                    padding: var(--space-12);
                    border-radius: var(--radius-base);
                    margin-bottom: var(--space-16);
                    font-size: var(--font-size-sm);
                `;
                errorDiv.innerHTML = errorMessages.join('<br>');
                contactForm.insertBefore(errorDiv, contactForm.firstChild);
                return;
            }
            
            // Show success and reset form
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.style.cssText = `
                    background: var(--color-success);
                    color: white;
                    padding: var(--space-12);
                    border-radius: var(--radius-base);
                    margin-bottom: var(--space-16);
                    font-size: var(--font-size-sm);
                `;
                successDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                contactForm.insertBefore(successDiv, contactForm.firstChild);
                
                // Reset form
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successDiv.parentNode) {
                        successDiv.remove();
                    }
                }, 5000);
                
            }, 1500);
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Intersection Observer for Scroll Animations
    const animateOnScrollElements = document.querySelectorAll('.service-card, .portfolio-card, .video-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial states and observe elements
    animateOnScrollElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        scrollObserver.observe(element);
    });

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const hamburgers = navToggle ? navToggle.querySelectorAll('.hamburger') : [];
            hamburgers.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });

    // Handle form input focus states for better UX
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.classList.add('focused');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.classList.remove('focused');
            }
            
            // Add validation feedback
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--color-error)';
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--color-error)';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            // Reset border color when user starts typing
            this.style.borderColor = '';
        });
    });

    // Performance optimization: debounce scroll events
    let scrollTimer = null;
    
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimer);
                func(...args);
            };
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-heavy functions
    window.addEventListener('scroll', debounce(highlightActiveNavLink, 10));

    // Initialize active nav link on page load
    highlightActiveNavLink();
    
    console.log('Portfolio website initialized successfully!');
});