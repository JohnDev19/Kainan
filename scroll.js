document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollThreshold = 10;
    
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            // Scrolling down
            header.classList.add('scroll-down');
            header.classList.remove('scroll-up');
        } else if (currentScrollTop < lastScrollTop) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        if (currentScrollTop === 0) {
            header.classList.remove('scroll-up');
            header.classList.remove('scroll-down');
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
});