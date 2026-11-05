<script setup>
const introCartes = [
  { titre: 'Sur-mesure', description: 'Chaque projet est unique, pensé selon vos besoins et vos espaces.' },
  { titre: 'Qualité', description: 'Matériaux sélectionnés avec soin et finitions soignées en atelier.' },
  { titre: 'Expertise', description: 'Savoir-faire artisanal allié aux techniques modernes de conception.' }
]
</script>

<template>
  <div>
    <!-- ==========================================
         1. HERO PLEIN ÉCRAN
         ========================================== -->
    <!-- Plein écran : la capsule de navigation flotte par-dessus. -->
    <section class="relative h-svh min-h-[700px] flex items-center justify-center overflow-hidden bg-ebony">
      <!-- Image de fond sombre -->
      <img
        :src="asset('/images/interieurs/salon-villa-marbre.jpg')"
        alt=""
        class="hero-zoom absolute inset-0 w-full h-full object-cover"
      />
      <!-- Texture bois subtile (veines verticales) -->
      <div
        class="absolute inset-0 opacity-20"
        style="background-image: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(166,124,82,0.1) 50px, rgba(166,124,82,0.1) 51px);"
      ></div>
      <!-- Overlay sombre -->
      <div class="absolute inset-0 bg-gradient-to-b from-ebony/70 via-ebony/55 to-ebony/85"></div>

      <!-- Contenu centré (remonté pour laisser la place aux cartes qui débordent) -->
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto pb-24">
        <p class="eyebrow !text-clay !tracking-[0.4em] mb-6 animate-fade-in">
          Port-Bouet, Gonzagueville — Abidjan
        </p>

        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-bone leading-[0.95] mb-6 animate-fade-up">
          L'exigence du<br />
          <span class="italic text-copper">sur-mesure.</span>
        </h1>

        <p class="font-body text-lg md:text-xl text-bone/80 max-w-2xl mx-auto mb-10 animate-fade-up" style="animation-delay: 0.2s">
          Nous concevons et réalisons des meubles sur mesure qui allient
          esthétique, fonctionnalité et finitions haut de gamme.
        </p>

        <div class="flex flex-wrap justify-center gap-4 animate-fade-up" style="animation-delay: 0.3s">
          <!-- Texte ink sur copper : contraste suffisant (bone sur copper : 3.3:1). -->
          <NuxtLink
            to="/contact"
            class="group inline-flex items-center gap-3 bg-copper text-ink px-10 py-5 font-body text-sm tracking-widest uppercase hover:bg-bone transition-all duration-300 shadow-2xl"
          >
            Demander un devis
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </NuxtLink>
          <NuxtLink
            to="/realisations"
            class="inline-flex items-center gap-3 border-2 border-bone text-bone px-10 py-5 font-body text-sm tracking-widest uppercase hover:bg-bone hover:text-ebony transition-all duration-300"
          >
            Voir nos réalisations
          </NuxtLink>
        </div>
      </div>

      <!-- Flèche de scroll (au-dessus des cartes qui débordent) -->
      <a href="#atelier" aria-label="Défiler vers la suite" class="absolute bottom-40 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-bone/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>

    <!-- ==========================================
         2. INTRO — Cartes qui débordent sur le hero
         ========================================== -->
    <!-- flow-root : empêche le -mt-32 des cartes de remonter toute la section
         (fusion des marges), sinon le fond bone recouvrirait le bas du hero. -->
    <section id="atelier" class="relative flow-root bg-bone pb-24 scroll-mt-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <!-- Cartes qui débordent -->
        <div class="grid md:grid-cols-3 gap-8 -mt-32 relative z-10">
          <div
            v-for="(carte, i) in introCartes"
            :key="carte.titre"
            v-reveal="i * 120"
            class="bg-ivory p-8 shadow-2xl border-t-4 border-copper hover:-translate-y-2 transition-transform duration-300"
          >
            <div class="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span class="font-display text-3xl text-copper">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="font-display text-2xl text-ink text-center mb-3">{{ carte.titre }}</h3>
            <p class="font-body text-sm text-graphite text-center leading-relaxed">{{ carte.description }}</p>
          </div>
        </div>

        <div class="text-center mt-20">
          <p v-reveal class="eyebrow mb-4">Première visite</p>
          <h2 v-reveal="100" class="font-display text-4xl md:text-5xl text-ink mb-4">Découvrez l'atelier.</h2>
          <p v-reveal="200" class="font-body text-lg text-graphite italic mb-8">Vous êtes au bon endroit.</p>
          <NuxtLink v-reveal="300" to="/qui-sommes-nous" class="btn-text">Qui sommes-nous →</NuxtLink>
        </div>
      </div>
    </section>


    <!-- ==========================================
         3. MANIFESTE — Bandeau sombre
         ========================================== -->
    <Manifesto />

    <!-- ==========================================
         4. PRESTATIONS
         ========================================== -->
    <PrestationsGrid />


    <!-- ==========================================
         Galerie photo (le CTA final est affiché par le pied de page)
         ========================================== -->
    <section class="bg-bone py-24 md:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p v-reveal class="eyebrow mb-4">Intérieurs</p>
            <h2 v-reveal="100" class="section-title">
              Des espaces pensés <span class="text-copper italic">pour être vécus.</span>
            </h2>
          </div>
          <p v-reveal="200" class="text-[15px] leading-[1.8] text-graphite max-w-[400px]">
            Cuisines, salons, espaces professionnels : un aperçu des intérieurs
            et du mobilier sur mesure qui nous inspirent.
          </p>
        </div>
        <GalerieInterieurs :limit="5" />
        <div class="text-center mt-14">
          <NuxtLink to="/realisations" class="btn-text">Voir toute la galerie →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
