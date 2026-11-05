# ADV Service CIV

Site vitrine d'ADV Service CIV — meubles et aménagements sur mesure (cuisine, dressing, salon, bureau, portes PVC, déco intérieure) à Port-Bouet, Gonzagueville (Abidjan).

## 🛠️ Technologies

- Nuxt 3
- Vue 3
- Tailwind CSS

## 💻 Lancer le projet en local

Prérequis : Node.js (version LTS recommandée).

```bash
npm install
cp .env.example .env   # puis renseigner NUXT_PUBLIC_DEVIS_ENDPOINT (facultatif en local)
npm run dev
```

Le site sera accessible à l'adresse indiquée dans le terminal Nuxt.

## 📁 Structure

```
├── .github/workflows/deploy-pages.yml   # déploiement GitHub Pages
├── app.vue
├── assets/css/main.css                  # styles globaux, boutons, animations
├── components/                          # AppIcon, PageHero, CTAFinal, Manifesto, PrestationsGrid,
│                                        # DevisForm, DevisSection, GalerieInterieurs, PrestationCard, PrestationDetail…
├── data/
│   ├── prestations.js                   # contenu des 6 prestations
│   └── galerie.js                       # photos de la galerie, classées par prestation
├── layouts/default.vue                  # en-tête + page + pied de page
├── pages/
│   ├── index.vue
│   ├── qui-sommes-nous.vue
│   ├── realisations.vue
│   ├── contact.vue
│   └── prestations/                     # index.vue + une page par prestation
├── plugins/reveal.js                    # directive v-reveal (apparition au défilement)
├── public/images/interieurs/            # photos
└── utils/asset.js                       # préfixe les chemins d'images pour GitHub Pages
```

- **Ajouter une photo** : la déposer dans `public/images/interieurs/` puis ajouter une ligne dans `data/galerie.js`.
- **Ajouter une prestation** : une entrée dans `data/prestations.js` et un fichier `pages/prestations/<cle>.vue` (copier `cuisine.vue` et changer le `slug`).
- **Afficher une image** : toujours passer par `asset('/images/...')`, sinon elle ne s'affiche pas sur GitHub Pages.

## ✉️ Formulaire de devis

Le site est statique : les demandes sont envoyées à un service de formulaires (ex. [Formspree](https://formspree.io)), qui les transfère par e-mail.

1. Créer un formulaire sur le service et copier son adresse (ex. `https://formspree.io/f/xxxxxxx`).
2. Dans le dépôt GitHub : **Settings → Secrets and variables → Actions → Variables** → créer `DEVIS_ENDPOINT` avec cette adresse.
3. En local, la mettre dans `.env` (`NUXT_PUBLIC_DEVIS_ENDPOINT=...`).

Tant que cette adresse n'est pas renseignée, le formulaire affiche un message invitant à appeler le 07 78 29 19 53.

## 🚀 Déploiement GitHub Pages

Le déploiement est automatisé par GitHub Actions à chaque push sur la branche `main`.

Pour activer GitHub Pages dans le dépôt :

1. Ouvrir **Settings → Pages**.
2. Dans **Build and deployment**, choisir **GitHub Actions** comme source.
3. Vérifier l'exécution du workflow dans l'onglet **Actions**.
4. Une fois le déploiement terminé, le site est en ligne sur `https://<compte>.github.io/<nom-du-depot>/`.

Le site est généré en version statique avec `npm run generate`.
# adv_service_civ
