/** @type {import('tailwindcss').Config} */
// Syntaxe ESM (export default) : le projet est en "type": "module" (package.json).
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Fonds
        bone: '#F5F0E8',
        parchment: '#EBE4D8',
        sand: '#E0D5C5',

        // Matière
        clay: '#C4A882',
        copper: '#A67C52',
        bronze: '#8B6F47',
        walnut: '#5C4033',
        ebony: '#2A2420',

        // Texte
        ink: '#1A1714',
        graphite: '#4A4540',
        stone: '#8A8279',

        // Blanc cassé (cartes, éléments clairs)
        ivory: '#FAF7F2'
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1' }]
      }
    }
  },
  plugins: []
}
