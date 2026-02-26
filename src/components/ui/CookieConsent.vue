<template>
  <transition name="slide-up">
    <div v-if="!hasConsented" class="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none">
      <div class="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-6 pointer-events-auto flex flex-col md:flex-row gap-6 items-center">
        
        <div class="flex-1 text-sm text-slate-300">
          <h3 class="text-white font-semibold text-base mb-2">We value your privacy</h3>
          <p class="leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies in accordance with the 
            <strong>Philippine Data Privacy Act</strong>, <strong>Australian Privacy Principles</strong>, and <strong>US CCPA</strong>.
          </p>
          <div class="mt-2 text-xs text-slate-500">
            Analytics tracking is active for security and statistical purposes.
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 min-w-max">
          <button 
            @click="acceptCookies"
            class="px-6 py-2.5 bg-electric-blue hover:bg-blue-600 text-white font-medium rounded-xl transition shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
          >
            Accept All
          </button>
          <button 
            @click="declineCookies"
            class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-medium rounded-xl transition"
          >
            Essential Only
          </button>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const hasConsented = ref(true) // default true so it doesn't flash before mount

onMounted(() => {
  const consent = localStorage.getItem('tribe6_cookie_consent')
  if (!consent) {
    hasConsented.value = false
  }
})

function acceptCookies() {
  localStorage.setItem('tribe6_cookie_consent', 'all')
  hasConsented.value = true
}

function declineCookies() {
  localStorage.setItem('tribe6_cookie_consent', 'essential')
  hasConsented.value = true
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
</style>
