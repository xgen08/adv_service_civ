<script setup>
// Mise en page commune des pages pages/prestations/<slug>.vue.
// Le contenu vient de data/prestations.js ; chaque page peut ajouter ses propres
// sections via le slot par défaut (affiché avant le formulaire de devis).
import { prestations } from '~/data/prestations.js'
import { galerie } from '~/data/galerie.js'

const props = defineProps({
  slug: { type: String, required: true }
})

const data = prestations[props.slug]
if (!data) {
  throw createError({ statusCode: 404, statusMessage: 'Prestation introuvable' })
}

useHead({
  title: `${data.label} — ADV Service CIV`,
  meta: [{ name: 'description', content: `${data.tagline} ${data.intro}` }]
})

const photos = galerie.filter((p) => p.prestation === props.slug)

// Prestations voisines, pour passer de l'une à l'autre.
const slugs = Object.keys(prestations)
const i = slugs.indexOf(props.slug)
const prevSlug = slugs[(i - 1 + slugs.length) % slugs.length]
const nextSlug = slugs[(i + 1) % slugs.length]
const prev = { slug: prevSlug, ...prestations[prevSlug] }
const next = { slug: nextSlug, ...prestations[nextSlug] }
</script>

<template>
  <div>
    <PageHero :eyebrow="`Nos prestations / ${data.label}`" :image="data.image" :lead="data.intro">
      {{ data.tagline }}
    </PageHero>

    <!-- Ce que nous réalisons -->
    <section class="bg-bone py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid gap-16 lg:grid-cols-2 items-center">
        <div v-reveal="{ from: 'left' }" class="relative">
          <img
            v-if="data.image"
            :src="asset(data.image)"
            :alt="data.label"
            :style="{ objectPosition: data.imagePosition }"
            loading="lazy"
            decoding="async"
            class="w-full aspect-[4/3] object-cover shadow-[0_20px_60px_rgba(42,36,32,0.15)]"
          />
          <PortfolioPlaceholder v-else :label="data.label" :icon="data.icon" class="shadow-[0_20px_60px_rgba(42,36,32,0.15)]" />
        </div>

        <div v-reveal="{ from: 'right', delay: 150 }">
          <p class="eyebrow mb-4">Ce que nous réalisons</p>
          <h2 class="font-display text-display-md text-ink mb-12">
            {{ data.label }},<br />
            <span class="italic text-copper">sur mesure.</span>
          </h2>
          <ul class="border-t border-ink/20">
            <li
              v-for="(point, n) in data.points"
              :key="point"
              class="group grid grid-cols-12 gap-4 py-6 border-b border-ink/20 hover:bg-parchment/50 transition-colors px-4 -mx-4"
            >
              <span class="col-span-2 sm:col-span-1 font-mono text-sm text-copper pt-1">{{ String(n + 1).padStart(2, '0') }}</span>
              <p class="col-span-10 sm:col-span-11 font-display text-xl md:text-2xl text-ink group-hover:text-copper transition-colors">
                {{ point }}
              </p>
            </li>
          </ul>
          <!-- Formulaire de la même page : la prestation y est déjà présélectionnée. -->
          <a
            href="#devis"
            class="group inline-flex items-center gap-3 bg-ebony text-bone px-8 py-4 font-body text-sm tracking-wide hover:bg-copper hover:text-ink transition-all duration-300 mt-12"
          >
            Demander un devis
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Galerie de la prestation (une seule photo = déjà montrée au-dessus) -->
    <section v-if="photos.length > 1" class="pb-24 md:pb-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <p v-reveal class="eyebrow mb-4">En images</p>
        <h2 v-reveal="100" class="section-title mb-12">Quelques <span class="text-copper italic">intérieurs.</span></h2>
        <GalerieInterieurs :photos="photos" :featured="photos.length >= 3" />
      </div>
    </section>

    <!-- Sections propres à la page -->
    <slot />

    <DevisSection :subject="data.label" :title="`Décrivez votre projet — ${data.label}`">
      <template #title>Un projet de <span>{{ data.label.toLowerCase() }} ?</span></template>
    </DevisSection>

    <!-- Navigation entre prestations -->
    <nav aria-label="Autres prestations" class="border-t border-walnut/15">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid grid-cols-2">
        <NuxtLink :to="`/prestations/${prev.slug}`" class="group py-8 pr-4 border-r border-walnut/15">
          <span class="block font-mono text-[11px] uppercase tracking-[0.15em] text-walnut mb-2">← Précédente</span>
          <span class="font-display text-lg md:text-2xl group-hover:text-walnut transition-colors">{{ prev.label }}</span>
        </NuxtLink>
        <NuxtLink :to="`/prestations/${next.slug}`" class="group py-8 pl-4 text-right">
          <span class="block font-mono text-[11px] uppercase tracking-[0.15em] text-walnut mb-2">Suivante →</span>
          <span class="font-display text-lg md:text-2xl group-hover:text-walnut transition-colors">{{ next.label }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>
