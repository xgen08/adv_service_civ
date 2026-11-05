<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  lead: { type: String, default: '' },
  // Photo de fond facultative (voile ebony + lent zoom).
  image: { type: String, default: '' }
})
</script>

<template>
  <section class="glow isolate bg-ebony text-bone">
    <template v-if="image">
      <img :src="asset(image)" alt="" class="hero-zoom absolute inset-0 -z-10 w-full h-full object-cover" />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-ebony via-ebony/85 to-ebony/35"></div>
    </template>
    <div class="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-36 pb-20 md:pt-44 md:pb-24">
      <p v-reveal class="eyebrow !text-clay flex items-center gap-3 mb-7 before:block before:w-10 before:h-px before:bg-copper">
        <slot name="eyebrow">{{ eyebrow }}</slot>
      </p>
      <!-- Le mot mis en avant (span) passe en ambre italique. -->
      <h1 v-reveal="120" class="font-display font-semibold text-4xl md:text-6xl max-w-4xl leading-[1.02] [&>span]:text-copper [&>span]:italic">
        <slot />
      </h1>
      <p v-if="lead" v-reveal="240" class="mt-7 max-w-[620px] text-lg leading-[1.8] text-bone/75">{{ lead }}</p>
    </div>
  </section>
</template>
