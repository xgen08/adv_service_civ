<script setup>
import { prestations as data } from '~/data/prestations.js'

const prestations = Object.entries(data).map(([slug, p]) => ({ label: p.label, to: `/prestations/${slug}` }))

// Bandeau d'appel adapté à chaque page. Les pages qui ont déjà un formulaire
// renvoient vers la suite logique plutôt que vers un second devis.
// Une page absente de la liste reçoit le bandeau par défaut (devis).
const ctaParPage = {
  '/realisations': {
    title: 'Votre intérieur',
    accent: 'pourrait être le prochain.',
    text: 'Cuisine, dressing, salon ou bureau : décrivez-nous votre pièce, nous vous proposons une solution sur mesure.'
  },
  '/qui-sommes-nous': {
    title: 'Envie de voir',
    accent: 'notre travail ?',
    text: 'Cuisines, salons, espaces professionnels : parcourez quelques intérieurs en images.',
    to: '/realisations',
    label: 'Voir les réalisations →'
  },
  '/contact': {
    title: 'Pas encore',
    accent: 'tout à fait décidé ?',
    text: 'Parcourez nos six prestations pour préciser votre besoin avant de nous écrire.',
    to: '/prestations',
    label: 'Voir nos prestations →'
  }
}
// Pages prestation : elles contiennent déjà le formulaire de devis.
const ctaPrestation = {
  title: 'Besoin',
  accent: 'd’inspiration ?',
  text: 'Découvrez d’autres intérieurs aménagés sur mesure dans notre galerie de réalisations.',
  to: '/realisations',
  label: 'Voir les réalisations →'
}

const route = useRoute()
const cta = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  if (/^\/prestations\/.+/.test(path)) return ctaPrestation
  return ctaParPage[path] ?? {}
})

// Retour en haut : visible seulement après avoir défilé. Le défilement doux
// vient du CSS (html), ce qui respecte prefers-reduced-motion.
const showTop = ref(false)
const onScroll = () => { showTop.value = window.scrollY > 600 }
const scrollToTop = () => window.scrollTo({ top: 0 })
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <CTAFinal v-bind="cta" />
  <footer class="bg-parchment text-graphite">
    <div class="mx-auto max-w-7xl px-6 lg:px-12 py-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
      <div class="lg:col-span-4 lg:pr-8">
        <p class="font-display text-3xl text-ink mb-4">A.D.V <span class="text-copper">Service CIV</span></p>
        <p class="text-sm leading-relaxed max-w-[300px]">
          Dressing, cuisine, portes PVC et décoration intérieure sur mesure.
        </p>
        <p class="font-display italic text-walnut mt-4">« La perfection dans chaque détail. »</p>
        <NuxtLink
          to="/contact"
          class="mt-6 inline-flex items-center gap-2 bg-ebony text-bone px-6 py-3 rounded-full text-sm hover:bg-walnut transition-colors duration-300"
        >
          Nous contacter <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <div class="lg:col-span-2 lg:border-l lg:border-walnut/15 lg:pl-8">
        <p class="font-display text-xl text-ink mb-5">Navigation</p>
        <ul class="text-sm space-y-3">
          <li><NuxtLink to="/" class="footer-link">Accueil</NuxtLink></li>
          <li><NuxtLink to="/prestations" class="footer-link">Prestations</NuxtLink></li>
          <li><NuxtLink to="/realisations" class="footer-link">Réalisations</NuxtLink></li>
          <li><NuxtLink to="/qui-sommes-nous" class="footer-link">Qui sommes-nous</NuxtLink></li>
          <li><NuxtLink to="/contact" class="footer-link">Contact & devis</NuxtLink></li>
        </ul>
      </div>

      <div class="lg:col-span-3 lg:border-l lg:border-walnut/15 lg:pl-8">
        <p class="font-display text-xl text-ink mb-5">Nos prestations</p>
        <ul class="text-sm space-y-3">
          <li v-for="p in prestations" :key="p.to">
            <NuxtLink :to="p.to" class="footer-link">{{ p.label }}</NuxtLink>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-3 lg:border-l lg:border-walnut/15 lg:pl-8">
        <p class="font-display text-xl text-ink mb-5">Coordonnées</p>
        <ul class="text-sm space-y-3">
          <li><span class="font-semibold text-ink">Tél. :</span> <a href="tel:+2250778291953" class="footer-link">07 78 29 19 53</a></li>
          <li><span class="font-semibold text-ink">Tél. :</span> <a href="tel:+2250140332444" class="footer-link">01 40 33 24 44</a></li>
          <li><span class="font-semibold text-ink">Adresse :</span> Port-Bouet, Gonzagueville, Abidjan</li>
          <li><span class="font-semibold text-ink">Facebook :</span> ADV Service CIV</li>
        </ul>
      </div>
    </div>

    <!-- Empilé au-dessus du bouton WhatsApp (bottom-6, h-14). -->
    <button
      v-if="showTop"
      type="button"
      aria-label="Revenir en haut de la page"
      title="Revenir en haut"
      class="animate-fade-in fixed bottom-24 right-7 z-50 w-12 h-12 rounded-full bg-ebony text-bone border border-bone/30 shadow-2xl flex items-center justify-center hover:bg-walnut transition-colors duration-300"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </footer>
</template>
