# Guide de configuration de Google Calendar avec iframe pour Wix

Ce guide vous explique comment configurer un calendrier de réservation Google directement intégrable sur votre site Wix via un iframe.

## Étape 1 : Configurer Google Calendar pour les rendez-vous

1. Connectez-vous à votre compte Google et accédez à [Google Calendar](https://calendar.google.com/).
2. Cliquez sur le bouton "+" à côté de "Autres agendas" et sélectionnez "Créer un agenda".
3. Donnez un nom à votre agenda (par exemple "Réservations Alchimie Organique") et cliquez sur "Créer un agenda".

## Étape 2 : Configurer les créneaux de rendez-vous

1. Dans Google Calendar, cliquez sur l'icône d'engrenage (paramètres) en haut à droite.
2. Sélectionnez "Paramètres".
3. Dans le menu de gauche, cliquez sur "Pages de rendez-vous".
4. Cliquez sur "CRÉER".
5. Remplissez les informations nécessaires :
   - Donnez un nom à votre page de rendez-vous
   - Sélectionnez l'agenda que vous avez créé
   - Définissez la durée des rendez-vous (par exemple 60 minutes)
   - Configurez les heures d'ouverture et les jours disponibles
   - Ajoutez une description de votre service

6. Vous pouvez également configurer :
   - Des questions préalables aux clients
   - Des notifications par email
   - Des délais de réservation minimum et maximum
   - Des tampons entre les rendez-vous pour vous laisser du temps

7. Cliquez sur "Enregistrer" une fois terminé.

## Étape 3 : Obtenir le lien d'intégration

1. Après avoir enregistré votre page de rendez-vous, vous serez redirigé vers la liste de vos pages de rendez-vous.
2. À côté de votre page de rendez-vous nouvellement créée, cliquez sur les trois points verticaux (⋮).
3. Sélectionnez "Copier le lien".
4. Vous obtiendrez un lien qui ressemble à : `https://calendar.google.com/calendar/appointments/schedules/AcZssZ...`.

## Étape 4 : Intégrer dans votre site Wix

### Méthode 1 : Utiliser l'élément HTML de Wix

1. Dans l'éditeur Wix, ajoutez un élément "HTML" à votre page.
2. Cliquez sur "Entrer le code" et collez le code suivant :
   ```html
   <iframe src="VOTRE_LIEN_DE_CALENDRIER" style="border: 0" width="100%" height="600" frameborder="0"></iframe>
   ```
3. Remplacez "VOTRE_LIEN_DE_CALENDRIER" par le lien que vous avez copié à l'étape 3.
4. Cliquez sur "Mettre à jour" puis redimensionnez l'élément HTML selon vos besoins.

### Méthode 2 : Créer une page de réservation dédiée

1. Si vous préférez utiliser la page que nous avons créée, téléchargez le fichier `reservation-iframe.html` sur votre ordinateur.
2. Dans l'éditeur Wix, allez dans "Ajouter une page" > "Page vierge".
3. Nommez-la "Réservations" et configurez-la.
4. Ajoutez un élément HTML et collez l'intégralité du contenu de `reservation-iframe.html`.
5. Modifiez l'URL de l'iframe avec votre propre lien de calendrier.

## Personnalisation supplémentaire

- **Couleurs** : Dans les paramètres de votre page de rendez-vous Google, vous pouvez personnaliser les couleurs pour qu'elles correspondent à votre site.
- **Champs** : Vous pouvez configurer les informations que les clients doivent fournir (nom, email, téléphone, etc.).
- **Notifications** : Configurez des rappels automatiques par email pour vous et vos clients.

## Avantages de cette méthode

1. **Simple à configurer** : Pas besoin de code complexe ou d'API.
2. **Synchronisation automatique** : Les réservations apparaissent directement dans votre calendrier Google.
3. **Gestion facile** : Vous pouvez accepter, refuser ou reprogrammer des rendez-vous directement depuis Google Calendar.
4. **100% gratuit** : Aucun coût supplémentaire pour cette fonctionnalité.
5. **Accessible partout** : Vous pouvez gérer vos réservations depuis n'importe quel appareil connecté à votre compte Google.

## Fonctionnement sur Wix

Si vous rencontrez des problèmes d'intégration dans Wix :

1. Assurez-vous que l'élément HTML est bien configuré pour être réactif (responsive).
2. Si l'iframe ne s'affiche pas correctement, essayez d'ajuster la hauteur et la largeur.
3. Vérifiez que vous n'avez pas de blocage de cookies ou de scripts tiers dans les paramètres de votre site Wix.

Pour des informations plus détaillées, consultez la [documentation officielle de Google Calendar](https://support.google.com/calendar/answer/190998?hl=fr) sur la création de pages de rendez-vous. 