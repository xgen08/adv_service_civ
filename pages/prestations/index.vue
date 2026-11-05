<script setup>
import { prestations } from '~/data/prestations'

const list = Object.entries(prestations).map(([slug, p]) => ({ slug, p }))

useHead({ title: 'Nos prestations — ADV Service CIV' })
</script>

<template>
  <div>
    <PageHero
      eyebrow="Nos prestations"
      image="/images/interieurs/sejour-cuisine-ouverte.jpg"
      lead="Cuisines, dressings, salons, bureaux, portes et décoration : chaque meuble est dessiné, fabriqué et posé à la mesure de votre pièce."
    >
      Du croquis à la pose, <span>tout est sur mesure.</span>
    </PageHero>

    <section class="py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(item, i) in list" :key="item.slug" v-reveal="(i % 3) * 120">
          <PrestationCard :slug="item.slug" :prestation="item.p" :num="i + 1" heading-tag="h2" />
        </div>
      </div>
    </section>
  </div>
</template>
