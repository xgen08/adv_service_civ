<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <!-- overflow-x-clip : les blocs v-reveal décalés sur le côté avant leur
         apparition ne doivent pas élargir la page (sur mobile surtout). -->
    <main class="flex-1 overflow-x-clip">
      <slot />
    </main>
    <TheFooter />
    <WhatsAppButton />
  </div>
</template>
