function initAnimations() {
    // Initialize GSAP animations after page is loaded
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Text splitting and animation
    if (typeof Splitting === 'function') {
        Splitting();
        
        // Animate each character
        gsap.utils.toArray('[data-splitting]').forEach(section => {
            const chars = section.querySelectorAll('.char');
            
            gsap.from(chars, {
                duration: 0.8,
                opacity: 0,
                y: 20,
                stagger: 0.03,
                ease: 'back.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    // Scroll-triggered animations
    gsap.utils.toArray('[data-scroll]').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                onEnter: () => element.setAttribute('data-scroll', 'in'),
                onLeaveBack: () => element.setAttribute('data-scroll', 'out')
            }
        });
    });
    
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    gsap.from([heroTitle, heroSubtitle], {
        duration: 1.5,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Scroll indicator animation
    gsap.to('.scroll-line', {
        duration: 2,
        y: 20,
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // App cards animation
    const appCards = gsap.utils.toArray('.app-card');
    
    appCards.forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out'
        });
    });
    
    // Initialize custom cursor
    initCustomCursor();
}

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
    
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 0.5,
                    backgroundColor: 'white'
                });
                gsap.to(cursorFollower, {
                    scale: 1.5,
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'transparent'
                });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'var(--primary-color)'
                });
                gsap.to(cursorFollower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'var(--primary-color)'
                });
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}
