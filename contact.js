document.addEventListener('DOMContentLoaded', function() {
    // Récupérer le formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    // Capturer le bouton et son état initial ICI, au chargement du DOM
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
    const originalButtonHtml = submitButton ? submitButton.innerHTML : '';
    
    if (contactForm && submitButton) { // Vérifier que les deux existent
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validation des champs requis
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const inquiryType = contactForm.querySelector('select[name="inquiry_type"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;
            const privacyCheckbox = contactForm.querySelector('input[name="privacy"]').checked;
            
            if (!name || !email || !inquiryType || !message || !privacyCheckbox) {
                showNotification('Veuillez remplir tous les champs requis et accepter la politique de confidentialité.', 'error');
                highlightEmptyFields();
                return;
            }

            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            try {
                // Afficher l'indicateur de chargement
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="loading"></span> Envoi en cours...';

                // Préparer les données pour Formspree
                const formData = new FormData(contactForm);
                const formAction = contactForm.action; // Récupère l'URL de Formspree depuis l'attribut action

                // Envoyer les données à Formspree via fetch (AJAX)
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Important pour que Formspree retourne du JSON
                    }
                });

                if (response.ok) {
                    // Succès
                    showNotification('Votre message a été envoyé avec succès !', 'success');
                    contactForm.reset();
                } else {
                    // Essayer de lire l'erreur de Formspree
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        const errorMessage = data["errors"].map(error => error["message"]).join(", ");
                        showNotification(`Erreur: ${errorMessage}`, 'error');
                    } else {
                         showNotification('Une erreur est survenue lors de l\'envoi. (' + response.status + ')', 'error');
                    }
                     console.error('Erreur Formspree:', data);
                }

            } catch (error) {
                // Erreur réseau ou autre
                console.error('Erreur lors de l\'envoi du formulaire:', error);
                showNotification('Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.', 'error');
            } finally {
                // Réinitialiser le bouton dans tous les cas
                submitButton.disabled = false;
                submitButton.innerHTML = ''; 
                submitButton.innerHTML = originalButtonHtml; 
            }
        });
    }
    
    // Fonction pour mettre en évidence les champs vides
    function highlightEmptyFields() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            let isEmpty = false;
            if (field.type === 'checkbox') {
                isEmpty = !field.checked;
            } else if (field.tagName === 'SELECT') {
                isEmpty = !field.value; // Pour le select, vérifier si la valeur est vide
            } else {
                isEmpty = !field.value.trim();
            }

            if (isEmpty) {
                field.classList.add('error');
                
                // Effet de secousse
                field.style.animation = 'shake 0.6s ease-in-out';
                
                // Retirer l'animation après son exécution
                field.addEventListener('animationend', function() {
                    this.style.animation = '';
                }, { once: true });
                
                // Retirer la classe d'erreur lors de la saisie
                const eventType = (field.type === 'checkbox' || field.tagName === 'SELECT') ? 'change' : 'input';
                field.addEventListener(eventType, function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        // Gérer spécifiquement la checkbox de confidentialité si elle n'est pas cochée
        const privacyCheckboxElement = contactForm.querySelector('input[name="privacy"]');
        if (privacyCheckboxElement && !privacyCheckboxElement.checked) {
            // Appliquer le style d'erreur au parent ou au label si nécessaire pour la visibilité
            const parentLabel = privacyCheckboxElement.closest('.checkbox-group');
            if(parentLabel) parentLabel.classList.add('error'); // exemple
        }
    }
    
    // Fonction pour afficher une notification
    function showNotification(message, type) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type} show`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <p>${message}</p>
            </div>
            <div class="notification-progress"></div>
        `;
        
        // Ajouter au corps du document
        document.body.appendChild(notification);
        
        // Amélioration : utiliser une animation CSS pour la barre de progression
        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.animation = 'progress 5s linear forwards';
        }

        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => notification.remove());
        }, 5000);
    }
    
    // Animer les éléments FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        
        question.addEventListener('click', () => {
            // Toggle pour l'élément actuel
            item.classList.toggle('active');
            
            // Fermer les autres éléments
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}); 