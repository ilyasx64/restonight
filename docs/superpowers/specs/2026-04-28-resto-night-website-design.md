# Resto Night — Site Vitrine + Admin Éditable

**Date :** 2026-04-28
**Client :** Resto Night, snack/restauration rapide, 34 Rue du Hocquet, 80000 Amiens
**Type :** Site vitrine one-page + back-office d'édition de contenu

---

## 1. Objectif

Donner à Resto Night une présence en ligne professionnelle (vitrine, menu, horaires, contact) avec un **back-office permettant au gérant de modifier lui-même** le contenu (menu, horaires, infos, photos) sans intervention technique.

**Contraintes :**
- Coût annuel de fonctionnement < 20 €
- Le gérant n'est pas technique → l'interface admin doit être triviale
- Mobile-first (90 % du trafic attendu vient du téléphone)
- Identité visuelle alignée avec la devanture physique (vert bouteille + néon rose, vibe nuit)

**Non-objectifs (v1) :**
- Système de commande/paiement maison (Uber Eats fait déjà ça → on lie)
- Compte client / programme fidélité
- Multi-langue (français uniquement)
- Blog / actualités

---

## 2. Identité visuelle

### Source — analyse des photos publiques

Devanture vert sapin, enseigne OPEN en néon rose, intérieur orange/jaune avec chaises vert citron, packaging plats kraft / papier journal. Ambiance street-food de nuit, ouvert jusqu'à 02h00, public étudiant et noctambule.

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--resto-green-deep` | `#0F2A1D` | Fond principal |
| `--resto-green` | `#1B4332` | Surfaces, cards |
| `--resto-green-light` | `#2D5F3F` | Hover, séparateurs |
| `--resto-neon` | `#FF1B6B` | CTA, badge OUVERT, accents |
| `--resto-neon-glow` | `#FF4D8A` | Hover des CTA, glow |
| `--resto-orange` | `#F59E0B` | Prix, highlights |
| `--resto-cream` | `#FAF3E0` | Texte principal |
| `--resto-kraft` | `#C9A876` | Cards plats (texture papier) |
| `--resto-black` | `#0A0A0A` | Footer, sections deep |

### Typographies (Google Fonts)

- **Titres / logo / prix** : Bebas Neue (sans-serif condensée, bold, vibe street)
- **Corps / menu** : Inter (moderne, lisibilité mobile)

### Effets signature

- Néon glow (text-shadow rose) sur le logo, badge OUVERT, CTA principaux
- Pulse animation 2s sur le badge OUVERT
- Hover cards plats : élévation + glow rose
- Photos plats désaturées par défaut, full color au hover
- Texture papier journal subtile sur les cards
- Grain vidéo léger en fond global

---

## 3. Périmètre fonctionnel — Pages & Sections

Le site est une **single-page application statique** (one-pager) avec sections ancrées via la nav. Une seule route publique (`/`) plus une route admin (`/admin`).

### 3.1 Section Hero

- Photo de la devanture éclairée nuit en background avec overlay sombre
- Logo "RESTO NIGHT" en Bebas Neue, glow néon rose
- Slogan court (éditable depuis CMS)
- **Badge "OUVERT MAINTENANT" / "FERMÉ"** calculé en live à partir des horaires + fermetures exceptionnelles éditables. Le badge pulse en rose néon quand ouvert.
- CTA primaire : "Voir le menu" (scroll vers section Menu)
- CTA secondaire : numéro de téléphone cliquable (`tel:0322470183`)

### 3.2 Section Menu

- Affichage groupé par catégories (Tacos, Burgers, Kebabs, Paratha, Accompagnements, Tex-Mex, Desserts, Milkshakes, Boissons, Menu enfant)
- Filtres sticky par catégorie (chips horizontales scrollables sur mobile)
- Chaque plat : photo carrée, nom, description courte, prix, tags (épicé / populaire / nouveau / végé), variantes (L/XL si applicable)
- Plats dont `disponible = false` sont masqués
- Lazy-loading des photos

### 3.3 Section Commander

- 3 boutons (visibles uniquement si l'URL correspondante est renseignée dans le CMS) :
  - **Uber Eats** — redirige vers la page Uber Eats du resto
  - **Sur place / À emporter** — `tel:` direct
  - **Deliveroo / Just Eat** — si configuré
- Pas de panier maison

### 3.4 Section Horaires & Contact

- Tableau des 7 jours de la semaine avec plages d'ouverture
- Bandeau d'alerte rouge si fermeture exceptionnelle ce jour
- Adresse complète + iframe Google Maps embarquée
- Téléphone cliquable
- Lien Facebook, Instagram (si renseignés)

### 3.5 Footer

- Mentions légales (page modale ou ancre — texte éditable depuis CMS)
- Copyright
- Lien discret vers `/admin`

### 3.6 Route `/admin`

- Interface Decap CMS chargée comme app autonome, login Netlify Identity (email + mot de passe)
- Decap commit directement sur `main` via le compte Netlify Identity du gérant
- Sans authentification valide, aucune écriture possible (lecture seule en navigation)

---

## 4. Modèle de contenu (Astro Content Collections)

Le contenu vit dans `src/content/` sous forme de fichiers Markdown/JSON, validés par schémas Zod côté Astro et par `config.yml` côté Decap.

### 4.1 Collection `settings` (singleton)

Fichier unique `src/content/settings/general.md` :

```yaml
nom: "Resto Night"
slogan: "Tacos, kebabs, burgers — jusqu'à 02h"
telephone: "0322470183"
email: ""
adresse: "34 Rue du Hocquet, 80000 Amiens"
photo_devanture: "/uploads/devanture.jpg"
facebook_url: "https://facebook.com/Restonight34"
instagram_url: ""
google_maps_url: ""
mentions_legales: |
  Texte markdown des mentions légales.
```

### 4.2 Collection `hours` (singleton)

Fichier unique `src/content/settings/hours.json` :

```json
{
  "schedule": {
    "lundi":    { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "mardi":    { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "mercredi": { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "jeudi":    { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "vendredi": { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "samedi":   { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" },
    "dimanche": { "ferme": false, "ouverture": "18:00", "fermeture": "02:00" }
  },
  "fermetures_exceptionnelles": [
    { "date": "2026-12-25", "raison": "Noël" }
  ]
}
```

Les heures peuvent franchir minuit (ouverture < fermeture sur le jour suivant). La logique de calcul "ouvert maintenant ?" doit gérer ce cas (cf. § 6).

### 4.3 Collection `delivery_links` (singleton)

Fichier unique `src/content/settings/delivery.json` :

```json
{
  "uber_eats_url": "https://www.ubereats.com/fr/store/resto-night/...",
  "deliveroo_url": "",
  "just_eat_url": ""
}
```

Un bouton n'est rendu sur le site que si l'URL correspondante est non vide.

### 4.4 Collection `categories` (liste)

Un fichier Markdown par catégorie dans `src/content/categories/` :

```yaml
---
nom: "Tacos"
ordre: 1
emoji: "🌮"
---
```

L'ordre numérique détermine l'affichage. Le nom sert de slug (slugifié).

### 4.5 Collection `dishes` (liste)

Un fichier Markdown par plat dans `src/content/dishes/` :

```yaml
---
nom: "Tacos XL Poulet Mariné"
description: "Galette grillée, poulet mariné, frites, fromage fondu, sauce au choix."
prix: 9.90
categorie: "tacos"
photo: "/uploads/tacos-xl-poulet.jpg"
tags: ["populaire", "epice"]
disponible: true
variantes:
  - { nom: "L",  prix: 9.90 }
  - { nom: "XL", prix: 12.90 }
---
```

Champs :
- `nom` (string, requis)
- `description` (string, optionnel)
- `prix` (number, requis — utilisé si pas de variantes)
- `categorie` (référence vers slug d'une catégorie, requis)
- `photo` (chemin vers `/uploads/`, optionnel)
- `tags` (enum array : `populaire`, `nouveau`, `epice`, `vege`)
- `disponible` (boolean, défaut `true`)
- `variantes` (array optionnel ; si présent, masque le `prix` racine)

---

## 5. Architecture technique

### 5.1 Stack

| Brique | Rôle |
|---|---|
| Astro 5 | Framework SSG, génère HTML statique |
| Tailwind CSS 4 | Styling utility-first, palette custom configurée |
| TypeScript | Sécurité de typage sur le contenu |
| Decap CMS | Interface admin web pour le gérant |
| Netlify Identity | Authentification du gérant |
| Netlify | Hébergement, build/deploy continu, HTTPS |
| GitHub | Repo source + stockage du contenu versionné |

### 5.2 Flux de mise à jour de contenu

```
Gérant édite via /admin
       ↓
Decap CMS commit Markdown/JSON dans GitHub
       ↓
Webhook GitHub → Netlify build
       ↓
Astro génère HTML statique → CDN Netlify
       ↓
Site mis à jour en ~30 secondes
```

### 5.3 Structure du projet

```
RestoNight/
├── src/
│   ├── content/
│   │   ├── config.ts                ← schémas Zod des collections
│   │   ├── settings/                ← general.md, hours.json, delivery.json
│   │   ├── categories/              ← une .md par catégorie
│   │   └── dishes/                  ← une .md par plat
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── OpenBadge.astro
│   │   ├── MenuSection.astro
│   │   ├── CategoryFilter.astro
│   │   ├── DishCard.astro
│   │   ├── OrderButtons.astro
│   │   ├── HoursWidget.astro
│   │   ├── ContactSection.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   └── index.astro              ← one-pager
│   ├── lib/
│   │   ├── hours.ts                 ← logique "ouvert maintenant ?"
│   │   └── content.ts               ← helpers d'accès au contenu
│   └── styles/
│       └── global.css
├── public/
│   ├── admin/
│   │   ├── index.html               ← entrée Decap CMS
│   │   └── config.yml               ← schéma des collections côté CMS
│   └── uploads/                     ← photos uploadées par le gérant
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── netlify.toml                     ← config build + redirects + Identity
└── package.json
```

### 5.4 Découpage en unités

| Unité | Responsabilité unique | Dépend de |
|---|---|---|
| `src/lib/hours.ts` | Calcul "ouvert maintenant" + prochaine ouverture | Aucune |
| `src/lib/content.ts` | Charger les collections + types exportés | Astro Content Collections |
| `src/content/config.ts` | Schémas Zod (validation) | Zod, Astro |
| `OpenBadge.astro` | Render badge ouvert/fermé | `hours.ts` |
| `MenuSection.astro` | Render menu groupé + filtres | `content.ts` |
| `DishCard.astro` | Render un plat (photo, prix, tags, variantes) | Aucune (props pures) |
| `HoursWidget.astro` | Render le tableau des 7 jours | `content.ts` |
| `public/admin/config.yml` | Définit les formulaires côté gérant | Decap |

Chaque composant Astro reçoit ses données en `props` uniquement → testable et compréhensible isolément.

### 5.5 Configuration Decap CMS (`public/admin/config.yml`)

`config.yml` mappe une-à-une les collections définies en § 4. Champs traduits en français pour le gérant. Widgets utilisés :

- `string` pour les noms, slogans
- `text` (multiline) pour les descriptions
- `markdown` pour les mentions légales
- `number` pour les prix
- `image` pour les photos (upload vers `public/uploads/`)
- `select` pour la catégorie d'un plat (options chargées dynamiquement)
- `list` (multiple) pour les tags
- `boolean` pour `disponible`, `ferme`
- `object` pour les variantes
- `relation` pour lier plat → catégorie

### 5.6 Sécurité & accès admin

- Route `/admin` est techniquement publique mais Decap exige un login Netlify Identity avant d'autoriser quelque écriture
- Compte gérant créé par invitation depuis le dashboard Netlify (un seul compte en v1)
- Decap valide les types via `config.yml` → le gérant ne peut pas écrire de contenu malformé
- Les uploads d'images sont scopés à `public/uploads/`
- HTTPS forcé via Netlify
- Aucun secret côté client (pas d'API tierce nécessitant clé)

### 5.7 Hébergement & coûts

| Poste | Coût |
|---|---|
| Netlify free tier (100 GB/mois) | 0 € |
| Decap CMS | 0 € |
| Netlify Identity (5 utilisateurs gratuits) | 0 € |
| GitHub repo | 0 € |
| Domaine `.fr` ou `.com` | ~12 €/an |
| **Total annuel** | **~12 €** |

---

## 6. Logique métier — Calcul "Ouvert maintenant ?"

Module pur dans `src/lib/hours.ts`. Implémentation côté client (JS) car dépend de l'heure courante du visiteur.

### Entrées

- `schedule` : map jour → `{ ferme, ouverture, fermeture }`
- `fermetures_exceptionnelles` : array `{ date, raison }`
- `now` : `Date` (injectée pour testabilité)

### Sortie

```ts
type OpenStatus =
  | { status: "open"; closesAt: string }
  | { status: "closed"; reason: "exceptional"; details: string }
  | { status: "closed"; opensAt?: string; openDay?: string };
```

`opensAt` et `openDay` sont absents si aucun jour des 7 prochains jours n'est ouvert (cas extrême : tout fermé).

### Règles

1. Si la date courante est dans `fermetures_exceptionnelles` → `closed` avec `reason: "exceptional"` et raison
2. Sinon, vérifier deux fenêtres possibles d'ouverture qui couvrent l'instant `now` :
   - **Fenêtre A** (jour courant) : `now` est dans `[ouverture_aujourd'hui, fermeture_aujourd'hui]`. Si `fermeture_aujourd'hui < ouverture_aujourd'hui`, la fenêtre s'étend jusqu'au lendemain à `fermeture_aujourd'hui`
   - **Fenêtre B** (queue de la veille) : la veille avait `fermeture_veille < ouverture_veille` ET `now` (heure aujourd'hui, avant `fermeture_veille`) est dans la queue de la veille
3. Si A ou B vraie → `open`, `closesAt` = fermeture de la fenêtre active
4. Sinon → `closed`, calculer prochaine ouverture en parcourant jusqu'à 7 jours en avant ; si tous fermés, `opensAt` et `openDay` absents
5. Limite de fermeture (`now == fermeture`) considérée comme `closed`. Limite d'ouverture (`now == ouverture`) considérée comme `open`

### Test plan

- 8 cas unitaires minimum (cf. § 8.1)
- Module pur, sans I/O → tests Vitest rapides

---

## 7. UX détaillée — Comportements clés

### 7.1 Mobile (priorité)

- Hero plein écran, texte centré, badge OUVERT visible immédiatement
- Bouton flottant "Appeler" en bas à droite (rose néon, accessible en permanence) → `tel:`
- Filtres catégories : chips horizontales scrollables, sticky en haut au scroll dans la section Menu
- Cards plats en colonne unique, photo carrée, contenu sous la photo
- Tap sur photo → modale plein écran avec photo + description longue + prix

### 7.2 Desktop

- Header sticky avec nav horizontale (Menu / Commander / Horaires / Contact)
- Hero garde la photo en background, contenu centré max-width 1200px
- Cards plats en grille 3 colonnes
- Pas de bouton flottant (le tel est dans le header)

### 7.3 Accessibilité

- Contrastes vérifiés WCAG AA minimum (texte cream sur fond green-deep = OK)
- Navigation clavier complète (focus visibles avec ring néon)
- Alt text sur toutes les images (auto-généré depuis `nom` du plat si non fourni)
- `prefers-reduced-motion` respecté → désactive pulse, fade-in, glow animé

### 7.4 Performance

- Cible Lighthouse mobile : Performance ≥ 90, Accessibilité ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Images servies en WebP avec fallback JPEG (Astro Image)
- Photos plats lazy-loadées
- Total JS shipping < 30 KB (Astro = 0 JS par défaut)
- Fonts auto-hébergées via `@fontsource` ou subset Google Fonts

### 7.5 SEO

- Meta tags : title, description, OpenGraph, Twitter Card
- Schema.org `Restaurant` JSON-LD avec adresse, téléphone, horaires, géo
- Sitemap XML auto-généré
- robots.txt
- Mots-clés cibles : "snack Amiens nuit", "tacos Amiens", "kebab Amiens", "Resto Night"

---

## 8. Plan de tests

### 8.1 Tests unitaires (Vitest)

Module `src/lib/hours.ts` :

- ✅ Mardi 19h00 (ouverture 18:00 → 02:00) → `open`
- ✅ Mardi 01:30 (queue de lundi 18:00 → 02:00) → `open`
- ✅ Mardi 03:00 (après fermeture 02:00) → `closed`
- ✅ Jour avec `ferme: true` → `closed`, calcule prochaine ouverture
- ✅ Date dans `fermetures_exceptionnelles` → `closed` avec raison
- ✅ Tous jours fermés → `closed` sans `opensAt`
- ✅ Limite exacte d'ouverture (18:00:00) → `open`
- ✅ Limite exacte de fermeture (02:00:00) → `closed`

### 8.2 Tests d'intégration

- Build Astro réussit avec contenu vide (collections vides)
- Build Astro réussit avec contenu peuplé d'exemples
- Decap CMS charge correctement (smoke test sur `/admin`)
- Validation Zod rejette un plat sans `prix`

### 8.3 Tests manuels (golden path)

- Visiteur arrive → voit hero + badge → scrolle → voit menu → tape téléphone → appel se lance
- Visiteur en mode "fermé" → voit badge fermé + prochaine ouverture
- Gérant login `/admin` → modifie un prix → publie → site rebuild → prix à jour en ~30s
- Gérant ajoute un plat avec photo → photo apparaît sur le site
- Gérant marque un plat `disponible: false` → plat masqué

### 8.4 Tests responsive

- Chrome DevTools : iPhone SE, iPhone 14, iPad, desktop 1440px
- Réel : test sur un téléphone Android et un iPhone

---

## 9. Livrables v1

1. Repo GitHub `restonight` initialisé avec le code Astro
2. Site déployé sur Netlify (`restonight.netlify.app` puis domaine custom)
3. Compte Netlify Identity créé pour le gérant + invitation envoyée
4. CMS configuré avec exemples de contenu peuplés (au moins 1 plat par catégorie)
5. Documentation gérant courte (1 page PDF/Markdown) : "Comment modifier mon menu" — captures d'écran de Decap, étapes pas à pas
6. Tests unitaires `hours.ts` passants
7. Score Lighthouse mobile vérifié sur la page de prod

---

## 10. Hors-scope (v2 et au-delà)

À garder en tête comme évolutions naturelles :

- Système de commande/paiement maison (Stripe + panier)
- Programme fidélité / coupons
- Multi-langue (anglais pour étudiants étrangers)
- Blog / actualités (post Decap déjà supporté, juste à activer)
- Newsletter
- Multi-comptes admin avec rôles
- Gestion de stock par plat
- Statistiques de visite (Plausible / Umami self-hosted)

---

## 11. Risques & mitigations

| Risque | Mitigation |
|---|---|
| Le gérant trouve l'admin trop complexe | Doc utilisateur PDF + onboarding 30 min en visio |
| Le gérant supprime accidentellement du contenu | Historique Git → restauration en 1 commit |
| Limite Netlify free tier dépassée (>100 GB/mois) | Optimiser images, sinon passer plan payant 19$/mois (très peu probable pour un snack) |
| Photos de mauvaise qualité uploadées | Decap a un widget `image` avec preview ; on documente "photo carrée 1000×1000 minimum"
| Images uploadées trop lourdes | Astro Image redimensionne au build → poids final maîtrisé |
| Domaine déjà pris | Vérifier `restonight.fr`, sinon `resto-night.fr` ou `restonight-amiens.fr` |
