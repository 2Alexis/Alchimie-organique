# Alchimie Organique

Site web pour un centre de soins holistiques spécialisé dans l'alchimie organique.

## Fonctionnalités

- Design spirituel et accueillant
- Présentation des services de soins
- Système de réservation avec calendrier interactif
- Responsive design

## Structure

- index.html - Page d'accueil
- services.html - Détail des soins proposés
- reservation.html - Calendrier pour rendez-vous
- styles.css - Styles principaux
- reservation.css - Styles pour le calendrier
- services.css - Styles pour la page de services
- scripts.js - Javascript global
- reservation.js - Javascript pour le calendrier

## Couleurs

- Violet-bleu (#7b68ee) - Couleur principale
- Turquoise (#20b2aa) - Couleur secondaire
- Saumon doux (#ffa07a) - Couleur d'accent

# Système de vérification par SMS pour Alchimie Organique

Ce système permet de vérifier les numéros de téléphone des utilisateurs avant de leur donner accès au calendrier de réservation.

## Configuration requise

- PHP 7.4 ou supérieur
- Serveur web avec support PHP
- Fonctionnalité cURL activée dans PHP

## Comment ça fonctionne

1. L'utilisateur entre son numéro de téléphone dans le formulaire.
2. Le système envoie un code de vérification par SMS via l'API TextBelt (gratuite).
3. L'utilisateur entre le code reçu.
4. Une fois vérifié, l'utilisateur a accès au calendrier de réservation.

## Installation

1. Téléchargez ces fichiers sur votre serveur web.

2. Assurez-vous que votre serveur a les droits d'écriture sur le dossier (pour les sessions).

3. C'est tout ! Aucune configuration supplémentaire n'est requise.

## API SMS Gratuite

Ce système utilise TextBelt, une API qui offre:
- 1 SMS gratuit par jour avec la clé "textbelt"
- Une portée internationale
- Aucune inscription requise
- Aucun numéro de téléphone à acheter

### Mode simulation

Si la limite quotidienne de SMS est atteinte, le système bascule automatiquement en mode simulation:
- Le code de vérification est affiché directement sur la page
- L'utilisateur peut entrer ce code pour continuer
- Un message visuel indique que le système est en mode simulation

## Sécurité

Le système inclut des mesures de sécurité :
- Limitation du nombre de tentatives d'envoi de SMS pour éviter les abus
- Validation des numéros de téléphone
- Stockage sécurisé des informations en session

## Production

Pour un environnement de production avec plus de volume, vous pourriez envisager:
- Acheter des crédits TextBelt (environ 0,05$ par SMS): [textbelt.com](https://textbelt.com/)
- Remplacer la valeur de la clé API dans sms-api.php
- Utiliser une base de données pour stocker les tentatives d'envoi de SMS
- Configurer HTTPS pour sécuriser les communications

## Problèmes courants

- **Les SMS ne sont pas envoyés**: Vérifiez que cURL est activé sur votre serveur PHP
- **Erreur "quota"**: La limite quotidienne de SMS gratuits a été atteinte, le système passera automatiquement en mode simulation
- **Erreur de format de numéro**: Assurez-vous que le numéro respecte le format international (par exemple +33...)

---

Pour toute question, contactez l'administrateur du site. 