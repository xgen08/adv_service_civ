<script setup>
import { galerie } from '~/data/galerie.js'
import { prestations } from '~/data/prestations.js'

useHead({ title: 'Réalisations — ADV Service CIV' })

// Filtres : uniquement les prestations qui ont au moins une photo.
const compte = (slug) => (slug === 'tous' ? galerie.length : galerie.filter((p) => p.prestation === slug).length)
const filtres = [
  { slug: 'tous', label: 'Tous' },
  ...Object.entries(prestations)
    .filter(([slug]) => compte(slug) > 0)
    .map(([slug, p]) => ({ slug, label: p.label }))
]
const actif = ref('tous')
const visibles = computed(() => (actif.value === 'tous' ? galerie : galerie.filter((p) => p.prestation === actif.value)))

// Prestations pas encore présentes dans la galerie.
const aVenir = Object.entries(prestations)
  .filter(([slug]) => compte(slug) === 0)
  .map(([slug, p]) => ({ slug, ...p }))
</script>

<template>
  <div>
    <PageHero
      eyebrow="Réalisations"
      image="/images/interieurs/salon-appartement-colore.jpg"
      lead="Cuisines, salons, espaces professionnels : un aperçu des intérieurs et du mobilier sur mesure. La galerie s'enrichit au fil des chantiers."
    >
      Nos projets, <span>pièce par pièce.</span>
    </PageHero>

    <section class="py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col gap-8 mb-12">
          <div>
            <p v-reveal class="eyebrow mb-4">La galerie</p>
            <h2 v-reveal="100" class="section-title">
              Des intérieurs <span class="text-copper italic">sur mesure.</span>
            </h2>
          </div>
          <div v-reveal="200" class="flex flex-wrap gap-2" role="group" aria-label="Filtrer par prestation">
            <button
              v-for="f in filtres"
              :key="f.slug"
              type="button"
              :aria-pressed="actif === f.slug"
              class="inline-flex items-center gap-2 px-4 py-2 border text-[13px] font-medium transition-colors duration-300"
              :class="actif === f.slug
                ? 'bg-ebony text-bone border-ebony'
                : 'border-walnut/25 text-graphite hover:bg-ebony hover:text-bone hover:border-ebony'"
              @click="actif = f.slug"
            >
              {{ f.label }}
              <span
                class="min-w-5 h-5 px-1.5 font-mono text-[11px] flex items-center justify-center"
                :class="actif === f.slug ? 'bg-copper text-ink' : 'bg-walnut/10'"
              >{{ compte(f.slug) }}</span>
            </button>
          </div>
        </div>

        <GalerieInterieurs :key="actif" :photos="visibles" :featured="visibles.length >= 3" />
      </div>
    </section>

    <!-- Prestations pas encore présentes dans la galerie -->
    <section v-if="aVenir.length" class="bg-parchment py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <p v-reveal class="eyebrow mb-4">Aussi sur mesure</p>
        <h2 v-reveal="100" class="section-title mb-10 max-w-2xl">
          D'autres savoir-faire, <span class="text-copper italic">à découvrir.</span>
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(p, i) in aVenir" :key="p.slug" v-reveal="i * 120">
            <PrestationCard :slug="p.slug" :prestation="p" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
