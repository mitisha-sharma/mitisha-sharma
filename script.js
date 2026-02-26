// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Marketing Enthusiast', 'Memory Keeper'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

// Hover effect on links and buttons
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
        follower.style.borderColor = 'var(--accent)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = 'var(--accent)';
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a timeline item, add staggered animation
            if (entry.target.classList.contains('timeline-item')) {
                const items = document.querySelectorAll('.timeline-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
            
            // If it's a project card
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.timeline-item, .project-card, .about-text p, .stat-item, .achievement-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const speed = 0.5;
    
    hero.style.transform = `translateY(${scrolled * speed}px)`;
});

// Memory theme: Add a "memory" effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    document.querySelectorAll('.timeline-item, .project-card').forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('memory-active');
        }
    });
});

// Add "memory" particles on hover (optional effect)
document.querySelector('.hero-title .accent').addEventListener('mouseenter', (e) => {
    for (let i = 0; i < 5; i++) {
        createParticle(e);
    }
});

function createParticle(e) {
    const particle = document.createElement('span');
    particle.className = 'memory-particle';
    particle.innerHTML = '✦';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    particle.style.position = 'fixed';
    particle.style.color = 'var(--accent)';
    particle.style.fontSize = '1rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.animation = 'floatUp 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add CSS for particles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if you want to add hamburger menu later)
// For now, just console log that everything is working
console.log('Portfolio loaded with memory theme ✦');