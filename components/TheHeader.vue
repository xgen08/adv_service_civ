<script setup>
import { prestations as data } from '~/data/prestations.js'

const open = ref(false)
const prestationsOpen = ref(false)
const scrolled = ref(false)
const menuEl = ref(null)

// Liste tirée de data/prestations.js : une 7ᵉ prestation apparaît ici automatiquement.
const prestations = Object.entries(data).map(([slug, p]) => ({ ...p, to: `/prestations/${slug}` }))

const route = useRoute()
const surPrestation = computed(() => route.path.startsWith('/prestations'))

// Tout menu ouvert se referme au changement de page.
watch(() => route.fullPath, () => {
  open.value = false
  prestationsOpen.value = false
})

function onScroll() {
  scrolled.value = window.scrollY > 40
}
function onKey(e) {
  if (e.key === 'Escape') {
    prestationsOpen.value = false
    open.value = false
  }
}
function onClickOutside(e) {
  if (prestationsOpen.value && menuEl.value && !menuEl.value.contains(e.target)) prestationsOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  document.addEventListener('click', onClickOutside)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('click', onClickOutside)
})

// Lien : pastille claire au survol, conservée sur la page en cours.
const navLink = 'inline-flex items-center gap-1 px-4 py-2 rounded-full text-bone/80 transition-colors duration-200 hover:text-bone hover:bg-bone/10'
const navActive = '!text-bone bg-bone/10'
</script>

<template>
  <!-- Hauteur nulle : la capsule flotte au-dessus du hero sans décaler la page.
       Les heros prévoient donc leur propre marge haute. -->
  <header class="sticky top-3 z-50 h-0 px-3 sm:px-6 text-bone">
    <div
      class="relative mx-auto max-w-7xl rounded-full bg-ebony/90 backdrop-blur-md border border-bone/15 transition-shadow duration-300"
      :class="scrolled ? 'shadow-[0_12px_32px_rgba(0,0,0,0.3)]' : ''"
    >
      <div class="flex items-center justify-between pl-6 pr-2 transition-[height] duration-300" :class="scrolled ? 'h-14' : 'h-16'">
        <NuxtLink to="/" class="font-display text-xl tracking-wide leading-none whitespace-nowrap">
          A.D.V <span class="text-copper">Service CIV</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-1 font-body text-sm" aria-label="Navigation principale">
          <NuxtLink to="/" :class="navLink" :exact-active-class="navActive">Accueil</NuxtLink>
          <NuxtLink to="/qui-sommes-nous" :class="navLink" :exact-active-class="navActive">Qui sommes-nous</NuxtLink>

          <div
            ref="menuEl"
            class="relative"
            @mouseenter="prestationsOpen = true"
            @mouseleave="prestationsOpen = false"
          >
            <button
              type="button"
              :class="[navLink, surPrestation && navActive]"
              :aria-expanded="prestationsOpen"
              aria-controls="menu-prestations"
              @click="prestationsOpen = !prestationsOpen"
            >
              Prestations
              <span class="text-xs transition-transform duration-300" :class="prestationsOpen && 'rotate-180'" aria-hidden="true">▾</span>
            </button>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0 translate-y-1"
            >
              <!-- pt-5 : pont invisible, le survol ne se perd pas entre bouton et panneau. -->
              <div v-show="prestationsOpen" id="menu-prestations" class="absolute left-1/2 -translate-x-1/2 top-full pt-5 w-[44rem]">
                <div class="bg-ivory text-ink rounded-3xl p-3 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
                  <ul class="grid grid-cols-2 gap-1">
                    <li v-for="p in prestations" :key="p.to">
                      <NuxtLink
                        :to="p.to"
                        class="flex items-center gap-3 p-2 rounded-2xl hover:bg-clay/30 transition-colors"
                        exact-active-class="bg-clay/30"
                      >
                        <img
                          :src="asset(p.image)"
                          alt=""
                          loading="lazy"
                          decoding="async"
                          class="w-16 h-16 shrink-0 rounded-xl object-cover"
                          :style="{ objectPosition: p.imagePosition }"
                        />
                        <span class="min-w-0">
                          <span class="block text-sm font-semibold text-ink">{{ p.label }}</span>
                          <span class="block text-xs leading-snug text-graphite line-clamp-2">{{ p.tagline }}</span>
                        </span>
                      </NuxtLink>
                    </li>
                  </ul>
                  <NuxtLink to="/prestations" class="mt-1 block rounded-2xl px-3 py-3 text-center text-sm font-medium text-walnut hover:bg-clay/30 transition-colors">
                    Toutes les prestations →
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <NuxtLink to="/realisations" :class="navLink" :exact-active-class="navActive">Réalisations</NuxtLink>
        </nav>

        <div class="hidden lg:flex items-center gap-3 font-body text-sm">
          <a href="tel:+2250778291953" class="hidden xl:inline-flex items-center gap-2 text-bone/80 hover:text-bone transition-colors whitespace-nowrap">
            <AppIcon name="phone" class="w-4 h-4 text-clay" />
            07 78 29 19 53
          </a>
          <NuxtLink to="/contact" class="btn-primary !px-5 !py-2.5 !rounded-full whitespace-nowrap">Demander un devis</NuxtLink>
        </div>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="lg:hidden w-11 h-11 mr-0.5 rounded-full flex flex-col items-center justify-center hover:bg-bone/10 transition-colors"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="open = !open"
        >
          <span class="block w-6 h-0.5 bg-bone mb-1.5 transition-transform duration-300" :class="open && 'translate-y-2 rotate-45'"></span>
          <span class="block w-6 h-0.5 bg-bone mb-1.5 transition-opacity duration-300" :class="open && 'opacity-0'"></span>
          <span class="block w-6 h-0.5 bg-bone transition-transform duration-300" :class="open && '-translate-y-2 -rotate-45'"></span>
        </button>
      </div>

      <!-- Mobile nav -->
      <div
        v-show="open"
        id="menu-mobile"
        class="lg:hidden absolute inset-x-0 top-full mt-2 rounded-3xl bg-ebony border border-bone/15 shadow-[0_24px_60px_rgba(0,0,0,0.35)] max-h-[calc(100svh-6rem)] overflow-y-auto"
      >
        <nav class="flex flex-col p-5 gap-1 font-body text-base" aria-label="Navigation mobile">
          <NuxtLink to="/" class="px-3 py-2 rounded-xl" exact-active-class="bg-bone/10 !text-clay">Accueil</NuxtLink>
          <NuxtLink to="/qui-sommes-nous" class="px-3 py-2 rounded-xl" exact-active-class="bg-bone/10 !text-clay">Qui sommes-nous</NuxtLink>
          <NuxtLink to="/prestations" class="px-3 py-2 rounded-xl" exact-active-class="bg-bone/10 !text-clay">Prestations</NuxtLink>
          <NuxtLink
            v-for="p in prestations"
            :key="p.to"
            :to="p.to"
            class="ml-3 px-3 py-1.5 rounded-xl text-sm text-bone/70"
            exact-active-class="bg-bone/10 !text-clay"
          >
            {{ p.label }}
          </NuxtLink>
          <NuxtLink to="/realisations" class="px-3 py-2 rounded-xl" exact-active-class="bg-bone/10 !text-clay">Réalisations</NuxtLink>
          <div class="mt-3 grid gap-2 sm:grid-cols-2">
            <a href="tel:+2250778291953" class="btn-outline !rounded-full">
              <AppIcon name="phone" class="w-4 h-4" />
              07 78 29 19 53
            </a>
            <NuxtLink to="/contact" class="btn-primary !rounded-full">Demander un devis</NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
