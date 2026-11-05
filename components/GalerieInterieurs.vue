<script setup>
import { galerie } from '~/data/galerie.js'
import { prestations } from '~/data/prestations.js'

const props = defineProps({
  // Photos à afficher (par défaut : toute data/galerie.js).
  photos: { type: Array, default: () => galerie },
  // Nombre maximum de photos. 5 ou 9 remplissent exactement la grille
  // (une grande photo 2×2 puis des vignettes sur 4 colonnes).
  limit: { type: Number, default: 0 },
  // Mettre la première photo en grand (2×2).
  featured: { type: Boolean, default: true }
})

const list = computed(() => (props.limit ? props.photos.slice(0, props.limit) : props.photos))
const label = (p) => prestations[p.prestation]?.label ?? ''

// Visionneuse plein écran
const current = ref(-1)
const isOpen = computed(() => current.value >= 0)
const photo = computed(() => list.value[current.value])
let opener = null

function open(i, event) {
  opener = event?.currentTarget ?? null
  current.value = i
}
function close() {
  current.value = -1
  opener?.focus()
}
function step(delta) {
  const n = list.value.length
  current.value = (current.value + delta + n) % n
}
function onKey(e) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

// Si la liste change (filtre) pendant que la visionneuse est ouverte.
watch(list, () => {
  if (current.value >= list.value.length) current.value = -1
})

const closeBtn = ref(null)
watch(isOpen, async (val) => {
  document.documentElement.style.overflow = val ? 'hidden' : ''
  if (val) {
    await nextTick()
    closeBtn.value?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div>
    <ul class="grid grid-cols-2 lg:grid-cols-4 grid-flow-dense auto-rows-[160px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3 sm:gap-4">
      <li
        v-for="(p, i) in list"
        :key="p.src"
        v-reveal="{ from: 'zoom', delay: (i % 5) * 80 }"
        :class="featured && i === 0 ? 'col-span-2 row-span-2' : ''"
      >
        <button
          type="button"
          class="group relative block w-full h-full overflow-hidden bg-parchment"
          :aria-label="`Agrandir : ${p.titre}`"
          @click="open(i, $event)"
        >
          <img
            :src="asset(p.src)"
            :alt="p.titre"
            :width="p.w"
            :height="p.h"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <span class="absolute inset-0 bg-gradient-to-t from-ebony/80 via-ebony/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></span>
          <span class="absolute left-4 right-4 bottom-4 text-left text-bone">
            <span v-if="label(p)" class="block font-mono text-[10px] uppercase tracking-[0.2em] text-clay mb-1">{{ label(p) }}</span>
            <span class="block leading-snug" :class="featured && i === 0 ? 'font-display text-lg md:text-2xl' : 'text-sm font-medium'">{{ p.titre }}</span>
          </span>
          <span
            aria-hidden="true"
            class="absolute top-4 right-4 w-9 h-9 bg-bone text-ebony flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100"
          >
            <AppIcon name="agrandir" stroke-width="2" class="w-4 h-4" />
          </span>
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen && photo"
          class="fixed inset-0 z-[100] bg-ebony/95 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          :aria-label="photo.titre"
        >
          <div class="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 text-bone">
            <p class="text-sm truncate">
              <span class="font-mono text-clay">{{ String(current + 1).padStart(2, '0') }}</span>
              <span class="font-mono text-bone/40"> / {{ String(list.length).padStart(2, '0') }}</span>
              <span class="ml-4 text-bone/85">{{ photo.titre }}</span>
            </p>
            <button ref="closeBtn" type="button" aria-label="Fermer" class="shrink-0 w-11 h-11 text-bone/70 hover:text-bone hover:bg-bone/10 transition-colors text-xl" @click="close">✕</button>
          </div>

          <div class="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-20 pb-8" @click.self="close">
            <img :key="photo.src" :src="asset(photo.src)" :alt="photo.titre" class="max-w-full max-h-full object-contain shadow-[0_30px_80px_rgba(0,0,0,0.5)]" />
            <button v-if="list.length > 1" type="button" aria-label="Photo précédente" class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-bone/10 text-bone hover:bg-copper hover:text-ink transition-colors" @click="step(-1)">←</button>
            <button v-if="list.length > 1" type="button" aria-label="Photo suivante" class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-bone/10 text-bone hover:bg-copper hover:text-ink transition-colors" @click="step(1)">→</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
