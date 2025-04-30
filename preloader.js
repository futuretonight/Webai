document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.preloader-progress-bar');
    const mainContent = document.querySelector('.main-content');
    
    // Simulate loading progress (replace with actual loading logic)
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finishLoading();
        }
        progressBar.style.width = `${progress}%`;
    }, 100);
    
    // Actual loading logic could check for:
    // - Images loaded
    // - Fonts loaded
    // - Critical JS executed
    function checkAssetsLoaded() {
        return Promise.all([
            loadImages(),
            loadFonts(),
            loadCriticalJS()
        ]);
    }
    
    function loadImages() {
        return new Promise((resolve) => {
            const images = document.querySelectorAll('img');
            let loaded = 0;
            
            if (images.length === 0) return resolve();
            
            images.forEach(img => {
                if (img.complete) {
                    loaded++;
                } else {
                    img.addEventListener('load', () => {
                        loaded++;
                        if (loaded === images.length) resolve();
                    });
                    img.addEventListener('error', () => {
                        loaded++;
                        if (loaded === images.length) resolve();
                    });
                }
            });
            
            if (loaded === images.length) resolve();
        });
    }
    
    function loadFonts() {
        return document.fonts ? document.fonts.ready : Promise.resolve();
    }
    
    function loadCriticalJS() {
        return Promise.resolve();
    }
    
    function finishLoading() {
        // Check if all assets are actually loaded
        checkAssetsLoaded().then(() => {
            // Add loaded class to preloader
            preloader.classList.add('loaded');
            
            // Show main content with GSAP animation
            gsap.to(mainContent, {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    // Initialize animations after content is visible
                    initAnimations();
                }
            });
            
            // Remove preloader from DOM after animation completes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });
    }
});
