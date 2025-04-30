document.addEventListener('DOMContentLoaded', function() {
    // Service Worker Registration (also in HTML for early registration)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/js/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
    
    // Initialize smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize tool/app iframes when links are clicked
    document.querySelectorAll('.app-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('/apps/') || 
                this.getAttribute('href').startsWith('/tools/')) {
                e.preventDefault();
                
                // Create overlay for the app/tool
                const overlay = document.createElement('div');
                overlay.className = 'app-overlay';
                overlay.innerHTML = `
                    <div class="app-container">
                        <button class="close-app">×</button>
                        <iframe src="${this.getAttribute('href')}" frameborder="0"></iframe>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                
                // Close button functionality
                overlay.querySelector('.close-app').addEventListener('click', () => {
                    document.body.removeChild(overlay);
                });
                
                // Close when clicking outside
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        document.body.removeChild(overlay);
                    }
                });
            }
        });
    });
    
    // Add styles for dynamically created elements
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .app-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9990;
            padding: 2rem;
        }
        
        .app-container {
            position: relative;
            width: 100%;
            max-width: 1200px;
            height: 80vh;
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
        }
        
        .app-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .close-app {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            border: none;
            background: var(--primary-color);
            color: white;
            border-radius: 50%;
            font-size: 1.5rem;
            line-height: 1;
            cursor: pointer;
            z-index: 1;
            transition: all 0.2s ease;
        }
        
        .close-app:hover {
            background: var(--secondary-color);
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(dynamicStyles);
});
