<script setup>
import { prestations } from '~/data/prestations.js'

const props = defineProps({
  title: { type: String, default: 'Demander un devis' },
  subject: { type: String, default: '' }
})

// Options tirées de data/prestations.js : une 7ᵉ prestation apparaît ici automatiquement.
const options = [...Object.values(prestations).map((p) => p.label), 'Autre']

// Sur une page prestation, la prestation est présélectionnée.
const initialPrestation = options.includes(props.subject) ? props.subject : ''

// Identifiants uniques au cas où deux formulaires coexistent sur une page.
const uid = useId()

const status = ref('idle') // idle | sending | sent | error
const errorMessage = ref('')
const form = reactive({
  nom: '',
  telephone: '',
  email: '',
  prestation: initialPrestation,
  message: '',
  site_web: '' // champ piège anti-spam
})

// Site statique (GitHub Pages) : pas de serveur. Les demandes partent vers un
// service de formulaires (Formspree, ou compatible) dont l'adresse est fournie
// au build par NUXT_PUBLIC_DEVIS_ENDPOINT (voir .env.example et README.md).
const endpoint = useRuntimeConfig().public.devisEndpoint

// Style des champs : libellé mono, saisie soulignée.
const label = 'font-mono text-xs uppercase tracking-widest text-walnut block mb-2'
const field = 'w-full bg-transparent border-0 border-b-2 border-ink/20 px-0 py-3 font-body text-ink focus:border-copper focus:outline-none focus:ring-0 transition-colors placeholder:text-stone'

async function handleSubmit() {
  if (status.value === 'sending') return
  errorMessage.value = ''
  // Champ piège rempli = robot : on simule un succès sans rien envoyer.
  if (form.site_web) {
    status.value = 'sent'
    return
  }
  if (!endpoint) {
    status.value = 'error'
    errorMessage.value = "Le formulaire en ligne n'est pas encore activé."
    return
  }
  status.value = 'sending'
  try {
    await $fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        nom: form.nom.trim(),
        telephone: form.telephone.trim(),
        email: form.email.trim() || undefined,
        prestation: form.prestation || 'Non précisée',
        message: form.message.trim(),
        _subject: `Demande de devis — ${form.prestation || 'Non précisée'} — ${form.nom.trim()}`
      }
    })
    status.value = 'sent'
  } catch (err) {
    status.value = 'error'
    errorMessage.value =
      err?.data?.errors?.[0]?.message || "L'envoi a échoué. Vérifiez votre connexion et réessayez."
  }
}
</script>

<template>
  <div class="bg-bone p-8 md:p-12 border border-ink/10">
    <form v-if="status !== 'sent'" class="relative space-y-6" :aria-label="title" @submit.prevent="handleSubmit">
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label :class="label" :for="`${uid}-nom`">Nom complet</label>
          <input
            :id="`${uid}-nom`"
            v-model="form.nom"
            type="text"
            name="nom"
            autocomplete="name"
            required
            placeholder="Votre nom"
            maxlength="120"
            :class="field"
          />
        </div>
        <div>
          <label :class="label" :for="`${uid}-telephone`">Téléphone</label>
          <input
            :id="`${uid}-telephone`"
            v-model="form.telephone"
            type="tel"
            name="telephone"
            autocomplete="tel"
            required
            maxlength="30"
            placeholder="07 00 00 00 00"
            :class="field"
          />
        </div>
      </div>

      <div>
        <label :class="label" :for="`${uid}-email`">
          E-mail <span class="normal-case tracking-normal text-stone">(facultatif)</span>
        </label>
        <input
          :id="`${uid}-email`"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          placeholder="vous@exemple.com"
          maxlength="160"
          :class="field"
        />
      </div>

      <div>
        <label :class="label" :for="`${uid}-prestation`">Prestation concernée</label>
        <select
          :id="`${uid}-prestation`"
          v-model="form.prestation"
          name="prestation"
          :class="field"
        >
          <option value="">Sélectionner...</option>
          <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <div>
        <label :class="label" :for="`${uid}-message`">Votre projet</label>
        <textarea
          :id="`${uid}-message`"
          v-model="form.message"
          name="message"
          rows="4"
          required
          minlength="10"
          maxlength="4000"
          placeholder="Pièce concernée, dimensions approximatives, style souhaité..."
          :class="[field, 'resize-none']"
        ></textarea>
      </div>

      <!-- Champ piège : hors écran, ignoré par les lecteurs d'écran et le clavier. -->
      <div class="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label :for="`${uid}-site`">Ne pas remplir</label>
        <input :id="`${uid}-site`" v-model="form.site_web" type="text" name="site_web" tabindex="-1" autocomplete="off" />
      </div>

      <p
        v-if="status === 'error'"
        role="alert"
        class="border-l-4 border-copper bg-parchment px-4 py-3 text-sm text-ink"
      >
        {{ errorMessage }}
        <span class="block mt-1 text-graphite">
          Vous pouvez aussi nous appeler au
          <a href="tel:+2250778291953" class="underline font-semibold">07 78 29 19 53</a>.
        </span>
      </p>

      <button
        type="submit"
        :disabled="status === 'sending'"
        class="w-full bg-ebony text-bone py-5 font-body text-sm tracking-widest uppercase hover:bg-copper hover:text-ink transition-all duration-300 mt-8 disabled:opacity-60 disabled:cursor-wait"
      >
        {{ status === 'sending' ? 'Envoi en cours…' : 'Envoyer la demande →' }}
      </button>
    </form>

    <div v-else class="py-6" role="status">
      <p class="font-display text-3xl text-ebony mb-3">Demande <span class="italic text-copper">envoyée.</span></p>
      <p class="text-sm text-graphite">
        Un membre de l'équipe ADV Service CIV revient vers vous sous peu au numéro ou à l'adresse indiqués.
      </p>
    </div>
  </div>
</template>
