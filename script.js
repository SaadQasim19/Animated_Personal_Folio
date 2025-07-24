// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.removeItem('theme');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        // Note: localStorage not available, would normally save theme preference
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stats')) {
                // Animate counters
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            if (entry.target.classList.contains('skills-bars')) {
                // Animate progress bars
                setTimeout(() => {
                    animateProgressBars();
                }, 300);
            }
        }
    });
}, observerOptions);

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.section-title, .stat-item, .skills-text, .skills-bars, .experience-card, .contact-info, .contact-form, .stats, .project-card');
    elementsToObserve.forEach(el => observer.observe(el));
    
    // Initialize background effects
    initBackgroundEffects();
    
    // Initialize project card interaction
    initProjectCardInteraction();
});

// Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Create loading effect
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        event.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Download CV Function
function downloadCV() {
    // Create a sample CV content
    try {
        const cvContent = `
CURRICULUM VITAE

Name: Muhammad Saad Qasim
Email: m.saadqasim7665@gmail.com
Phone: +92 303 5664437
Location: Kamra Cantt, Attock City, Pakistan

PROFESSIONAL SUMMARY
Passionate MERN Stack Developer with nearly 1 year of experience in building modern web applications. 
Proficient in JavaScript, React.js, Node.js, Express.js, and MongoDB. Strong foundation in both 
frontend and backend development with expertise in various UI frameworks and databases.

TECHNICAL SKILLS
• Frontend: HTML5, CSS3, JavaScript, React.js
• Backend: Node.js, Express.js, Python, Java
• Databases: MongoDB, MySQL
• UI Frameworks: Tailwind CSS, Bootstrap, Chakra UI, ShadCN , Chart.js , Moment.js and GSAP
• Tools & Technologies: Git, RESTful APIs, JWT Authentication

EXPERIENCE
MERN Stack Developer (2024 - Present)
• Developed responsive web applications using React.js and Node.js
• Built RESTful APIs with Express.js and MongoDB integration
• Implemented modern UI designs using various CSS frameworks
• Collaborated on 25+ projects with focus on user experience

PROJECTS
• E-commerce Platform - Full-stack application with CRUD operations and Api integration
• Banking Management System - React-based productivity application
• Gemini Clone - Gemini Clone with User Authentication
• Weather App - Real-time weather application with API integration

EDUCATION
Bachelor's Degree in Computer Science
Relevant coursework in Web Development, Database Management, Software Engineering

ACHIEVEMENTS
• 500+ GitHub commits demonstrating consistent coding practice
• Successfully completed 25+ web development projects
• Proficient in 10+ programming languages and frameworks
• Strong problem-solving and analytical skills

LANGUAGES
• English (Conversational)
• Urdu (Native)

INTERESTS
Web Development, Open Source Contribution, Machine Learning, UI/UX Design
        `;

        // Create and download the CV file
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Muhammad_Saad_Qasim_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading CV:', error);
        alert('Failed to download CV. Please try again or contact me directly.');
    }
}

// Add floating animation to hero elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
        element.style.animationDuration = `${8 + Math.random() * 4}s`;
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    addFloatingAnimation();
    
    // Add stagger effect to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger effect to experience cards
    const expCards = document.querySelectorAll('.experience-card');
    expCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle i');
    
    navLinks.classList.toggle('active');
    
    // Change hamburger to X and vice versa
    if (navLinks.classList.contains('active')) {
        mobileToggle.className = 'fas fa-times';
    } else {
        mobileToggle.className = 'fas fa-bars';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle i');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.className = 'fas fa-bars';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.className = 'fas fa-bars';
        }
    });
});

// Enhanced project card interaction for mobile
function initProjectCardInteraction() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    if (!supportsHover) {
        // Touch device - add click functionality
        projectCards.forEach(card => {
            let isExpanded = false;
            
            card.addEventListener('click', function(e) {
                // Don't expand if clicking on project links
                if (e.target.closest('.project-link')) {
                    return;
                }
                
                e.preventDefault();
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    isExpanded = false;
                } else {
                    // Close all other expanded cards
                    projectCards.forEach(otherCard => {
                        otherCard.classList.remove('expanded');
                    });
                    
                    card.classList.add('expanded');
                    isExpanded = true;
                }
            });
        });
    }
}

// Optimize animations for mobile
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const particles = document.querySelector('.floating-particles');
        
        if (particles) {
            particles.style.display = 'none';
        }
    }
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    // Close mobile menu on orientation change
    const mobileMenu = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle i');
    
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileToggle.className = 'fas fa-bars';
    }
    
    // Recalculate hero height
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
    }, 100);
});

// Optimize background effects for mobile
function initBackgroundEffects() {
    if (window.innerWidth > 768) {
        // createBackgroundGrid(); // Comment out if you don't want grid
        createFloatingParticles();
    } else {
        // Simplified version for mobile
        // createBackgroundGrid(); // Comment out if you don't want grid
        // Skip resource-intensive effects on mobile
    }
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        optimizeForMobile();
        
        if (window.innerWidth > 768) {
            const existingParticles = document.querySelector('.floating-particles');
            if (!existingParticles) {
                createFloatingParticles();
            }
        }
    }, 250);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    initProjectCardInteraction();
    // ... rest of existing initialization code
});

// Create background grid
// function createBackgroundGrid() {
//     const bgGrid = document.createElement('div');
//     bgGrid.className = 'bg-grid';
//     document.body.appendChild(bgGrid);
// }

// Create floating particles
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 25000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);
}



// Initialize background effects
function initBackgroundEffects() {
    createFloatingParticles();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundEffects();
});

// Enhanced project card interaction
function initProjectCardInteraction() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if device supports hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    if (!supportsHover) {
        // Touch device - add click functionality
        projectCards.forEach(card => {
            let isExpanded = false;
            
            card.addEventListener('click', function(e) {
                if (e.target.closest('.project-link')) {
                    return; // Allow normal link behavior
                }
                
                e.preventDefault();
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    isExpanded = false;
                } else {
                    // Close all other expanded cards
                    projectCards.forEach(otherCard => {
                        otherCard.classList.remove('expanded');
                    });
                    
                    card.classList.add('expanded');
                    isExpanded = true;
                }
            });
        });
    }
}