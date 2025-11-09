// TrainingOS Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change icon based on menu state
            if (mainNav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .cta-button, .secondary-button').forEach(anchor => {
        if (anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Animation for pricing cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe pricing cards
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Animation for feature cards on scroll
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        featureObserver.observe(card);
    });

    // Animation for use case cards on scroll
    document.querySelectorAll('.use-case-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        featureObserver.observe(card);
    });

    // Sticky header with scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'var(--primary)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide header on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Pricing plan selection functionality
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('cta-button')) {
                // Remove featured class from all cards
                pricingCards.forEach(c => c.classList.remove('featured'));
                // Add featured class to clicked card
                this.classList.add('featured');
                
                // Scroll to CTA section if not already visible
                const ctaSection = document.querySelector('.cta-section');
                if (ctaSection) {
                    const ctaPosition = ctaSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = ctaPosition - 100;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form handling for demo requests (if forms are added later)
    const handleFormSubmission = (formId) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Simple validation
                let isValid = true;
                const requiredFields = this.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'red';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // Show loading state
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Show success message
                        alert('Thank you for your interest! Our team will contact you shortly.');
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                }
            });
        }
    };

    // Initialize form handling if forms exist
    handleFormSubmission('demo-form');

    // Counter animation for statistics (if added later)
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    };

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Chatbot integration enhancements
    const chatbotIframe = document.querySelector('.chatbot-container iframe');
    if (chatbotIframe) {
        // Add loading state for chatbot
        chatbotIframe.addEventListener('load', function() {
            this.style.opacity = '1';
            document.querySelector('.chatbot-container').classList.remove('loading');
        });
        
        chatbotIframe.addEventListener('error', function() {
            document.querySelector('.chatbot-container').innerHTML = `
                <div class="chatbot-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Chatbot Unavailable</h3>
                    <p>Our chatbot is currently unavailable. Please <a href="https://cal.com/partner-discovery/south-africa" target="_blank">schedule a call</a> with our team instead.</p>
                </div>
            `;
        });
    }

    // Enhanced button interactions
    const allButtons = document.querySelectorAll('.cta-button, .secondary-button');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Dynamic pricing calculator (if needed)
    const updatePricing = (employees, features) => {
        // Base pricing calculations
        const baseVideoPrice = 306000;
        const baseAvatarPrice = 144000;
        const baseAnnualPrice = 900000;
        
        // Adjust pricing based on inputs (simplified example)
        const employeeMultiplier = Math.max(1, employees / 100);
        const featureMultiplier = 1 + (features.length * 0.1);
        
        // Update displayed prices
        document.querySelectorAll('.price').forEach((priceElement, index) => {
            let newPrice;
            switch(index) {
                case 0: // Video Course Creation
                    newPrice = baseVideoPrice * employeeMultiplier;
                    break;
                case 1: // Interactive Avatar
                    newPrice = baseAvatarPrice * featureMultiplier;
                    break;
                case 2: // Annual Contract
                    newPrice = baseAnnualPrice * employeeMultiplier * featureMultiplier;
                    break;
            }
            priceElement.textContent = `R ${Math.round(newPrice).toLocaleString()}`;
        });
    };

    // Tab functionality for content sections (if needed)
    const initTabs = (containerClass) => {
        const tabContainers = document.querySelectorAll(`.${containerClass}`);
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab');
            const tabContents = container.querySelectorAll('.tab-content');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and contents
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding content
                    tab.classList.add('active');
                    const targetContent = container.querySelector(tab.getAttribute('data-tab'));
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        });
    };

    // Initialize tabs if they exist
    initTabs('tabs-container');

    // Newsletter subscription (if added)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                // Simulate subscription
                this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
            } else {
                this.querySelector('input[type="email"]').style.borderColor = 'red';
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Enhanced scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 99;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0)';
        }
    });

    // Add CSS for additional elements
    const additionalStyles = `
        .scroll-to-top:hover {
            transform: scale(1.1) !important;
            background: #1565c0 !important;
        }
        
        .chatbot-error {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 8px;
        }
        
        .chatbot-error i {
            font-size: 3rem;
            color: #ff9800;
            margin-bottom: 20px;
        }
        
        .success-message {
            color: #4caf50;
            font-weight: 500;
            text-align: center;
        }
        
        .tab.active {
            background: var(--accent);
            color: white;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        img.loaded {
            opacity: 1;
            transition: opacity 0.3s;
        }
        
        img:not(.loaded) {
            opacity: 0;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    console.log('TrainingOS JavaScript initialized successfully');
});

// Additional utility functions
const TrainingOSUtils = {
    // Format currency
    formatCurrency: (amount, currency = 'ZAR') => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Track user interactions (for analytics)
    trackEvent: (category, action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log(`Event tracked: ${category} - ${action} - ${label}`);
    }
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrainingOSUtils;
}