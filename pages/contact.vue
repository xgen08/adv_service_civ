<script setup>
useHead({ title: 'Contact & devis — ADV Service CIV' })

const cartes = [
  {
    label: 'Adresse',
    icon: 'map-pin',
    lignes: ['Port-Bouet, Gonzagueville', "Abidjan, Côte d'Ivoire"]
  },
  {
    label: 'Téléphone',
    icon: 'phone',
    tel: [
      { affichage: '07 78 29 19 53', lien: '+2250778291953' },
      { affichage: '01 40 33 24 44', lien: '+2250140332444' }
    ]
  },
  {
    label: 'Réseaux',
    icon: 'facebook',
    lignes: ['Facebook : ADV Service CIV']
  }
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      image="/images/interieurs/salon-bois-gris.jpg"
      lead="Une cuisine, un dressing, une porte ou tout un intérieur à aménager : écrivez-nous ou appelez-nous directement."
    >
      Parlons de <span>votre projet.</span>
    </PageHero>

    <!-- Coordonnées, à cheval sur le hero -->
    <section class="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 -mt-14">
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="(c, i) in cartes"
          :key="c.label"
          v-reveal="i * 100"
          class="bg-ivory p-8 shadow-[0_15px_45px_rgba(42,36,32,0.12)] border-t-4 border-copper"
        >
          <span class="w-12 h-12 mb-6 bg-clay/50 text-walnut flex items-center justify-center">
            <AppIcon :name="c.icon" stroke-width="1.6" class="w-6 h-6" />
          </span>
          <p class="eyebrow mb-3">{{ c.label }}</p>
          <ul class="space-y-1 text-[15px] text-ink">
            <li v-for="l in c.lignes" :key="l">{{ l }}</li>
            <li v-for="t in c.tel" :key="t.lien">
              <a :href="`tel:${t.lien}`" class="font-display text-2xl text-ebony hover:text-walnut transition-colors">{{ t.affichage }}</a>
            </li>
          </ul>
        </div>
      </div>
      <p v-reveal="300" class="font-display italic text-xl text-walnut text-center mt-12">
        « La perfection dans chaque détail. »
      </p>
    </section>

    <DevisSection subject="Contact" title="Envoyez-nous votre demande" eyebrow="Écrivez-nous" :show-contacts="false" class="mt-16">
      <template #title>Envoyez-nous <span>votre demande.</span></template>
    </DevisSection>
  </div>
</template>
