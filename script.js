// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    // Close mobile menu if open
    closeMobileMenu();
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    closeMobileMenu();
}

// Open external links
function openLink(url) {
    window.open(url, '_blank');
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Close mobile menu
function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    navMenu.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
}

// Back to top button visibility
function handleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for animations
function setupScrollAnimations() {
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.member-card, .feature-card, .branch-card, .stat-card, .rank-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.innerText;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/\d/g, '');
        
        let current = 0;
        const increment = numericTarget / 100;
        
        const updateCounter = () => {
            if (current < numericTarget) {
                current += increment;
                counter.innerText = Math.ceil(current) + suffix;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Parallax effect for hero section
function handleParallax() {
    const heroBackground = document.querySelector('.hero-background');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
}

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        const titleText = heroTitle.innerText;
        const subtitleText = heroSubtitle.innerText;
        
        setTimeout(() => {
            typeWriter(heroTitle, titleText, 150);
        }, 1000);
        
        setTimeout(() => {
            typeWriter(heroSubtitle, subtitleText, 100);
        }, 3000);
    }
}

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.rank-section, .feature-card, .branch-card, .stat-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Add CSS for reveal animation
function addRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .rank-section, .feature-card, .branch-card, .stat-card {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease;
        }
        
        .rank-section.active, .feature-card.active, .branch-card.active, .stat-card.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Preloader
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="griffin-logo">🐦‍🔥</div>
            <div class="loading-text">جاري تحميل مملكة Griffin...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    const preloaderStyles = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .griffin-logo {
            font-size: 4rem;
            margin-bottom: 20px;
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loading-text {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: #ccc;
        }
        
        .loading-bar {
            width: 300px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .loading-progress {
            height: 100%;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 2px;
            animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = preloaderStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show preloader
    showPreloader();
    
    // Add reveal styles
    addRevealStyles();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Animate counters
    animateCounters();
    
    // Initialize typing effect
    // initTypeWriter(); // Uncomment if you want typing effect
    
    // Event listeners
    window.addEventListener('scroll', function() {
        handleBackToTopButton();
        handleNavbarScroll();
        handleParallax();
        revealOnScroll();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Prevent default behavior for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.member-card, .feature-card, .branch-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Add ripple effect styles
    const rippleStyles = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .hero-btn, .member-btn, .branch-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    
    const rippleStyleSheet = document.createElement('style');
    rippleStyleSheet.textContent = rippleStyles;
    document.head.appendChild(rippleStyleSheet);
    
    // Add ripple effect to buttons
    document.querySelectorAll('.hero-btn, .member-btn, .branch-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    handleBackToTopButton();
    handleNavbarScroll();
    handleParallax();
    revealOnScroll();
}, 16)); // ~60fps

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow keys for navigation
    if (event.key === 'ArrowUp' && event.ctrlKey) {
        event.preventDefault();
        scrollToTop();
    }
});

// Touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
        } else {
            // Swipe down - could trigger some action
        }
    }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            this.alt = 'صورة غير متوفرة';
        });
    });
});

// Console welcome message
console.log(`
🐦‍🔥 مرحباً بك في مملكة Griffin! 🐦‍🔥

تم تطوير هذا الموقع بعناية فائقة
جميع الحقوق محفوظة © 2024

للمطورين: الموقع يستخدم HTML5, CSS3, و JavaScript الحديث
مع تقنيات متقدمة للأداء والتجاوب
`);

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

