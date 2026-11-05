// image : photo de couverture (public/images/...). Sans image, la prestation
// affiche la carte PortfolioPlaceholder (« Photo à venir »).
// imagePosition (facultatif) : cadrage CSS object-position de la photo.
// Dressing et Portes PVC : photos d'illustration provisoires, à remplacer par
// de vraies réalisations.
export const prestations = {
  cuisine: {
    label: 'Cuisine sur mesure',
    icon: 'cuisine',
    image: '/images/interieurs/sejour-cuisine-ouverte.jpg',
    tagline: 'Cuisines équipées, pensées pour durer.',
    intro:
      "Conception et fabrication de cuisines sur mesure : meubles bas et hauts, îlot central, plan de travail et rangements optimisés selon la configuration de votre pièce.",
    points: [
      'Relevé de mesures et plan 3D avant fabrication',
      'Finitions bois, mat ou laqué, au choix',
      'Intégration des équipements électroménagers',
      'Plans de travail et crédences sur mesure'
    ]
  },
  dressing: {
    label: 'Dressing & chambre',
    icon: 'dressing',
    image: '/images/interieurs/buffet-bois-brut.jpg',
    tagline: 'Penderies, dressings et têtes de lit sur mesure.',
    intro:
      'Dressings, penderies et rangements de chambre conçus pour exploiter chaque recoin disponible, avec têtes de lit capitonnées et finitions assorties.',
    points: [
      'Dressings ouverts, fermés ou en niche',
      'Têtes de lit capitonnées sur mesure',
      'Optimisation du rangement selon vos besoins',
      'Portes coulissantes ou battantes, au choix'
    ]
  },
  salon: {
    label: 'Salon & séjour',
    icon: 'salon',
    image: '/images/interieurs/salon-villa-marbre.jpg',
    tagline: 'Meubles TV et rangements pour le salon.',
    intro:
      'Meubles TV, bibliothèques et rangements sur mesure pour organiser et sublimer votre salon, en harmonie avec le reste de votre intérieur.',
    points: [
      'Meubles TV intégrés avec rangement câblage',
      'Bibliothèques et étagères sur mesure',
      'Rangements muraux et banquettes',
      'Finitions assorties au reste de la maison'
    ]
  },
  bureau: {
    label: 'Bureau',
    icon: 'bureau',
    image: '/images/interieurs/espace-commercial.jpg',
    tagline: 'Espaces de travail sur mesure.',
    intro:
      "Aménagement de bureaux à domicile ou en entreprise : plans de travail, rangements et meubles pensés pour un espace de travail fonctionnel.",
    points: [
      'Plans de travail et caissons sur mesure',
      'Rangements et bibliothèques de bureau',
      'Aménagement pour particuliers et entreprises',
      'Finitions professionnelles et durables'
    ]
  },
  'portes-pvc': {
    label: 'Portes PVC',
    icon: 'porte',
    image: '/images/interieurs/salon-bois-gris.jpg',
    imagePosition: 'left center',
    tagline: 'Portes intérieures et PVC, résistantes et élégantes.',
    intro:
      "Fabrication et pose de portes intérieures et de portes PVC, alliant résistance à l'humidité, isolation et finitions soignées.",
    points: [
      'Portes PVC résistantes à l\'humidité',
      'Portes intérieures bois sur mesure',
      'Large choix de finitions et teintes',
      'Pose incluse par notre équipe'
    ]
  },
  'deco-interieure': {
    label: 'Déco intérieure',
    icon: 'deco',
    image: '/images/interieurs/salon-appartement-colore.jpg',
    tagline: 'Les finitions qui font la différence.',
    intro:
      'Conseils et réalisations de décoration intérieure pour harmoniser vos meubles sur mesure avec le reste de votre espace de vie.',
    points: [
      'Conseil en harmonisation des matériaux et teintes',
      'Finitions murales et revêtements décoratifs',
      'Petits agencements sur mesure',
      'Accompagnement du projet de A à Z'
    ]
  }
}
