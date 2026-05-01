# Resto Night — Handoff

**🌐 Site live :** https://restonight.netlify.app
**🔐 Admin :** https://restonight.netlify.app/admin/ *(activable une fois Identity configuré, voir étape 2 ci-dessous)*
**📦 Repo GitHub :** https://github.com/ilyasx64/restonight
**📊 Dashboard Netlify :** https://app.netlify.com/projects/restonight

---

## ✅ Déjà fait

- Code complet et testé (24 tasks, 9 tests unitaires, type-check 0 erreur)
- Push sur GitHub `ilyasx64/restonight` (branche `main`, tag `v1.0.0`)
- Site Netlify créé et **premier déploiement effectué** via CLI
- Site public accessible et fonctionnel

## 🔧 À faire pour activer le CMS (3 étapes dans le dashboard Netlify)

Le code et le déploiement sont OK, mais le **CMS au /admin** ne marchera pas tant que ces 3 cases ne sont pas cochées.

### Étape 1 — Connecter Netlify au repo GitHub (auto-deploy + git-gateway)

Sans ça, les modifs du gérant ne seront pas commitées (Decap a besoin de git-gateway, qui a besoin que Netlify connaisse le repo).

1. Aller sur https://app.netlify.com/projects/restonight
2. **Site configuration** → **Build & deploy** → **Continuous deployment** → **Link repository**
3. Choisir GitHub → Authoriser l'app Netlify si demandé
4. Sélectionner `ilyasx64/restonight`, branche `main`
5. Build settings : déjà détectés depuis `netlify.toml` (build = `npm run build`, publish = `dist`)
6. Cliquer **Save**

Désormais : chaque push sur `main` déclenche un rebuild automatique (~1 min).

### Étape 2 — Activer Identity + Git Gateway

1. Dashboard Netlify → onglet **Integrations** ou **Identity** (selon UI version)
2. **Enable Identity**
3. Dans Identity settings :
   - **Registration** → mettre sur **Invite only**
   - **Services** → **Git Gateway** → **Enable**
4. **Invite users** → inviter ton email (et celui du gérant si différent)

### Étape 3 — Confirmer l'invitation

1. Le destinataire reçoit un email "You've been invited..."
2. Cliquer le lien, définir un mot de passe
3. Aller sur https://restonight.netlify.app/admin/ → login → bingo, le CMS s'ouvre

---

## 🧪 Test end-to-end (après les 3 étapes ci-dessus)

1. Login `/admin/`
2. Aller dans "Plats" → modifier le prix d'un plat → **Publish**
3. Decap commit sur GitHub (visible dans `https://github.com/ilyasx64/restonight/commits/main`)
4. Netlify détecte le commit et rebuild (~30-60s)
5. Refresh la home → nouveau prix visible

---

## 🌐 (Optionnel) Domaine custom `restonight.fr`

1. Acheter `restonight.fr` chez Gandi / OVH / Namecheap (~12 €/an)
2. Netlify dashboard → **Domain management** → **Add a domain**
3. Suivre les instructions DNS (Netlify donne les enregistrements à mettre chez le registrar)
4. HTTPS auto via Let's Encrypt (~5 min après propagation DNS)
5. Mettre à jour le `site` dans `astro.config.mjs` → `https://restonight.fr` puis push

## 🎨 (Optionnel) Vraie photo de devanture

Le hero affiche actuellement juste un dégradé sombre (le fichier `/uploads/devanture-placeholder.jpg` n'existe pas).

Pour mettre la vraie photo :
1. Le gérant se connecte au CMS, va dans **Infos générales** → **Photo de la devanture** → upload
2. Ou : poser le fichier dans `public/uploads/` localement et push

---

## 🔧 Maintenance technique

| Action | Commande |
|---|---|
| Build local | `npm install && npm run dev` (ouvre http://localhost:4321) |
| Tests unitaires | `npm test` |
| Type check | `npm run check` |
| Build prod | `npm run build` |
| Deploy manuel | `npx netlify deploy --prod --build` (sans avoir besoin de push) |

Une fois GitHub connecté à Netlify (étape 1), `git push origin main` redéploie automatiquement.

## 🐛 Troubleshooting

| Symptôme | Cause probable | Solution |
|---|---|---|
| Page `/admin/` charge mais ne se connecte pas | Identity ou Git Gateway pas activés | Refaire étape 2 du handoff |
| `/admin/` blanc / erreur "no backend" | Le repo n'est pas linké à Netlify | Refaire étape 1 du handoff |
| Modifs CMS pas en ligne | Build Netlify pas terminé | Voir https://app.netlify.com/projects/restonight/deploys |
| Build Netlify échoue | Erreur TS ou contenu invalide | Voir les deploy logs ; reproduire avec `npm run check` |
| Photo upload trop lourde | Astro optimise mais < 2 MB recommandé en source | Compresser avant upload |
| Décalage horaire badge OUVERT | Toujours utiliser `nowInParis()` | Déjà géré dans `OpenBadge.astro` |

## 💰 Coût annuel

| Poste | Coût |
|---|---|
| Netlify free tier (100 GB/mois) | 0 € |
| Decap CMS | 0 € |
| Netlify Identity (jusqu'à 5 utilisateurs) | 0 € |
| GitHub repo public | 0 € |
| Domaine `.fr` (optionnel) | ~12 €/an |
| **Total annuel** | **~12 €** *(uniquement si domaine custom)* |

## 🏗️ Architecture en bref

- **Astro 5** — génère du HTML statique au build
- **Tailwind 4** — styling, palette custom vert bouteille + néon rose
- **Decap CMS** — interface admin web, écrit en Markdown/JSON dans GitHub
- **Netlify Identity** — authentification du gérant (email + mot de passe)
- **Netlify** — hébergement, CDN mondial, HTTPS auto, rebuild auto à chaque commit
- **Spec & plan** — `docs/superpowers/specs/` et `docs/superpowers/plans/`
