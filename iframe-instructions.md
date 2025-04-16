# Guide simplifié pour intégrer votre calendrier Google dans Wix

Ce guide vous explique pas à pas comment intégrer votre calendrier Google dans votre site Wix en utilisant un iframe.

## Étape 1 : Rendez votre calendrier Google public

1. Allez sur [Google Calendar](https://calendar.google.com/)
2. Dans le menu de gauche, trouvez votre calendrier "rdv"
3. Cliquez sur les trois points (⋮) à côté du nom du calendrier
4. Sélectionnez "Paramètres et partage"
5. Cochez "Rendre disponible pour le public"
6. Choisissez "Voir uniquement les disponibilités" pour plus de confidentialité
7. Cliquez sur "OK" pour confirmer

## Étape 2 : Obtenez le code d'intégration

1. Toujours dans les paramètres de votre calendrier, faites défiler jusqu'à "Intégrer le calendrier"
2. Vous verrez un bloc de code d'intégration (code iframe)
3. Vous pouvez personnaliser l'affichage en ajoutant à l'URL dans le code :
   - `&mode=WEEK` (vue semaine)
   - `&showTitle=0` (masquer le titre)
   - `&showPrint=0` (masquer le bouton d'impression)
   - `&showCalendars=0` (masquer le sélecteur de calendriers)
4. Copiez tout le code iframe

## Étape 3 : Intégrez le calendrier dans Wix

1. Connectez-vous à votre compte Wix et ouvrez l'éditeur de votre site
2. Allez à la page où vous voulez afficher le calendrier
3. Cliquez sur le bouton "+" pour ajouter un élément
4. Cherchez "HTML" ou "Embarqué" dans les options
5. Cliquez sur "HTML/iFrame" pour l'ajouter à votre page
6. Dans la fenêtre qui s'ouvre, collez le code d'intégration que vous avez copié
7. Cliquez sur "Mettre à jour"
8. Redimensionnez l'élément HTML selon vos besoins

## Étape 4 : Personnalisez et ajoutez des instructions pour vos visiteurs

1. Ajoutez du texte au-dessus du calendrier pour expliquer comment l'utiliser
2. Indiquez clairement comment les visiteurs peuvent vous contacter pour réserver
3. Spécifiez quelles informations ils doivent fournir (date, heure, type de soin)
4. Ajoutez vos coordonnées de contact bien visibles

## Conseils importants

- **Testez sur mobile** : Assurez-vous que votre calendrier s'affiche correctement sur les appareils mobiles
- **Ajustez la taille** : Dans l'éditeur Wix, vous pouvez redimensionner l'élément HTML pour qu'il s'adapte à votre design
- **Paramètres responsive** : Dans les paramètres de l'élément HTML, assurez-vous que l'option "responsive" est activée

## Exemple de code à utiliser

```html
<iframe src="https://calendar.google.com/calendar/embed?src=VOTRE_ADRESSE_EMAIL%40gmail.com&ctz=Europe%2FParis&mode=WEEK&showTitle=0&showPrint=0&showCalendars=0" style="border: 0" width="100%" height="600" frameborder="0"></iframe>
```

Remplacez `VOTRE_ADRESSE_EMAIL%40gmail.com` par votre adresse email encodée (remplacez @ par %40).

## Besoin d'aide ?

Si vous rencontrez des difficultés, consultez la [documentation officielle de Wix](https://support.wix.com/fr/article/ajouter-du-code-html-votre-site) sur l'ajout de code HTML ou contactez leur support. 