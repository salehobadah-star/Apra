/* ═══════════════════════════════════════════════════════
   APRAJITA KUMARI — PHYSIOTHERAPIST PORTFOLIO
   Interactive JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── PRELOADER ───
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 500);
        }, 1200);
    });

    // Safety fallback — remove preloader after 4s
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 500);
        }
    }, 4000);


    // ─── NAVBAR SCROLL EFFECT ───
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ─── MOBILE NAV TOGGLE ───
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ─── TYPING EFFECT ───
    const typedElement = document.getElementById('typedText');
    const typingStrings = [
        'Physiotherapist',
        'Orthopaedic Rehabilitation Specialist',
        'Neurological Rehabilitation Expert',
        'Sports Rehabilitation Specialist',
        'ICU / Critical Care Physiotherapist',
        'Paediatric Rehabilitation Therapist'
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentString = typingStrings[stringIndex];

        if (isDeleting) {
            typedElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentString.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentString.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % typingStrings.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();


    // ─── SCROLL REVEAL ANIMATIONS ───
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ─── SKILL BARS ANIMATION ───
    const skillFills = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillFills.forEach(fill => skillObserver.observe(fill));


    // ─── COUNTER ANIMATION ───
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    statNumbers.forEach(num => counterObserver.observe(num));


    // ─── HERO PARTICLES ───
    const particlesContainer = document.getElementById('heroParticles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(78, 205, 196, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Create subtle particles
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -50 - 10}px) scale(1.2);
                opacity: 0.6;
            }
            50% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -80 - 20}px) scale(0.8);
                opacity: 0.4;
            }
            75% {
                transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * -40 - 10}px) scale(1.1);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(particleStyle);


    // ─── SMOOTH SCROLL FOR NAV LINKS ───
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


    // ─── CONTACT FORM HANDLING ───
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const phone = document.getElementById('formPhone').value;
        const message = document.getElementById('formMessage').value;

        // Create mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        );

        window.location.href = `mailto:aprajitakumari445@gmail.com?subject=${subject}&body=${body}`;

        // Show success feedback
        const btn = contactForm.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i><span>Opening Email Client...</span>';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });


    // ─── PARALLAX EFFECT ON HERO ───
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (scrolled < window.innerHeight) {
            const overlay = hero.querySelector('.hero-bg-overlay');
            if (overlay) {
                overlay.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    }, { passive: true });


    // ─── TILT EFFECT ON PROFILE IMAGE ───
    const imageFrame = document.querySelector('.image-frame');

    if (imageFrame && window.innerWidth > 768) {
        imageFrame.addEventListener('mousemove', (e) => {
            const rect = imageFrame.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            imageFrame.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        });

        imageFrame.addEventListener('mouseleave', () => {
            imageFrame.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            imageFrame.style.transition = 'transform 0.5s ease';
        });

        imageFrame.addEventListener('mouseenter', () => {
            imageFrame.style.transition = 'none';
        });
    }


    // ─── NAVBAR LINK HOVER RIPPLE ───
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

});
