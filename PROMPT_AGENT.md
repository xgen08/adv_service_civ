# Contexte du projet — Site ADV Service CIV

Tu reprends un projet Nuxt 3 déjà scaffoldé et fonctionnel (build vérifié sans erreur). Voici tout ce qu'il faut savoir pour continuer à travailler dessus.

## 1. Le client et le besoin

ADV Service CIV est une entreprise de prestation de services d'aménagement de meubles sur mesure, basée à Port-Bouet, Gonzagueville (Abidjan). Six domaines d'intervention :
1. **Cuisine sur mesure** — cuisines équipées, bois ou laquées
2. **Dressing & chambre** — penderies, dressings, têtes de lit capitonnées
3. **Salon & séjour** — meubles TV, rangements
4. **Bureau** — aménagement d'espaces de travail
5. **Portes PVC** — portes intérieures et PVC
6. **Déco intérieure** — finitions et touches décoratives

Positionnement de marque (repris du flyer fourni par le client) : **"L'exigence du sur-mesure — Design, Qualité, Durabilité"**. Ton artisanal/atelier, pas industriel. Baseline : *"La perfection dans chaque détail."*

Contact : Tél 07 78 29 19 53 / 01 40 33 24 44 — Facebook : ADV Service CIV.

C'est un **site vitrine** (pas de vente en ligne) : présentation + portfolio + formulaire de demande de devis.

## 2. Origine du contenu — important

Le client a fourni deux flyers photographiés (HEIC) en guise de brief. Ils contiennent :
- Le texte de positionnement, les 4 piliers (Sur-mesure/Qualité/Expertise/Durabilité) et les coordonnées — **repris tels quels** dans le site
- Des photos de réalisations (cuisines, dressings, chambres, portes) — **non réutilisées**. Ce sont des photos imprimées puis re-photographiées sur un écran : qualité insuffisante pour un site pro (grain d'impression, reflets, perspective). Un essai d'extraction a été fait et abandonné pour cette raison.

**Conséquence directe sur le code** : toutes les zones image du site utilisent le composant `components/PortfolioPlaceholder.vue` — une carte de marque (dégradé bois + icône + texte "Photo à venir") plutôt que de vraies photos. C'est volontaire, pas un oubli. Dès que le client fournit les photos originales (haute résolution, probablement disponibles chez lui en dehors du flyer imprimé), il faut :
1. Les déposer dans `public/images/` (à créer)
2. Remplacer les usages de `<PortfolioPlaceholder>` par de vraies balises `<img>` ou `<NuxtImg>` aux endroits concernés (`pages/index.vue`, `pages/realisations.vue`, `pages/prestations/[slug].vue`, `pages/prestations/index.vue`)

Le bureau et le salon n'ont aucune photo de référence dans les flyers (le client l'a confirmé) — contenu textuel uniquement pour ces deux prestations pour l'instant.

Le contenu de `pages/qui-sommes-nous.vue` est rédigé par l'agent précédent à partir du ton du flyer (le client n'a pas fourni de texte "qui sommes-nous" lui-même) — à faire valider/ajuster avec le client sur les détails factuels (année de création, nombre de projets, etc.).

## 3. Stack technique

- **Nuxt 3** (Vue 3, file-based routing dans `pages/`)
- **@nuxtjs/tailwindcss**
- Police display : **Fraunces** (serif chaleureuse, choisie pour l'identité artisanale) ; corps de texte : **Work Sans** ; utilitaire : **IBM Plex Mono**
- Pas de base de données. `components/DevisForm.vue` envoie les demandes à `server/api/devis.post.ts`, qui valide, filtre le spam (champ piège + limite de débit) et transmet par e-mail via Resend. Variables d'environnement : voir `.env.example`.

Commandes :
```bash
npm install
npm run dev
npm run build
```

## 4. Structure des fichiers

```
adv-service-civ/
├── nuxt.config.ts          # config Nuxt, meta SEO, polices Google Fonts
├── tailwind.config.js      # tokens de design — voir section 5
├── app.vue
├── assets/css/main.css     # styles globaux, boutons, animations
├── data/prestations.js     # contenu des 6 prestations (label, tagline, intro, points, icône)
├── layouts/default.vue     # header + <slot /> + footer
├── components/
│   ├── TheHeader.vue       # nav sticky, sous-menu "Nos prestations" au survol
│   ├── TheFooter.vue
│   ├── DevisForm.vue       # formulaire réutilisable, utilisé sur Contact + chaque page prestation
│   └── PortfolioPlaceholder.vue   # carte placeholder image (voir section 2)
└── pages/
    ├── index.vue
    ├── qui-sommes-nous.vue
    ├── realisations.vue                # galerie par catégorie (placeholders)
    ├── contact.vue
    └── prestations/
        ├── index.vue                   # liste des 6 prestations
        └── [slug].vue                  # page dynamique, lit data/prestations.js
```

La page `prestations/[slug].vue` est **dynamique** : les 6 prestations viennent de `data/prestations.js`, pas de 6 fichiers séparés. Pour ajouter une 7ᵉ prestation, ajouter une entrée dans ce fichier plutôt que créer une nouvelle page.

## 5. Système de design (à respecter si tu ajoutes des pages/composants)

Direction : identité artisanale/menuiserie, tons bois chauds — à l'opposé d'un site "corporate". Palette extraite par analyse de pixels du vrai logo du client (médaillon bois gravé avec outils de menuisier), définie dans `tailwind.config.js` :

- `cream` `#F7F1E6` — fond principal
- `linen` `#EFE4D2` — variante de fond
- `oak` `#F2D8B7` — bois clair
- `amber` `#D79354` — accent principal / CTA
- `walnut` `#6B4A32` — accent secondaire, eyebrows
- `espresso` `#352B22` — fonds foncés (header, footer)
- `charcoal` `#262220` — texte courant
- `white` `#FFFFFF`

**Typographie** : `font-display` (Fraunces, titres), `font-body` (Work Sans), `font-mono` (IBM Plex Mono, labels/eyebrows).

**Séparateur à damier (`.joint-divider`)** : retiré à la demande du client (novembre 2026). Ne pas le réintroduire ; les sections s'enchaînent par leurs changements de fond.

**Classe utilitaire** `.eyebrow` — petit label mono, majuscules, espacé, couleur `walnut` (ou `!text-amber` sur fond foncé), au-dessus de chaque titre de section.

## 6. Ce qui est mocké et doit être finalisé

1. **Formulaire de devis** — ✅ branché (Resend). Reste à faire : renseigner `NUXT_RESEND_API_KEY` et `NUXT_DEVIS_TO` sur l'hébergeur, et vérifier un domaine dans Resend pour l'expéditeur `NUXT_DEVIS_FROM`.
2. **Toutes les images** — voir section 2. Remplacer `PortfolioPlaceholder` par de vraies photos dès réception.
3. **`pages/qui-sommes-nous.vue`** — texte à valider avec le client.
4. **Bureau et Salon** — aucune photo de référence pour l'instant ; à enrichir si le client fournit des réalisations dans ces catégories.

## 7. Contraintes à garder en tête

- Site **vitrine uniquement**, pas de paiement en ligne ni de panier.
- Contenu en français, ton artisanal et direct, cohérent avec le flyer d'origine.
- Ne pas réutiliser la palette "bois" d'ADV Service CIV pour d'autres projets du portefeuille (ACOGIM-CI a sa propre identité, orange/bleu issue de son propre logo) — chaque client garde sa propre identité visuelle.
- Rester responsive (menu burger dans `TheHeader.vue`) et garder le focus clavier visible (règle globale dans `main.css`).
