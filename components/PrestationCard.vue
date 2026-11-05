<script setup>
// Carte d'une prestation : image en haut (photo de data/prestations.js, sinon
// la carte PortfolioPlaceholder « Photo à venir »), texte en dessous.
defineProps({
  slug: { type: String, required: true },
  prestation: { type: Object, required: true },
  num: { type: Number, default: 0 },
  // Texte sous le titre (par défaut : la tagline).
  desc: { type: String, default: '' },
  headingTag: { type: String, default: 'h3' }
})
</script>

<template>
  <NuxtLink
    :to="`/prestations/${slug}`"
    class="group flex flex-col h-full bg-ivory shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-b-4 border-transparent hover:border-copper"
  >
    <!-- Image -->
    <div class="aspect-[4/3] bg-parchment relative overflow-hidden">
      <img
        v-if="prestation.image"
        :src="asset(prestation.image)"
        :alt="prestation.label"
        :style="{ objectPosition: prestation.imagePosition }"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <PortfolioPlaceholder v-else :label="prestation.label" :icon="prestation.icon" class="!aspect-auto h-full" />

      <!-- Numéro en badge -->
      <div
        v-if="num"
        class="absolute top-4 left-4 bg-copper text-ink w-10 h-10 rounded-full flex items-center justify-center font-display text-lg shadow-lg"
      >
        {{ num }}
      </div>
    </div>

    <!-- Contenu -->
    <div class="p-8 flex flex-col flex-1">
      <component :is="headingTag" class="font-display text-2xl text-ink mb-3 group-hover:text-copper transition-colors">
        {{ prestation.label }}
      </component>
      <p class="font-body text-sm text-graphite line-clamp-2 mb-4">
        {{ desc || prestation.tagline }}
      </p>
      <div class="mt-auto flex items-center gap-2 text-walnut font-body text-sm">
        <span>Découvrir</span>
        <span class="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </NuxtLink>
</template>
