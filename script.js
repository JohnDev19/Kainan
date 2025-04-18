        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('show');
            
            if (navLinks.classList.contains('show') && !document.querySelector('.mobile-location')) {
                const locationHTML = `
                    <div class="mobile-location">
                        <i class="bi bi-geo-alt-fill"></i>
                        <div class="mobile-location-text">123 Mabini Street, Makati City, Metro Manila</div>
                    </div>
                `;
                navLinks.insertAdjacentHTML('beforeend', locationHTML);
            }
            
                if (navLinks.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('show')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
            
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('show');
                    document.body.style.overflow = '';
                });
            });
        }

        // favorite button toggle
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const icon = btn.querySelector('i');
                
                if (btn.classList.contains('active')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                } else {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                }
            });
        });

        // Sticky hdr
        const header = document.querySelector('header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        const customFadeElements = document.querySelectorAll('[data-aos="custom-fade-up"], [data-aos="custom-fade-down"]');
        
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                } else {
                    if (!AOS.options.once) {
                        entry.target.classList.remove('aos-animate');
                    }
                }
            });
        }, observerOptions);
        
        customFadeElements.forEach(element => {
            observer.observe(element);
        });

        // smooth Scroll - Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // foem Validation
        const reservationForm = document.querySelector('.reservation-form');
        if (reservationForm) {
            reservationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // sample validation
                let isValid = true;
                const requiredFields = this.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // sample message only
                    alert('Reservation submitted successfully! We will contact you shortly to confirm.');
                    this.reset();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
        }

        document.head.insertAdjacentHTML('beforeend', `
<style>
.sticky {
    background-color: rgba(18, 18, 18, 0.95);
    padding: 10px 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.error {
    border-color: #ff3333 !important;
    box-shadow: 0 0 0 3px rgba(255, 51, 51, 0.1) !important;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #aaa;
}
</style>
`);