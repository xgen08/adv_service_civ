// Directive v-reveal : fait apparaître un élément quand il entre dans l'écran.
//   v-reveal                          → monte en fondu
//   v-reveal="200"                    → idem, avec 200 ms de délai (cascade)
//   v-reveal="{ from: 'left', delay }" → glisse depuis la gauche ('right', 'zoom' aussi)
// Le serveur pose déjà la classe .reveal, et un script de nuxt.config.ts ajoute
// .reveal-ready sur <html> avant le premier affichage : les éléments sont donc
// masqués dès le départ, sans clignotement. Une fois l'animation jouée, les
// classes sont retirées pour rendre la main aux effets de survol.

// Durée de la transition .reveal dans assets/css/main.css (0.8s), avec marge.
const REVEAL_DURATION = 900

function revealOptions(binding) {
  return typeof binding.value === 'number' ? { delay: binding.value } : binding.value || {}
}

export default defineNuxtPlugin((nuxtApp) => {
  let observer = null

  if (import.meta.client) {
    window.__revealStarted = true
    // .reveal-ready absent = animations réduites demandées ou navigateur trop ancien.
    if (document.documentElement.classList.contains('reveal-ready')) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const el = entry.target
            observer.unobserve(el)
            // Deux frames d'attente : sinon un élément déjà à l'écran passe
            // à « visible » sans que la transition ne joue.
            requestAnimationFrame(() => requestAnimationFrame(() => {
              el.classList.add('is-visible')
              const delay = parseInt(el.style.getPropertyValue('--reveal-delay')) || 0
              setTimeout(() => {
                el.classList.remove('reveal', 'is-visible')
                el.style.removeProperty('--reveal-delay')
                delete el.dataset.reveal
              }, delay + REVEAL_DURATION)
            }))
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    }
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps(binding) {
      const opts = revealOptions(binding)
      // La classe et le délai ne viennent que du serveur : on prévient Vue que
      // cet écart avec le rendu client est voulu (pas d'alerte d'hydratation).
      const props = { class: 'reveal', 'data-allow-mismatch': 'class,style' }
      if (opts.from) props['data-reveal'] = opts.from
      if (opts.delay) props.style = { '--reveal-delay': `${opts.delay}ms` }
      return props
    },
    mounted(el, binding) {
      const opts = revealOptions(binding)
      if (!observer) {
        el.classList.remove('reveal')
        return
      }
      el.classList.add('reveal')
      if (opts.from) el.dataset.reveal = opts.from
      if (opts.delay) el.style.setProperty('--reveal-delay', `${opts.delay}ms`)
      observer.observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    }
  })
})
