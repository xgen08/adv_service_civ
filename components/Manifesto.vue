<script setup>
// Bandeau des 4 piliers de la marque (repris du flyer), sur fond sombre.
const piliers = [
  { titre: 'Sur-mesure', description: 'Chaque projet est unique, pensé selon vos besoins.' },
  { titre: 'Qualité', description: 'Matériaux sélectionnés et finitions soignées.' },
  { titre: 'Expertise', description: 'Savoir-faire artisanal et techniques modernes.' },
  { titre: 'Durabilité', description: 'Des réalisations conçues pour durer dans le temps.' }
]
</script>

<template>
  <section class="bg-ebony text-bone py-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="text-center mb-16">
        <h2 v-reveal class="font-display text-4xl md:text-5xl mb-4">
          Nous cherchons l'excellence avant tout
        </h2>
        <p v-reveal="100" class="font-body text-bone/70 max-w-2xl mx-auto">
          Chaque projet est une opportunité de repousser les limites du sur-mesure.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        <div v-for="(pilier, i) in piliers" :key="pilier.titre" v-reveal="i * 100" class="text-center group">
          <div class="w-20 h-20 bg-copper rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
            <span class="font-display text-3xl text-ink">{{ i + 1 }}</span>
          </div>
          <h3 class="font-display text-2xl mb-3">{{ pilier.titre }}</h3>
          <p class="font-body text-sm text-bone/60 leading-relaxed">
            {{ pilier.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
