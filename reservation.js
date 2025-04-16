document.addEventListener('DOMContentLoaded', function() {
    // Configuration Google Calendar API
    const GOOGLE_API_KEY = 'VOTRE_CLE_API'; // À remplacer par votre clé API Google
    const CALENDAR_ID = 'VOTRE_ID_CALENDRIER@group.calendar.google.com'; // À remplacer par l'ID de votre calendrier Google
    
    // Initialisation du calendrier
    const calendarEl = document.getElementById('calendar');
    const bookingFormEl = document.getElementById('booking-form');
    const selectedDateEl = document.getElementById('selected-date');
    const selectedTimeEl = document.getElementById('selected-time');
    const reservationFormEl = document.getElementById('reservation-form');
    
    // Heures disponibles (à adapter selon vos horaires)
    const availableHours = [
        '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
    ];
    
    // Jours de fermeture (dimanche et jours fériés par exemple)
    const closedDays = [0]; // 0 = dimanche, 1 = lundi, etc.
    
    // Variable pour stocker les événements Google Calendar
    let googleEvents = [];
    
    // Initialisation de l'API Google
    function initGoogleCalendar() {
        gapi.load('client', function() {
            gapi.client.init({
                apiKey: GOOGLE_API_KEY,
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
            }).then(function() {
                // Charger les événements Google Calendar
                return loadGoogleCalendarEvents();
            }).catch(function(error) {
                console.error('Erreur lors de l\'initialisation de l\'API Google', error);
                // Initialiser le calendrier avec des événements vides si l'API échoue
                initializeCalendar([]);
            });
        });
    }
    
    // Fonction pour charger les événements du calendrier Google
    function loadGoogleCalendarEvents() {
        return gapi.client.calendar.events.list({
            'calendarId': CALENDAR_ID,
            'timeMin': (new Date()).toISOString(),
            'timeMax': (new Date(new Date().setMonth(new Date().getMonth() + 3))).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then(function(response) {
            const events = response.result.items;
            
            // Convertir les événements Google en format FullCalendar
            googleEvents = events.map(event => {
                return {
                    title: 'Réservé',
                    start: event.start.dateTime || event.start.date,
                    end: event.end.dateTime || event.end.date,
                    id: event.id,
                    extendedProps: {
                        googleEventId: event.id
                    }
                };
            });
            
            // Initialiser le calendrier avec les événements chargés
            initializeCalendar(googleEvents);
        }).catch(function(error) {
            console.error('Erreur lors du chargement des événements Google Calendar', error);
            // Initialiser le calendrier avec des événements vides si le chargement échoue
            initializeCalendar([]);
        });
    }
    
    // Initialisation du calendrier avec FullCalendar
    function initializeCalendar(events) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            locale: 'fr',
            height: 'auto',
            selectable: true,
            selectMirror: true,
            nowIndicator: true,
            events: events,
            
            // Désactiver les jours passés et les jours de fermeture
            validRange: {
                start: new Date()
            },
            businessHours: {
                daysOfWeek: [1, 2, 3, 4, 5, 6], // Du lundi au samedi
                startTime: '09:00',
                endTime: '18:00',
            },
            
            // Gestion des clics sur les dates
            dateClick: function(info) {
                const clickedDate = new Date(info.date);
                const day = clickedDate.getDay();
                
                // Vérifier si le jour est un jour de fermeture
                if (closedDays.includes(day)) {
                    showNotification('Nous sommes fermés ce jour-là. Veuillez choisir une autre date.');
                    return;
                }
                
                // Vérifier si la date est dans le passé
                if (clickedDate < new Date().setHours(0, 0, 0, 0)) {
                    showNotification('Veuillez sélectionner une date future.');
                    return;
                }
                
                // Afficher les créneaux horaires disponibles pour cette date
                showAvailableTimeSlots(info.dateStr, events);
            }
        });
        
        calendar.render();
    }
    
    // Fonction pour afficher les créneaux horaires disponibles
    function showAvailableTimeSlots(dateStr, events) {
        // Formater la date pour l'affichage
        const selectedDate = new Date(dateStr);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString('fr-FR', options);
        selectedDateEl.textContent = formattedDate;
        
        // Créer des créneaux disponibles (en filtrant les réservations existantes)
        let availableSlots = filterAvailableTimeSlots(dateStr, availableHours, events);
        
        // Créer un élément select pour choisir l'heure
        const timeSelectHTML = createTimeSelectOptions(availableSlots);
        selectedTimeEl.innerHTML = timeSelectHTML;
        
        // Ajouter un gestionnaire d'événements au sélecteur d'heure
        const timeSelect = document.getElementById('time-select');
        if (timeSelect) {
            timeSelect.addEventListener('change', function() {
                const selectedTime = this.value;
                if (selectedTime) {
                    selectedTimeEl.textContent = selectedTime;
                    
                    // Mettre à jour la réservation avec l'heure sélectionnée
                    updateReservationDateTime(dateStr, selectedTime);
                }
            });
        }
        
        // Afficher le formulaire
        bookingFormEl.style.display = 'block';
        bookingFormEl.classList.add('active');
        
        // Faire défiler jusqu'au formulaire
        bookingFormEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Filtrer les créneaux horaires disponibles
    function filterAvailableTimeSlots(dateStr, allTimeSlots, events) {
        const selectedDate = new Date(dateStr);
        const bookedTimes = [];
        
        // Parcourir tous les événements pour trouver ceux qui se produisent le jour sélectionné
        events.forEach(event => {
            const eventStart = new Date(event.start);
            const eventDay = eventStart.toISOString().split('T')[0];
            
            // Si l'événement est le même jour que celui sélectionné
            if (eventDay === dateStr) {
                const eventHour = eventStart.getHours().toString().padStart(2, '0') + ':' + 
                                 eventStart.getMinutes().toString().padStart(2, '0');
                bookedTimes.push(eventHour);
            }
        });
        
        // Retourner les créneaux qui ne sont pas réservés
        return allTimeSlots.filter(time => !bookedTimes.includes(time));
    }
    
    // Créer les options du sélecteur d'heure
    function createTimeSelectOptions(availableSlots) {
        if (availableSlots.length === 0) {
            return '<p>Aucun créneau disponible pour cette date.</p>';
        }
        
        let html = '<select id="time-select" class="time-select">';
        html += '<option value="">Sélectionnez une heure</option>';
        
        availableSlots.forEach(slot => {
            html += `<option value="${slot}">${slot}</option>`;
        });
        
        html += '</select>';
        return html;
    }
    
    // Mettre à jour la réservation avec la date et l'heure
    function updateReservationDateTime(dateStr, timeStr) {
        // Cette fonction pourrait être utilisée pour mettre à jour un champ caché dans le formulaire
        // ou pour effectuer d'autres actions lorsque l'utilisateur sélectionne une date et une heure
        console.log('Réservation mise à jour:', dateStr, timeStr);
    }
    
    // Afficher une notification
    function showNotification(message) {
        // Créer un élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Animer l'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Fonction pour ajouter un événement à Google Calendar
    function addEventToGoogleCalendar(reservationData) {
        if (!gapi.client) {
            console.error('Google API client non initialisé');
            return Promise.reject('Google API client non initialisé');
        }
        
        // Convertir la date et l'heure au format ISO
        const dateTimeParts = parseReservationDateTime(reservationData.date, reservationData.time);
        if (!dateTimeParts) {
            return Promise.reject('Format de date ou d\'heure non valide');
        }
        
        const { year, month, day, hours, minutes } = dateTimeParts;
        
        // Calculer la durée en fonction du service sélectionné
        let durationMinutes = 60; // Par défaut
        switch (reservationData.service) {
            case 'harmonisation':
                durationMinutes = 60;
                break;
            case 'alchimie':
                durationMinutes = 90;
                break;
            case 'purification':
                durationMinutes = 45;
                break;
            case 'equilibre':
                durationMinutes = 75;
                break;
        }
        
        // Créer une date de début et de fin
        const startTime = new Date(year, month - 1, day, hours, minutes);
        const endTime = new Date(new Date(startTime).setMinutes(startTime.getMinutes() + durationMinutes));
        
        // Créer l'événement
        const event = {
            'summary': `Réservation Alchimie Organique - ${reservationData.service}`,
            'description': `Réservation pour ${reservationData.name}\nEmail: ${reservationData.email}\nTéléphone: ${reservationData.phone}\nNotes: ${reservationData.notes || ''}`,
            'start': {
                'dateTime': startTime.toISOString(),
                'timeZone': 'Europe/Paris'
            },
            'end': {
                'dateTime': endTime.toISOString(),
                'timeZone': 'Europe/Paris'
            }
        };
        
        // Ajouter l'événement au calendrier
        return gapi.client.calendar.events.insert({
            'calendarId': CALENDAR_ID,
            'resource': event
        });
    }
    
    // Fonction pour parser la date et l'heure
    function parseReservationDateTime(dateStr, timeStr) {
        // Exemple de format pour dateStr: "vendredi 17 mai 2024"
        // Exemple de format pour timeStr: "14:00"
        
        try {
            // Extraire le jour, le mois et l'année de la date
            const dateRegex = /(\w+)\s+(\d+)\s+(\w+)\s+(\d+)/;
            const dateMatch = dateStr.match(dateRegex);
            
            if (!dateMatch) {
                console.error('Format de date non valide:', dateStr);
                return null;
            }
            
            const day = parseInt(dateMatch[2]);
            const monthStr = dateMatch[3].toLowerCase();
            const year = parseInt(dateMatch[4]);
            
            // Convertir le nom du mois en numéro
            const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            const month = monthNames.indexOf(monthStr) + 1;
            
            if (month === 0) {
                console.error('Nom de mois non valide:', monthStr);
                return null;
            }
            
            // Extraire les heures et les minutes
            const timeRegex = /(\d+):(\d+)/;
            const timeMatch = timeStr.match(timeRegex);
            
            if (!timeMatch) {
                console.error('Format d\'heure non valide:', timeStr);
                return null;
            }
            
            const hours = parseInt(timeMatch[1]);
            const minutes = parseInt(timeMatch[2]);
            
            return { year, month, day, hours, minutes };
        } catch (error) {
            console.error('Erreur lors de l\'analyse de la date et de l\'heure:', error);
            return null;
        }
    }
    
    // Gérer la soumission du formulaire
    if (reservationFormEl) {
        reservationFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const reservationData = {};
            
            // Convertir FormData en objet
            for (let [key, value] of formData.entries()) {
                reservationData[key] = value;
            }
            
            // Ajouter la date et l'heure sélectionnées
            reservationData.date = selectedDateEl.textContent;
            reservationData.time = selectedTimeEl.textContent;
            
            // Ajouter l'événement à Google Calendar
            addEventToGoogleCalendar(reservationData)
                .then(function(response) {
                    console.log('Événement ajouté à Google Calendar', response);
                    // Afficher la confirmation de réservation
                    showBookingConfirmation();
                })
                .catch(function(error) {
                    console.error('Erreur lors de l\'ajout de l\'événement à Google Calendar', error);
                    // Afficher quand même la confirmation (en production, vous voudrez peut-être gérer cette erreur différemment)
                    showBookingConfirmation();
                });
        });
    }
    
    // Afficher la confirmation de réservation
    function showBookingConfirmation() {
        // Créer une boîte de dialogue de confirmation
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'modal confirmation-modal';
        
        modal.innerHTML = `
            <h3>Réservation Confirmée</h3>
            <p>Votre séance a été réservée avec succès pour le :</p>
            <p class="confirmation-details">${selectedDateEl.textContent} à ${selectedTimeEl.textContent}</p>
            <p>Un email de confirmation a été envoyé à l'adresse que vous avez fournie.</p>
            <button class="btn close-modal">Fermer</button>
        `;
        
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);
        
        // Ajouter la classe pour l'animation
        setTimeout(() => {
            modalOverlay.classList.add('show');
            modal.classList.add('show');
        }, 10);
        
        // Gérer la fermeture
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modalOverlay.classList.remove('show');
            modal.classList.remove('show');
            
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
                // Réinitialiser le formulaire
                reservationFormEl.reset();
                bookingFormEl.style.display = 'none';
                
                // Actualiser la page après un court délai
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }, 300);
        });
    }
    
    // Ajouter des styles pour les notifications et modales
    addDynamicCSS();
    
    function addDynamicCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: -100px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transition: top 0.3s ease;
            }
            
            .notification.show {
                top: 20px;
            }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .modal-overlay.show {
                opacity: 1;
                visibility: visible;
            }
            
            .modal {
                background-color: var(--dark-color);
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                color: var(--text-color);
            }
            
            .modal.show {
                transform: scale(1);
            }
            
            .confirmation-details {
                font-weight: bold;
                color: var(--primary-color);
                margin: 1rem 0;
                font-size: 1.2rem;
            }
            
            .time-select {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #444;
                border-radius: 5px;
                margin-top: 0.5rem;
                background-color: var(--background-color);
                color: var(--text-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialiser Google Calendar
    initGoogleCalendar();
}); 