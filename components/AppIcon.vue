<script setup>
// Icônes du site, au trait, couleur héritée du texte (currentColor).
// Usage : <AppIcon name="cuisine" class="w-8 h-8 text-copper" />
defineProps({
  name: { type: String, required: true },
  strokeWidth: { type: [Number, String], default: 1.5 }
})

const paths = {
  // Prestations (clé "icon" de data/prestations.js)
  cuisine: 'M4 20h16M6 20V9a2 2 0 012-2h8a2 2 0 012 2v11M9 7V4h6v3M9 13h6',
  dressing: 'M12 3v4M5 7h14l-1 4H6L5 7zM6 11v9h12v-9M9 20v-5h6v5',
  salon: 'M4 18v-4a2 2 0 012-2h12a2 2 0 012 2v4M4 18h16M4 18v2M20 18v2M6 12V8a2 2 0 012-2h8a2 2 0 012 2v4',
  bureau: 'M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6',
  porte: 'M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17M6 21h12M15 12v.01',
  deco: 'M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3zM5 17l.8 2 2 .8-2 .8L5 22l-.8-2-2-.8 2-.8L5 17z',
  // Piliers
  'sur-mesure': 'M12 2l9 5v10l-9 5-9-5V7l9-5zM12 2v20',
  qualite: 'M12 2l2.9 6.3L21 9.3l-4.5 4.4L17.8 20 12 16.8 6.2 20l1.3-6.3L3 9.3l6.1-1z',
  expertise: 'M14.7 6.3a4 4 0 11-5.6 5.6L4 17v3h3l5.1-5.1a4 4 0 012.6-8.6z',
  durabilite: 'M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z',
  // Coordonnées
  'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  // Interface
  agrandir: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7'
}
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.cuisine" />
  </svg>
</template>
