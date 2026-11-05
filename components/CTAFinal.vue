<script setup>
// Grand appel à l'action de fin de page, affiché par TheFooter.vue sur toutes
// les pages (titre et lien adaptés à chaque page).
defineProps({
  // Titre sur deux lignes : la seconde (accent) en cuivre italique.
  title: { type: String, default: 'Donnons vie' },
  accent: { type: String, default: 'à vos projets.' },
  text: {
    type: String,
    default: '« La perfection dans chaque détail. » Décrivez-nous votre pièce, nous nous occupons du reste.'
  },
  to: { type: String, default: '/contact' },
  label: { type: String, default: 'Demander un devis →' }
})
</script>

<template>
  <section class="relative bg-bone py-24 px-6 lg:px-12 overflow-hidden">
    <!-- Points décoratifs : dépassent des angles du bloc. -->
    <div class="dot-pattern-copper absolute top-10 left-[max(1.5rem,calc(50%-37rem))] w-40 h-40 opacity-50 hidden lg:block" aria-hidden="true"></div>
    <div class="dot-pattern-walnut absolute bottom-10 right-[max(1.5rem,calc(50%-37rem))] w-40 h-40 opacity-30 hidden lg:block" aria-hidden="true"></div>

    <div class="relative max-w-6xl mx-auto bg-ebony rounded-[2rem] md:rounded-[3rem] px-8 py-12 md:p-16 overflow-hidden shadow-2xl">
      <!-- Cercles concentriques -->
      <svg class="absolute -top-24 -right-24 w-96 h-96 opacity-20 text-copper" viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="100" />
        <circle cx="200" cy="200" r="50" />
      </svg>

      <div class="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] items-center">
        <div>
          <p v-reveal class="eyebrow !text-clay mb-4">Vos idées, notre savoir-faire</p>
          <h2 v-reveal="100" class="font-display text-4xl md:text-5xl text-bone leading-tight mb-6">
            {{ title }}<br />
            <span class="italic text-copper">{{ accent }}</span>
          </h2>
          <p v-reveal="200" class="font-body text-bone/70 max-w-xl">{{ text }}</p>
        </div>

        <div v-reveal="300" class="flex flex-col gap-4">
          <!-- Texte ink sur copper : contraste suffisant (bone sur copper : 3.3:1). -->
          <NuxtLink
            :to="to"
            class="bg-copper text-ink px-8 py-4 rounded-full text-center font-body text-sm tracking-wide hover:bg-bone transition-colors duration-300 shadow-xl"
          >
            {{ label }}
          </NuxtLink>
          <a
            href="tel:+2250778291953"
            class="border-2 border-bone/40 text-bone px-8 py-4 rounded-full text-center font-body text-sm tracking-wide hover:bg-bone hover:text-ebony hover:border-bone transition-colors duration-300"
          >
            Appeler le 07 78 29 19 53
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
