# Guide de personnalisation du calendrier Google

Ce document explique comment personnaliser l'apparence et le fonctionnement du calendrier de réservation Google intégré sur notre site.

## Paramètres d'URL pour personnaliser l'apparence

Lorsque vous intégrez le calendrier Google via une iframe, vous pouvez personnaliser son apparence en ajoutant des paramètres à l'URL. Voici les principaux paramètres disponibles :

| Paramètre | Description | Exemple |
|-----------|-------------|---------|
| `bgcolor` | Couleur de fond | `bgcolor=%23ffffff` (blanc) |
| `color` | Couleur principale | `color=%237c4dff` (violet) |
| `mode` | Mode d'affichage | `mode=WEEK` (vue par semaine) |
| `showTitle` | Afficher le titre | `showTitle=0` (caché) |
| `showNav` | Afficher la navigation | `showNav=1` (visible) |
| `showPrint` | Afficher le bouton d'impression | `showPrint=0` (caché) |
| `showTabs` | Afficher les onglets | `showTabs=0` (caché) |
| `showCalendars` | Afficher les calendriers | `showCalendars=0` (caché) |
| `emailVerification` | Demander une vérification par email | `emailVerification=1` (activé) |

## Sécurité et vérification d'email

Pour protéger votre calendrier de réservation contre les abus :

- **Paramètre `emailVerification=1`** : Active la vérification d'email lors de la réservation
- Cette option envoie un code de confirmation que le client devra saisir pour finaliser sa réservation
- Avantage majeur : empêche les réservations malveillantes ou les blocages de créneaux sans intention réelle

> **Note** : La vérification d'email nécessite généralement un abonnement Google Workspace.

## Personnalisation des rendez-vous dans Google Calendar

Pour personnaliser les types de rendez-vous, durées et disponibilités :

1. Connectez-vous à [Google Calendar](https://calendar.google.com)
2. Cliquez sur **+** puis **Calendrier de rendez-vous**
3. Définissez vos préférences pour :
   - Durée des rendez-vous
   - Disponibilités par jour/semaine
   - Créneaux disponibles
   - Temps tampon entre les rendez-vous
   - Informations demandées lors de la réservation

## Personnalisation des formulaires

Vous pouvez personnaliser les champs demandés lors de la réservation :

1. Dans les paramètres du calendrier de rendez-vous
2. Allez dans la section **Formulaire de réservation**
3. Ajoutez des champs personnalisés pour recueillir les informations nécessaires :
   - Numéro de téléphone
   - Type de service souhaité 
   - Questions ou besoins spécifiques
   - Informations médicales pertinentes

## Notifications et rappels

Configurez les notifications pour vous et vos clients :

1. Dans les paramètres du calendrier de rendez-vous
2. Allez dans la section **Confirmations et rappels de réservation**
3. Personnalisez :
   - Email de confirmation immédiate
   - Rappels (24h avant, 1h avant, etc.)
   - Notifications en cas d'annulation

## Conseils pour améliorer l'expérience utilisateur

- **Testez sur mobile** : Assurez-vous que le calendrier est bien lisible sur tous les appareils
- **Bloquez les jours indisponibles** : Marquez les jours fériés ou vos congés comme indisponibles
- **Limitez les réservations par jour** : Définissez un nombre maximum de rendez-vous quotidiens
- **Ajoutez des explications** : Informez vos clients sur le processus de réservation
- **Personnalisez les couleurs** : Adaptez l'apparence pour qu'elle corresponde à votre charte graphique

Si l'apparence du calendrier vous semble toujours insuffisante, vous pourriez envisager des solutions tierces comme Calendly, qui offrent plus d'options de personnalisation visuelle tout en s'intégrant à Google Calendar. 