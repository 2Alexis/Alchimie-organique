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
    
    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('nav.mobile-nav'); // Cibler la nav principale

    if (burgerMenu && mobileNav) {
        burgerMenu.addEventListener('click', function() {
            // Basculer l'état actif du bouton burger
            burgerMenu.classList.toggle('active');
            // Basculer l'état actif du menu mobile
            mobileNav.classList.toggle('active');
            
            // Mettre à jour l'attribut aria-expanded pour l'accessibilité
            const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
            burgerMenu.setAttribute('aria-expanded', !isExpanded);

            // Optionnel : Bloquer le scroll du body quand le menu est ouvert
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Optionnel : Fermer le menu si on clique sur un lien
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('active')) {
                    burgerMenu.classList.remove('active');
                    mobileNav.classList.remove('active');
                    burgerMenu.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = ''; 
                }
            });
        });
    }
    
    // Animation des éléments au défilement (code existant)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Bouton retour en haut (code existant)
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mise à jour dynamique de l'année du copyright
    const copyrightYearElement = document.querySelector('.copyright p');
    if (copyrightYearElement) {
        const currentYear = new Date().getFullYear();
        // Remplacer l'année hardcodée par l'année actuelle
        copyrightYearElement.textContent = copyrightYearElement.textContent.replace(/© \d{4}/, `© ${currentYear}`);
    }
    
    // Fonction pour déterminer si on est sur mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    // Initialisation et gestion des descriptions en fonction de la taille d'écran
    function initializeDescriptions() {
        // Cibler tous les paragraphes/descriptions qui ont l'attribut data-full-description
        const descriptions = document.querySelectorAll('[data-full-description]');
        const toggleButtons = document.querySelectorAll('.toggle-description-btn'); // Utiliser la nouvelle classe
        
        // Cache tous les boutons par défaut
        toggleButtons.forEach(button => button.style.display = 'none');
        
        descriptions.forEach(description => {
            const fullText = description.getAttribute('data-full-description');
            const toggleBtn = description.parentElement.querySelector('.toggle-description-btn'); // Trouver le bouton associé
            
            if (!fullText) return;

            // Version mobile : texte tronqué
            if (isMobileDevice()) {
                if (fullText.length > 150) { // Seuil de troncature
                    description.textContent = fullText.substring(0, 150) + '...';
                    if (toggleBtn) toggleBtn.style.display = 'inline-block'; // Afficher bouton si texte long
                    if (toggleBtn) toggleBtn.textContent = 'Voir plus'; // Assurer texte initial
                    description.classList.remove('expanded'); // Assurer état initial
                } else {
                    description.textContent = fullText; // Texte court, pas besoin de bouton
                    if (toggleBtn) toggleBtn.style.display = 'none';
                }
            } 
            // Version desktop : texte complet
            else {
                description.textContent = fullText;
                if (toggleBtn) toggleBtn.style.display = 'none'; // Cacher bouton sur desktop
                description.classList.remove('expanded'); // Nettoyer classe si on redimensionne
            }
        });
    }
    
    // Gestion des boutons "Voir plus" (uniquement sur mobile)
    const toggleButtons = document.querySelectorAll('.toggle-description-btn'); // Utiliser la nouvelle classe
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!isMobileDevice()) return; // Ne rien faire sur desktop
            
            // Trouver tous les paragraphes à basculer dans le même conteneur parent
            const parentContainer = this.parentElement;
            const descriptionsToToggle = parentContainer.querySelectorAll('.description-toggleable[data-full-description]');
            
            if (this.textContent === 'Voir plus') {
                descriptionsToToggle.forEach(desc => {
                    const fullText = desc.getAttribute('data-full-description');
                    if (fullText) {
                        desc.textContent = fullText;
                        desc.classList.add('expanded');
                    }
                });
                this.textContent = 'Voir moins';
            } else {
                descriptionsToToggle.forEach(desc => {
                    const fullText = desc.getAttribute('data-full-description');
                    if (fullText && fullText.length > 150) {
                        desc.textContent = fullText.substring(0, 150) + '...';
                    }
                    desc.classList.remove('expanded');
                });
                this.textContent = 'Voir plus';
            }
        });
    });
    
    // Optimisation de la hauteur des images sur mobile
    function optimizeImagesForMobile() {
        const serviceImages = document.querySelectorAll('.service-image');
        
        serviceImages.forEach(img => {
            // Ajuster la hauteur en fonction de la taille de l'écran
            if (isMobileDevice()) {
                img.style.minHeight = '200px';
                img.style.maxHeight = '250px';
            } else {
                img.style.minHeight = '';
                img.style.maxHeight = '';
            }
        });
    }
    
    // Initialiser les descriptions et les images
    initializeDescriptions();
    optimizeImagesForMobile();
    
    // Réinitialiser lors du redimensionnement
    window.addEventListener('resize', function() {
        initializeDescriptions();
        optimizeImagesForMobile();
    });
}); 