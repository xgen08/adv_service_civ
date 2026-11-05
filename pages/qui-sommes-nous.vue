<script setup>
useHead({ title: 'Qui sommes-nous — ADV Service CIV' })

const engagements = [
  {
    titre: 'Notre métier',
    texte: 'Nous dessinons, fabriquons et posons des meubles sur mesure : cuisines équipées, dressings, portes PVC et éléments de décoration intérieure, du premier croquis à la pose finale.'
  },
  {
    titre: 'Notre méthode',
    texte: "Chaque projet commence par une prise de mesures précise et un échange sur vos besoins, pour un meuble qui s'intègre exactement à l'espace disponible — pas de solution standard imposée."
  },
  {
    titre: 'Notre exigence',
    texte: "Des matériaux sélectionnés, des finitions soignées et des techniques d'assemblage modernes, pour des meubles conçus pour durer dans le temps."
  }
]

const piliers = [
  { titre: 'Sur-mesure', icon: 'sur-mesure', texte: 'Chaque projet est unique, pensé selon vos besoins.' },
  { titre: 'Qualité', icon: 'qualite', texte: 'Matériaux sélectionnés et finitions soignées.' },
  { titre: 'Expertise', icon: 'expertise', texte: 'Savoir-faire artisanal et techniques modernes.' },
  { titre: 'Durabilité', icon: 'durabilite', texte: 'Des réalisations conçues pour durer dans le temps.' }
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Qui sommes-nous"
      image="/images/interieurs/console-classique.jpg"
      lead="ADV Service CIV conçoit et fabrique des meubles sur mesure à Abidjan — cuisines, dressings, portes et agencements intérieurs — pensés pour chaque pièce et chaque mode de vie."
    >
      Un atelier, un savoir-faire,
      <span>une exigence du détail.</span>
    </PageHero>

    <!-- Métier / méthode / exigence -->
    <section class="py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="(e, i) in engagements"
          :key="e.titre"
          v-reveal="i * 120"
          class="card p-10"
        >
          <p class="font-display text-5xl font-semibold leading-none text-copper mb-6">{{ String(i + 1).padStart(2, '0') }}</p>
          <h2 class="font-display text-2xl mb-4">{{ e.titre }}</h2>
          <p class="text-[15px] leading-[1.8] text-graphite">{{ e.texte }}</p>
        </div>
      </div>
    </section>

    <!-- Le bois, la matière -->
    <section class="bg-parchment py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid gap-16 lg:gap-20 lg:grid-cols-2 items-center">
        <div v-reveal="{ from: 'left' }">
          <p class="eyebrow mb-4">La matière</p>
          <h2 class="section-title mb-6">
            Le bois, travaillé <span class="text-copper italic">dans le détail.</span>
          </h2>
          <p class="text-[17px] leading-[1.85] text-graphite mb-5">
            Bois massif, finitions mates ou laquées, assemblages précis : chaque
            meuble est pensé pour s'accorder au reste de votre intérieur et
            traverser les années.
          </p>
          <p class="text-[17px] leading-[1.85] text-graphite mb-8">
            Nous vous conseillons sur les matériaux, les teintes et les
            quincailleries, pour un résultat cohérent du sol au plafond.
          </p>
          <NuxtLink to="/realisations" class="btn-text">Voir les réalisations →</NuxtLink>
        </div>

        <div v-reveal="{ from: 'right', delay: 150 }" class="relative h-[420px] md:h-[500px]">
          <img
            :src="asset('/images/interieurs/buffet-bois-brut.jpg')"
            alt="Buffet en chêne massif"
            loading="lazy"
            decoding="async"
            class="ml-auto w-[85%] h-full object-cover"
          />
          <img
            :src="asset('/images/interieurs/sejour-cuisine-ouverte.jpg')"
            alt="Cuisine ouverte aux façades chêne clair"
            loading="lazy"
            decoding="async"
            class="hidden md:block absolute -bottom-10 left-0 w-[55%] h-[55%] object-cover border-8 border-parchment shadow-[0_20px_60px_rgba(42,36,32,0.2)]"
          />
        </div>
      </div>
    </section>

    <!-- 4 piliers -->
    <section class="glow isolate bg-ebony text-bone py-24 md:py-28">
      <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <p v-reveal class="eyebrow !text-clay mb-4">Nos engagements</p>
        <h2 v-reveal="100" class="section-title !text-bone mb-14">Design · Qualité · <span class="text-copper italic">Durabilité</span></h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(p, i) in piliers"
            :key="p.titre"
            v-reveal="i * 100"
            class="rounded-3xl bg-walnut/45 border border-clay/20 p-7 transition-colors duration-300 hover:bg-walnut/70 hover:border-clay/50"
          >
            <span class="w-12 h-12 mb-6 rounded-full bg-copper text-ink flex items-center justify-center">
              <AppIcon :name="p.icon" class="w-6 h-6" />
            </span>
            <h3 class="font-display text-2xl text-bone mb-2">{{ p.titre }}</h3>
            <p class="text-[15px] text-bone/80 leading-relaxed">{{ p.texte }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Nous trouver -->
    <section class="py-24 md:py-28">
      <div class="mx-auto max-w-7xl px-6 lg:px-12 grid gap-12 lg:grid-cols-2 items-center">
        <div v-reveal="{ from: 'left' }">
          <p class="eyebrow mb-4">Nous trouver</p>
          <h2 class="section-title mb-6">
            Un interlocuteur <span class="text-copper italic">pour votre projet.</span>
          </h2>
          <p class="text-[17px] leading-[1.85] text-graphite max-w-[480px]">
            Décrivez-nous votre besoin : nous revenons vers vous pour en
            discuter, prendre les mesures et vous proposer un devis.
          </p>
        </div>

        <div v-reveal="{ from: 'right', delay: 150 }" class="bg-ivory p-10 shadow-[0_15px_45px_rgba(42,36,32,0.12)] border-t-4 border-copper">
          <p class="font-display text-3xl mb-2">ADV Service CIV</p>
          <p class="text-graphite">Port-Bouet, Gonzagueville — Abidjan</p>
          <ul class="mt-6 space-y-1">
            <li><a href="tel:+2250778291953" class="font-display text-2xl text-ebony hover:text-walnut transition-colors">07 78 29 19 53</a></li>
            <li><a href="tel:+2250140332444" class="font-display text-2xl text-ebony hover:text-walnut transition-colors">01 40 33 24 44</a></li>
          </ul>
          <p class="text-sm text-graphite mt-4">Facebook : ADV Service CIV</p>
          <NuxtLink to="/contact" class="btn-primary mt-8 w-full sm:w-auto">Demander un devis</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
