<script setup>
// Grille des 6 prestations (accueil). Contenu : data/prestations.js.
// Les cartes elles-mêmes sont dans components/PrestationCard.vue.
import { prestations } from '~/data/prestations.js'

const list = Object.entries(prestations).map(([slug, p]) => ({ slug, p }))
</script>

<template>
  <section class="bg-parchment py-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p v-reveal class="eyebrow mb-4">Nos prestations</p>
          <h2 v-reveal="100" class="font-display text-4xl md:text-6xl text-ink leading-tight">
            Du dressing à la cuisine,<br />
            <span class="italic text-copper">chaque pièce sur mesure.</span>
          </h2>
        </div>
        <NuxtLink
          v-reveal="200"
          to="/prestations"
          class="bg-copper text-ink px-8 py-3 font-body text-sm tracking-wide uppercase hover:bg-bone transition-colors duration-300 shadow-lg self-start md:self-auto"
        >
          Toutes les prestations →
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(item, i) in list" :key="item.slug" v-reveal="(i % 3) * 120">
          <PrestationCard :slug="item.slug" :prestation="item.p" :num="i + 1" />
        </div>
      </div>
    </div>
  </section>
</template>
