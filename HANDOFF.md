# Resto Night — Handoff

Site URL (after deploy) : https://restonight.netlify.app
Admin URL : https://restonight.netlify.app/admin/

## Pour le gérant

1. Aller sur l'URL admin avec un navigateur
2. Se connecter avec l'email invité (tu recevras une invitation par email après la mise en ligne)
3. Modifier menu, horaires, photos depuis l'interface en français
4. Cliquer "Publish now" → site mis à jour en ~30 secondes

## Étapes restantes pour la mise en ligne

Le code est complet et testé localement. Il reste à :

### 1. Pousser le code sur GitHub

```bash
cd "c:/Users/ilyas/Desktop/RestoNight"
gh repo create restonight --public --source=. --remote=origin --push
```

(ou créer un repo manuellement sur github.com puis `git remote add origin <url> && git push -u origin main`)

### 2. Connecter Netlify

1. Sign in sur https://app.netlify.com
2. "Add new site" → "Import an existing project" → sélectionner le repo `restonight`
3. La build command est auto-détectée depuis `netlify.toml`
4. Cliquer "Deploy"
5. Attendre la fin du build (~1 minute)

### 3. Activer Netlify Identity et Git Gateway

Une fois le site déployé sur Netlify :

1. Aller dans "Site settings" → "Identity" → cliquer "Enable Identity"
2. "Identity" → "Registration" → définir sur "Invite only"
3. "Identity" → "Services" → "Git Gateway" → cliquer "Enable Git Gateway"
4. "Identity" → "Invite users" → inviter l'email du gérant
5. Le gérant reçoit un email de confirmation, clique sur le lien, définit son mot de passe
6. Il peut maintenant se connecter sur `restonight.netlify.app/admin/`

### 4. (Optionnel) Domaine custom

1. Acheter `restonight.fr` (Gandi, OVH, Namecheap — ~12€/an)
2. Netlify "Domain settings" → "Add custom domain" → suivre les instructions DNS
3. HTTPS est automatique

### 5. Test end-to-end

Après l'invitation acceptée :
1. Le gérant se connecte à `/admin/`
2. Modifie un champ (ex. le slogan)
3. Clique "Publish"
4. Attendre ~30s → la modification est visible sur le site public

## Maintenance technique

- **Repo** : github.com/<your-handle>/restonight
- **Build local** : `npm install && npm run dev`
- **Tests** : `npm test`
- **Type check** : `npm run check`
- **Déploiement** : automatique à chaque push sur `main`

## Troubleshooting

| Symptôme | Cause probable | Solution |
|---|---|---|
| Build Netlify échoue | Erreur TS ou contenu invalide | Voir les deploy logs Netlify, lancer `npm run check` localement |
| Gérant ne peut pas se connecter | Identity ou Git Gateway pas activés | Vérifier "Identity → Users" et "Identity → Services → Git Gateway" |
| Modifs CMS pas en ligne | Build en cours ou échec | Voir Netlify "Deploys" — délai normal ~30s |
| Photo trop lourde | Astro l'optimise au build mais < 2 MB recommandé | Demander au gérant de redimensionner avant upload |
| Décalage horaire badge OUVERT | Conversion Paris/UTC | Vérifier que `nowInParis()` est bien utilisé dans `OpenBadge.astro` |

## Coût annuel estimé

| Poste | Coût |
|---|---|
| Netlify free tier (100 GB/mois bande passante) | 0 € |
| Decap CMS | 0 € |
| Netlify Identity (jusqu'à 5 utilisateurs) | 0 € |
| GitHub repo public | 0 € |
| Domaine `.fr` (optionnel) | ~12 €/an |
| **Total annuel** | **~12 €** |

## Architecture en bref

- **Astro 5** : génère du HTML statique au build
- **Tailwind 4** : styling avec palette custom (vert bouteille + néon rose)
- **Decap CMS** : interface admin pour le gérant, écrit dans GitHub
- **Netlify** : héberge le site et déclenche le rebuild à chaque commit GitHub
- **Spec & plan** : voir `docs/superpowers/specs/` et `docs/superpowers/plans/`
