<script setup>
defineProps({
  label: { type: String, required: true },
  // Nom d'icône de AppIcon (cuisine, dressing, salon, bureau, porte, deco)
  icon: { type: String, default: 'cuisine' }
})
</script>

<template>
  <div class="relative aspect-[4/3] bg-gradient-to-br from-clay via-copper/70 to-walnut flex flex-col items-center justify-center text-ebony overflow-hidden">
    <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(100deg, rgba(42,36,32,0.4) 0 2px, transparent 2px 14px);"></div>
    <AppIcon :name="icon" class="w-10 h-10 mb-3 relative" />
    <p class="relative font-display text-lg text-center px-4">{{ label }}</p>
    <p class="relative font-mono text-[10px] uppercase tracking-wide text-ebony/70 mt-1">Photo à venir</p>
  </div>
</template>
