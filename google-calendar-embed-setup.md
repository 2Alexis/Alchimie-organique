# Guide d'intégration d'un calendrier Google dans votre site Wix

Ce guide vous explique comment partager votre calendrier Google et l'intégrer à votre site web Wix pour afficher vos disponibilités.

## Étape 1 : Configurer votre calendrier Google

1. Connectez-vous à votre compte Google et accédez à [Google Calendar](https://calendar.google.com/)
2. Dans le menu de gauche, trouvez votre calendrier "rdv"
3. Cliquez sur les trois points (⋮) à côté du nom de votre calendrier
4. Sélectionnez "Paramètres et partage"

## Étape 2 : Rendre votre calendrier accessible au public

1. Faites défiler jusqu'à la section "Accès aux paramètres"
2. Cochez la case "Rendre disponible pour le public"
3. Choisissez l'option appropriée :
   - "Voir tous les détails" : si vous voulez que les gens voient les noms des rendez-vous
   - "Voir uniquement les disponibilités" : pour plus de confidentialité (recommandé)
4. Cliquez sur "OK" pour confirmer

## Étape 3 : Obtenir le code d'intégration

1. Dans les paramètres du calendrier, faites défiler jusqu'à "Intégrer le calendrier"
2. Vous verrez un bloc de code d'intégration qui ressemble à ceci:
   ```html
   <iframe src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Europe/Paris" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
   ```
3. Vous pouvez personnaliser l'affichage avec ces options:
   - Ajoutez `&mode=WEEK` pour afficher la vue par semaine
   - Ajoutez `&showTitle=0` pour masquer le titre
   - Ajoutez `&showNav=0` pour masquer les boutons de navigation
   - Ajoutez `&showDate=0` pour masquer la date
   - Ajoutez `&showPrint=0` pour masquer le bouton d'impression
   - Ajoutez `&showTabs=0` pour masquer les onglets
   - Ajoutez `&showCalendars=0` pour masquer le sélecteur de calendriers

4. Copiez le code d'intégration personnalisé

## Étape 4 : Intégrer le calendrier dans votre site Wix

### Méthode 1 : Utiliser l'élément HTML de Wix

1. Dans l'éditeur Wix, ajoutez un élément "HTML" à votre page
2. Cliquez sur "Entrer le code" et collez le code d'intégration copié à l'étape 3
3. Cliquez sur "Mettre à jour" puis redimensionnez l'élément HTML selon vos besoins

### Méthode 2 : Utiliser notre page pré-configurée

1. Ouvrez le fichier `reservation-simple.html` que nous avons créé
2. Remplacez l'URL de l'iframe par l'URL de votre calendrier
3. Téléchargez la page modifiée
4. Dans l'éditeur Wix, allez dans "Ajouter une page" > "Page vierge"
5. Nommez-la "Réservations" et configurez-la
6. Ajoutez un élément HTML et collez l'intégralité du contenu HTML de `reservation-simple.html`

## Important : Limitations de cette méthode

1. **Pas de réservation automatique** : Les visiteurs peuvent seulement voir vos disponibilités, mais ne peuvent pas réserver directement eux-mêmes
2. **Processus manuel** : Ils doivent vous contacter par téléphone ou email pour réserver
3. **Mise à jour manuelle** : Vous devrez ajouter manuellement les rendez-vous à votre calendrier

## Personnalisation supplémentaire

- **Couleurs** : Vous pouvez modifier les couleurs de votre calendrier dans les paramètres de Google Calendar
- **Informations visibles** : Contrôlez quelles informations sont visibles en modifiant les options de partage
- **Période affichée** : Par défaut, le calendrier affiche la semaine en cours, mais vous pouvez le modifier

## Avantages de cette méthode

1. **Simple à configurer** : Pas besoin de créer une page de rendez-vous
2. **Contrôle total** : Vous décidez quels rendez-vous accepter
3. **Synchronisation** : Votre calendrier est toujours à jour
4. **100% gratuit** : Aucun coût supplémentaire

## Conseils d'utilisation sur Wix

Si vous utilisez Wix, assurez-vous de:
1. Rendre l'élément HTML responsive dans les paramètres
2. Tester l'affichage sur mobile pour vous assurer que le calendrier est bien visible
3. Ajouter des instructions claires pour vos visiteurs sur la façon de réserver

Pour des informations plus détaillées, consultez la [documentation officielle de Google Calendar](https://support.google.com/calendar/answer/41207?hl=fr) sur le partage de calendriers. 