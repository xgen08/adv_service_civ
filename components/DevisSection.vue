<script setup>
defineProps({
  // Transmis à DevisForm : une prestation connue y est présélectionnée.
  subject: { type: String, default: '' },
  title: { type: String, default: 'Demander un devis' },
  eyebrow: { type: String, default: 'Écrivez-nous' },
  intro: {
    type: String,
    default: 'Décrivez-nous la pièce, les dimensions approximatives et le style souhaité.'
  },
  // Numéros sous les étapes (inutiles quand la page les affiche déjà).
  showContacts: { type: Boolean, default: true }
})

const etapes = ['Échange et prise de mesures', 'Plan et devis détaillé', 'Fabrication en atelier', 'Pose et finitions']
</script>

<template>
  <!-- Section devis : texte et étapes à gauche, formulaire à droite. -->
  <section id="devis" class="bg-parchment py-32 scroll-mt-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
      <!-- Colonne gauche : texte -->
      <div v-reveal="{ from: 'left' }">
        <p class="eyebrow mb-4">{{ eyebrow }}</p>
        <h2 class="font-display text-display-lg text-ink leading-tight mb-8 [&_span]:italic [&_span]:text-copper">
          <slot name="title">Envoyez-nous<br /><span>votre demande.</span></slot>
        </h2>
        <p class="font-body text-lg text-graphite leading-relaxed mb-12">{{ intro }}</p>

        <!-- Étapes -->
        <ol class="space-y-6">
          <li v-for="(etape, i) in etapes" :key="etape" class="flex gap-4">
            <span class="flex-shrink-0 w-10 h-10 bg-ebony text-bone font-mono text-sm flex items-center justify-center">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="font-body text-ink pt-2">{{ etape }}</span>
          </li>
        </ol>

        <ul v-if="showContacts" class="mt-12 pt-8 border-t border-ebony/15 space-y-1">
          <li class="eyebrow mb-3">Ou appelez-nous</li>
          <li><a href="tel:+2250778291953" class="font-display text-2xl text-ebony hover:text-copper transition-colors">07 78 29 19 53</a></li>
          <li><a href="tel:+2250140332444" class="font-display text-2xl text-ebony hover:text-copper transition-colors">01 40 33 24 44</a></li>
        </ul>
      </div>

      <!-- Colonne droite : formulaire -->
      <div v-reveal="{ from: 'right', delay: 150 }">
        <DevisForm :subject="subject" :title="title" />
      </div>
    </div>
  </section>
</template>
