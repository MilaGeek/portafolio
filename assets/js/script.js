// ==================== INICIALIZACIONES ====================

// AOS - Animate On Scroll
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typed.js - Typing Effect
const typed = new Typed('.typing-text', {
    strings: [
        'Desarrollador Full-Stack',
        'Diseñador Gráfico',
        'Especialista en Backend',
        'Experto en Frontend',
        'Innovador Tecnológico'
    ],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
    smartBackspace: true
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar-custom');
const navbarLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link en navbar
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Marcar link activo según scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navbarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 999;
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.style.display = 'flex';
        scrollButton.style.alignItems = 'center';
        scrollButton.style.justifyContent = 'center';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollButton.addEventListener('mouseover', () => {
    scrollButton.style.transform = 'translateY(-5px)';
    scrollButton.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
});

scrollButton.addEventListener('mouseout', () => {
    scrollButton.style.transform = 'translateY(0)';
    scrollButton.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
});


// ==================== SKILL BARS ANIMATION ====================
const skillBars = document.querySelectorAll('.skill-progress');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            
            setTimeout(() => {
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
                entry.target.style.width = width;
            }, 100);
            
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

skillBars.forEach(bar => observer.observe(bar));

// ==================== SMOOTH SCROLL PARA ENLACES ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const element = document.querySelector(href);
            const offsetTop = element.offsetTop - 80; // Compensar por navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Cerrar navbar si está abierto en móvil
            const navbar = document.querySelector('.navbar-collapse');
            if (navbar.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        }
    });
});

// ==================== TOOLTIP INITIALIZATION ====================
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// ==================== PARTICLE ANIMATION (OPCIONAL) ====================
// Crear efecto de partículas en el hero
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(240, 147, 251, 0.3), transparent);
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle 15s infinite ease-in-out;
            animation-delay: ${i * 2}s;
            z-index: 0;
        `;
        
        heroSection.appendChild(particle);
    }
}

// Agregar animación de partículas al CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(100px, -100px); }
        50% { transform: translate(-100px, 100px); }
        75% { transform: translate(100px, 100px); }
    }
`;
document.head.appendChild(style);

createParticles();

// ==================== PARALLAX EFFECT ====================
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        
        if (Math.abs(distance) < window.innerHeight) {
            element.style.transform = `translateY(${distance * 0.5}px)`;
        }
    });
});

// ==================== PÁGINA COMPLETAMENTE CARGADA ====================
window.addEventListener('load', () => {
    console.log('🚀 Portafolio cargado correctamente');
    
    // Agregar clase de animación
    document.body.classList.add('loaded');
});

// ==================== PERFORMANCE MONITORING ====================
// Medir performance
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⏱️ Tiempo de carga: ${pageLoadTime}ms`);
});

// ==================== DARK MODE TOGGLE (OPCIONAL) ====================
// Descomentar si quieres agregar dark mode
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    border: 2px solid #667eea;
    color: #667eea;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 998;
    transition: all 0.3s ease;
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Cargar preferencia de dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
*/

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE MESSAGES ====================
console.log('%c🎨 Portafolio de Luis Mila - Desarrollador Full-Stack', 'font-size: 18px; color: #667eea; font-weight: bold;');
console.log('%c📧 Email: luismilasteam@gmail.com', 'font-size: 14px; color: #764ba2;');
console.log('%c📱 WhatsApp: +58 412 8703034', 'font-size: 14px; color: #764ba2;');
console.log('%c💻 GitHub disponible en el portafolio', 'font-size: 14px; color: #764ba2;');
