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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.section-title, .stat-item, .skills-text, .skills-bars, .experience-card, .contact-info, .contact-form, .stats, .project-card');
    elementsToObserve.forEach(el => observer.observe(el));
    
    // Debug: Check if project cards are found
    const projectCards = document.querySelectorAll('.project-card');
    console.log('Found project cards:', projectCards.length);
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
    try{

    
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
}
catch (error) {
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

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Typing effect for hero text (enhanced version)
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

// Add scroll-triggered animations for better performance
const scrollElements = document.querySelectorAll('.skill-item, .contact-item');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Background Interactive Boxes
function createBackgroundBoxes() {
  const bgBoxes = document.createElement('div');
  bgBoxes.className = 'bg-boxes';
  document.body.appendChild(bgBoxes);

  const boxes = [];
  const boxSize = 100;
  const cols = Math.ceil(window.innerWidth / boxSize);
  const rows = Math.ceil(window.innerHeight / boxSize);

  for (let i = 0; i < cols * rows; i++) {
    const box = document.createElement('div');
    box.className = 'bg-box';
    
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    box.style.left = `${col * boxSize}px`;
    box.style.top = `${row * boxSize}px`;
    
    bgBoxes.appendChild(box);
    boxes.push(box);
  }

  return boxes;
}

// Create background grid
function createBackgroundGrid() {
  const bgGrid = document.createElement('div');
  bgGrid.className = 'bg-grid';
  document.body.appendChild(bgGrid);
}

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

// Mouse interaction with background boxes
function initBackgroundInteraction() {
  const boxes = createBackgroundBoxes();
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    boxes.forEach((box, index) => {
      const rect = box.getBoundingClientRect();
      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - boxCenterX, 2) + Math.pow(mouseY - boxCenterY, 2)
      );

      if (distance < 150) {
        box.classList.add('active');
        
        // Add random activation to nearby boxes
        if (Math.random() > 0.7) {
          const randomIndex = Math.floor(Math.random() * boxes.length);
          const randomBox = boxes[randomIndex];
          const randomRect = randomBox.getBoundingClientRect();
          const randomDistance = Math.sqrt(
            Math.pow(mouseX - (randomRect.left + randomRect.width / 2), 2) + 
            Math.pow(mouseY - (randomRect.top + randomRect.height / 2), 2)
          );
          
          if (randomDistance < 300) {
            randomBox.classList.add('active');
            setTimeout(() => {
              randomBox.classList.remove('active');
            }, 1000);
          }
        }
      } else {
        box.classList.remove('active');
      }
    });
  });

  // Auto-animate some boxes randomly
  setInterval(() => {
    const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
    randomBox.classList.add('active');
    setTimeout(() => {
      randomBox.classList.remove('active');
    }, 2000);
  }, 3000);
}

// Initialize background effects
function initBackgroundEffects() {
  createBackgroundGrid();
  createFloatingParticles();
  initBackgroundInteraction();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // ...existing code...
  initBackgroundEffects();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Remove existing boxes
  const existingBoxes = document.querySelector('.bg-boxes');
  if (existingBoxes) {
    existingBoxes.remove();
  }
  
  // Recreate boxes with new dimensions
  setTimeout(() => {
    const boxes = createBackgroundBoxes();
    // Re-initialize interaction
    initBackgroundInteraction();
  }, 100);
});