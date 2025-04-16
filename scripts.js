document.addEventListener('DOMContentLoaded', function() {
    
    // Gérer le comportement du menu fixe au défilement
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    // Appliquer les styles noirs immédiatement
    if (header) {
        header.style.backgroundColor = '#121212';
        
        // Tous les liens de navigation
        const navLinks = header.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.style.color = '#f5f5f5';
        });
        
        // Le logo
        const logoText = header.querySelector('.logo h1');
        if (logoText) {
            logoText.style.color = '#9370db';
        }
        
        // Intervalle qui force la couleur noire toutes les 100ms
        setInterval(() => {
            header.style.backgroundColor = '#121212';
            navLinks.forEach(link => {
                link.style.color = '#f5f5f5';
            });
            if (logoText) {
                logoText.style.color = '#9370db';
            }
        }, 100);
    }
    
    if (header && heroSection) {
        // Ajouter une classe au header lors du défilement
        window.addEventListener('scroll', function() {
            // Forcer le style noir quelle que soit la position
            header.style.backgroundColor = '#121212';
            
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                
                // Force le style de fond noir en cas de problème
                header.style.backgroundColor = '#121212';
                
                // Force les liens à rester en couleur claire
                const navLinks = header.querySelectorAll('nav ul li a');
                navLinks.forEach(link => {
                    link.style.color = '#f5f5f5';
                });
                
                // Force le logo à rester en violet
                const logoText = header.querySelector('.logo h1');
                if (logoText) {
                    logoText.style.color = '#9370db';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.backgroundColor = '#121212';
            }
        });
        
        // Ajuster le padding du hero en fonction de la hauteur du header
        function adjustHeroPadding() {
            const headerHeight = header.offsetHeight;
            heroSection.style.marginTop = `${headerHeight}px`;
        }
        
        // Appeler une fois au chargement et lors du redimensionnement
        adjustHeroPadding();
        window.addEventListener('resize', adjustHeroPadding);
    }
    
    // Animation au défilement avec Intersection Observer
    const animatedElements = document.querySelectorAll('.feature, .testimonial, .cta');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animate');
        });
    }
    
    // Ajouter un bouton "retour en haut"
    addBackToTopButton();
    
    function addBackToTopButton() {
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Retour en haut');
        
        // Ajouter au DOM
        document.body.appendChild(button);
        
        // Gérer la visibilité
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });
        
        // Gérer le clic
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 