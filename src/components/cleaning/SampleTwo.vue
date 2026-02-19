<template>
  <div class="min-h-screen font-sans" style="background: #f0faf9;">
    <!-- HERO — Eco/Coastal -->
    <section class="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div class="absolute inset-0" style="background: linear-gradient(135deg, #f0faf9 0%, #ccfbf1 50%, #a7f3d0 100%); opacity: 0.6;"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div class="animate-in order-2 lg:order-1">
          <span class="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            🌊 Coastal Clear · Gold Coast, QLD
          </span>
          <h1 class="text-5xl lg:text-6xl font-bold leading-tight mb-6" style="color: #0d4a3e;">
            Cleaner Home.<br />
            <span style="color: #0d9488;">Greener Planet.</span>
          </h1>
          <p class="text-lg leading-relaxed mb-8 max-w-lg" style="color: #0d4a3e; opacity: 0.75;">
            Coastal Clear is Gold Coast's premier eco-conscious cleaning service. We use only certified organic, non-toxic products that are safe for your family, pets, and the reef.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="scrollToForm"
              class="px-8 py-4 font-bold text-white rounded-2xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 transform text-lg"
              style="background: linear-gradient(135deg, #0d9488, #0f766e);"
            >
              Book an Eco-Clean
            </button>
            <button class="px-8 py-4 font-medium rounded-2xl border-2 transition-all duration-300" style="color: #0d9488; border-color: #0d9488; background: transparent;" onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='transparent'">
              Our Green Promise
            </button>
          </div>
        </div>

        <!-- Visual -->
        <div class="relative order-1 lg:order-2 flex justify-center animate-in" style="animation-delay: 0.2s;">
          <div class="relative">
            <!-- Main card -->
            <div class="bg-white rounded-3xl shadow-2xl p-8 w-72 border border-teal-50">
              <div class="h-40 rounded-2xl mb-6 flex items-center justify-center" style="background: linear-gradient(135deg, #ccfbf1, #a7f3d0);">
                <div class="text-center">
                  <div class="text-5xl mb-1">🌊</div>
                  <p class="text-teal-800 font-bold text-sm tracking-wider uppercase">Coastal Clear</p>
                </div>
              </div>
              <div class="space-y-3">
                <div v-for="feature in cardFeatures" :key="feature" class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span class="text-gray-700 text-sm">{{ feature }}</span>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-teal-50 flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-400">Most popular</p>
                  <p class="font-bold text-teal-700 text-lg">From $149</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-400">Avg. rating</p>
                  <p class="font-bold text-gray-900">⭐ 4.9/5</p>
                </div>
              </div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -top-4 -right-4 bg-teal-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
              🌱 Carbon Neutral
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section style="background: #0d9488;" class="py-10">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-3xl font-bold text-white">{{ stat.value }}</div>
          <div class="text-teal-200 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold mb-4" style="color: #0d4a3e;">How It Works</h2>
          <p class="text-gray-500 text-lg">Three simple steps to a spotless, sustainable home.</p>
        </div>
        <div class="grid sm:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="step.title" class="text-center animate-in">
            <div class="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl shadow-sm" style="background: #f0faf9;">
              {{ step.icon }}
            </div>
            <div class="text-4xl font-black mb-3" style="color: #ccfbf1;">0{{ i + 1 }}</div>
            <h3 class="font-bold text-lg mb-2" style="color: #0d4a3e;">{{ step.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6" style="background: #f0faf9;">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold mb-4" style="color: #0d4a3e;">Our Green Promise</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in border border-teal-50"
          >
            <div class="text-4xl mb-4">{{ benefit.icon }}</div>
            <h3 class="font-bold mb-2" style="color: #0d4a3e;">{{ benefit.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-5" style="background: linear-gradient(135deg, #0d9488, #0f766e);" class="py-20 px-6">
      <div class="max-w-xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-white mb-3">Book Your Eco-Clean</h2>
          <p class="text-teal-200 text-lg">Join 8,000+ households who've made the green switch.</p>
        </div>

        <div v-if="!submitted" class="bg-white rounded-3xl p-8 shadow-2xl">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block font-semibold mb-2 text-sm" style="color: #0d4a3e;">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your full name"
                class="w-full px-4 py-3.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                :class="errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-teal-200'"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1.5">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block font-semibold mb-2 text-sm" style="color: #0d4a3e;">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-4 py-3.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                :class="errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-teal-200'"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1.5">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block font-semibold mb-2 text-sm" style="color: #0d4a3e;">Home Size</label>
              <select v-model="form.concern" class="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-200 appearance-none">
                <option value="">Select home size…</option>
                <option v-for="s in homeSizes" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-4 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-lg text-lg"
              style="background: linear-gradient(135deg, #0d9488, #0f766e);"
            >
              Book My Eco-Clean 🌿
            </button>
          </form>
        </div>

        <div v-else class="bg-white rounded-3xl p-12 text-center shadow-2xl">
          <div class="text-6xl mb-6">🌿</div>
          <h3 class="text-3xl font-bold mb-3" style="color: #0d4a3e;">You're all set, {{ form.name }}!</h3>
          <p class="text-gray-600 text-lg">We'll reach you at {{ form.email }} with a tailored quote. Our team responds within 1 hour.</p>
          <button @click="submitted = false" class="mt-6 text-sm underline transition-colors" style="color: #0d9488;">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-12 px-6" style="background: #0d4a3e;">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-bold text-white text-xl">Coastal Clear</p>
          <p class="text-teal-300/60 text-sm mt-1">Gold Coast, QLD · Eco-Conscious Cleaning</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-teal-300/40 text-xs text-center md:text-right">
          © 2026 Coastal Clear. All rights reserved.<br/>
          <span class="text-teal-300/20">A Tribe6 Portfolio Sample</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const cardFeatures = ['100% Organic Products', 'Pet & Child Safe', 'Reef-Safe Certified', 'Carbon-Neutral Service']

const stats = [
  { value: '8k+', label: 'Happy Households' },
  { value: '4.9/5', label: 'Eco Rating' },
  { value: '0kg', label: 'Plastic Used' },
  { value: '100%', label: 'Organic Products' },
]

const steps = [
  { icon: '📱', title: 'Book Online', desc: 'Fill in your details, choose a time — done in under 60 seconds.' },
  { icon: '🌿', title: 'We Clean Green', desc: 'Our certified team arrives with organic, reef-safe products.' },
  { icon: '😊', title: 'You Relax', desc: 'Come home to a spotless space and breathe easy — literally.' },
]

const benefits = [
  { icon: '🌿', title: 'Organic Products Only', desc: 'Every product is certified organic and reef-safe. No nasty chemicals, ever.' },
  { icon: '♻️', title: 'Zero Single-Use Plastic', desc: 'We bring our own reusable equipment. Zero waste, every visit.' },
  { icon: '🐾', title: 'Pet & Baby Safe', desc: 'Formulas that are completely safe for even the most vulnerable family members.' },
  { icon: '🌊', title: 'Reef-Safe Certified', desc: 'Operating on the Gold Coast, we take reef protection seriously. Always.' },
]

const homeSizes = ['Studio / 1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms', 'Commercial Space']

const socials = [
  { name: 'Instagram', url: 'https://instagram.com', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  { name: 'Facebook', url: 'https://facebook.com', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
  { name: 'TikTok', url: 'https://tiktok.com', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
]

const form = ref({ name: '', email: '', concern: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('lead-form-5')?.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Full name is required.'
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email.'
  }
  if (Object.keys(errors.value).length === 0) submitted.value = true
}

let observer = null
onMounted(() => { observer = initAnimations() })
onUnmounted(() => observer?.disconnect())
</script>
