// OM Properties - Main Script
document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hidePreloader = () => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scroll
        };

        // Hide when window loads
        window.addEventListener('load', hidePreloader);

        // Fallback: hide after 3 seconds anyway
        setTimeout(hidePreloader, 3000);
    }

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // 2. Smooth scroll for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('section, .property-card, .feature-item, .about-card');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // 4. Inner Property Card Slider Logic
    const sliderCards = document.querySelectorAll('.property-card[data-has-slider="true"]');
    
    sliderCards.forEach(card => {
        const track = card.querySelector('.inner-slider-track');
        if (!track) return;
        const images = track.querySelectorAll('img');
        const indicators = card.querySelectorAll('.slider-indicators span');
        let currentSlide = 0;
        const slideCount = images.length;

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slideCount;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        };

        // Auto slide every 3 seconds
        setInterval(nextSlide, 3000);
    });

    // 5. View All Properties Logic
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.project-category');
            const hiddenGrids = container.querySelectorAll('.hidden-properties');
            
            hiddenGrids.forEach(grid => {
                grid.classList.toggle('show');
            });

            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = `SHOW LESS <i class="fas fa-chevron-up"></i>`;
            } else {
                const category = this.textContent.includes('RESIDENTIAL') ? 'RESIDENTIAL' : 'COMMERCIAL';
                this.innerHTML = `VIEW ALL ${category} <i class="fas fa-chevron-down"></i>`;
            }
        });
    });

    // Expand all properties when clicking "Properties" in Navbar or Hero
    const propertiesLinks = document.querySelectorAll('a[href="#properties"]');
    propertiesLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.hidden-properties').forEach(grid => {
                grid.classList.add('show');
            });
            document.querySelectorAll('.view-all-btn').forEach(btn => {
                btn.classList.add('active');
                const btnText = btn.textContent.toUpperCase();
                const category = btnText.includes('RESIDENTIAL') ? 'RESIDENTIAL' : 'COMMERCIAL';
                btn.innerHTML = `SHOW LESS <i class="fas fa-chevron-up"></i>`;
            });
        });
    });

    // 6. Scroll to Top functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
    }
});
