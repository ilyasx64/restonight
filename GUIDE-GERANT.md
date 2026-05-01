# Guide d'utilisation — Resto Night

Bienvenue ! Ce guide explique comment modifier le menu, les horaires et les infos de votre site web vous-même, en moins de 5 minutes.

---

## 🌐 Vos liens importants

- **Votre site public** : https://restonight.netlify.app *(à remplacer par restonight.fr quand le domaine sera actif)*
- **Votre espace gérant** : https://restonight.netlify.app/admin/

Notez ces deux liens. Mettez-les en favori dans votre navigateur (Chrome, Safari, Firefox).

---

## 🔐 Première connexion

1. Vous avez reçu un email de Netlify avec pour sujet : *"You've been invited to join restonight.netlify.app"*
2. Cliquez sur le lien dans l'email
3. Choisissez un mot de passe (notez-le quelque part)
4. Vous êtes redirigé vers l'espace gérant

À partir de maintenant, pour vous connecter : aller sur l'espace gérant, cliquer **"Se connecter avec Netlify Identity"**, entrer votre email + mot de passe.

---

## ✏️ Modifier votre menu

1. Une fois connecté, vous voyez à gauche un menu avec :
   - **Infos générales** (nom, téléphone, adresse, photo de la devanture…)
   - **Horaires** (jours d'ouverture, fermetures exceptionnelles)
   - **Liens de commande** (Uber Eats, Deliveroo…)
   - **Catégories du menu** (Tacos, Burgers, Kebabs…)
   - **Plats** (chaque plat avec photo et prix)

2. Cliquez sur la section que vous voulez modifier

3. Pour les Plats par exemple :
   - Cliquer sur un plat existant pour le modifier
   - Ou cliquer **"New Plat"** en haut à droite pour en ajouter un nouveau

4. Remplir les champs :
   - **Nom du plat**
   - **Description** (courte, 1 phrase)
   - **Prix** (en €, avec virgule pour les centimes : `9.90`)
   - **Catégorie** (dropdown, choisir parmi celles existantes)
   - **Photo** : cliquer sur le champ → **Upload an image** → choisir un fichier sur votre ordinateur ou téléphone
   - **Tags** (optionnels) : Populaire ⭐, Nouveau 🆕, Épicé 🌶️, Végé 🥦
   - **Disponible** : si décoché, le plat sera caché du site (utile pour rupture)

5. Cliquer **"Publish now"** en haut à droite

6. Attendre **30 secondes** que le site se mette à jour, puis rafraîchir https://restonight.netlify.app pour voir le résultat.

---

## 📸 Conseils pour les photos

- **Format** : JPEG ou PNG
- **Taille** : minimum 1000×1000 pixels (carré, c'est l'idéal)
- **Poids** : moins de 2 Mo
- **Style** : photo nette, bonne lumière, plat centré sur l'image, fond simple
- Vous pouvez prendre les photos avec votre téléphone — les téléphones récents font des photos parfaitement utilisables

⚠️ **Important** : pour ajouter une photo, **uploadez un fichier**. Ne collez pas une URL trouvée sur internet, ça ne fonctionne pas.

---

## 🕐 Modifier les horaires

1. Section **Horaires**
2. Pour chaque jour, vous pouvez :
   - Cocher **"Fermé"** si vous êtes fermé ce jour-là
   - Modifier les heures d'**Ouverture** et de **Fermeture** (format `18:00`, `02:00`, etc.)
3. Section **Fermetures exceptionnelles** : ajouter une date (format `2026-12-25`) et la raison (ex. *"Noël"*, *"Privatisation"*) → un bandeau d'alerte s'affichera sur le site ce jour-là
4. **Publish now**

Le badge "OUVERT MAINTENANT" sur le site se met à jour automatiquement selon ces horaires.

---

## 📝 Modifier les infos générales

Section **Infos générales** : nom du restaurant, slogan, téléphone, adresse, email, liens Facebook/Instagram, et la **photo de la devanture** (qui apparaît en grand sur la page d'accueil).

Pour changer la photo de devanture : cliquer sur le champ **Photo de la devanture** → Upload → choisir une nouvelle image. Idéalement une photo prise **de nuit** avec l'enseigne allumée.

---

## 🧾 Pour ajouter une nouvelle catégorie

1. Section **Catégories du menu** → **New Catégorie**
2. Remplir :
   - **Nom** (ex. *"Pâtes"*)
   - **Ordre d'affichage** (ex. `5` — détermine l'ordre des sections sur le site)
   - **Emoji** (optionnel, ex. `🍝`)
3. **Publish now**

Vous pouvez ensuite assigner des plats à cette nouvelle catégorie.

---

## 🍕 Pour les commandes en ligne

Section **Liens de commande** : entrer les URLs de vos pages Uber Eats / Deliveroo / Just Eat. Les boutons correspondants n'apparaissent sur le site que si l'URL est remplie.

---

## ❌ Comment cacher un plat temporairement

Au lieu de le supprimer (ce qui efface ses photos et ses infos), décochez simplement la case **Disponible** dans le formulaire du plat → **Publish now**. Le plat est masqué du site mais ses données sont gardées. Pour le réactiver, recochez **Disponible**.

---

## 🆘 En cas de problème

| Problème | Que faire |
|---|---|
| Je ne peux plus me connecter | Cliquer "Forgot password" → entrer l'email → suivre l'email reçu |
| J'ai cliqué Publish mais le site n'a pas changé | Attendre 1 minute et rafraîchir avec **Ctrl+Shift+R** (Cmd+Shift+R sur Mac) |
| Photo trop lourde | Compresser sur https://tinypng.com avant d'uploader |
| Erreur "champ requis" | Vérifier que tous les champs marqués obligatoires sont remplis |
| Autre problème technique | Contacter votre développeur (Ilyass) |

---

## 📞 Contact technique

Pour tout problème ou modification importante (changement de design, nouvelle fonctionnalité…) : contacter **Ilyass** *(à compléter avec ton numéro/email)*.

---

**🎉 Bonne utilisation de votre nouveau site !**
