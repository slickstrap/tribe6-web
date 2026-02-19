<template>
  <div class="bg-[#fff1f2] min-h-screen font-sans">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#fff1f2] via-rose-50 to-rose-100"></div>
      <div class="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style="background: radial-gradient(circle, #fda4af 0%, transparent 70%);"></div>
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10"
        style="background: radial-gradient(circle, #450a0a 0%, transparent 70%);"></div>

      <div class="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
        <div class="animate-in">
          <span class="inline-block text-xs font-semibold tracking-[0.3em] text-[#450a0a]/70 uppercase mb-6 border border-[#450a0a]/20 px-4 py-1.5 rounded-full bg-white/50">
            Premium Canadian Cosmetics
          </span>
          <h1 class="font-serif text-5xl lg:text-7xl font-bold text-[#450a0a] leading-tight mb-6">
            Reveal Your<br />
            <em class="italic font-light">Radiant</em> Glow
          </h1>
          <p class="text-[#450a0a]/70 text-lg leading-relaxed mb-8 max-w-md">
            Maison Éclat blends the finest botanicals with cutting-edge science to deliver visible results in just 14 days. Proudly crafted in Montréal.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="scrollToForm"
              class="px-8 py-4 bg-[#450a0a] text-white font-semibold rounded-full hover:bg-[#7f1d1d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Start My Glow ✨
            </button>
            <button class="px-8 py-4 border-2 border-[#450a0a]/30 text-[#450a0a] font-medium rounded-full hover:border-[#450a0a] transition-all duration-300">
              Explore Products
            </button>
          </div>
        </div>

        <!-- Hero Visual -->
        <div class="relative flex justify-center animate-in" style="animation-delay: 0.2s;">
          <div class="relative w-72 h-72 lg:w-96 lg:h-96">
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200 to-rose-100 shadow-2xl"></div>
            <div class="absolute inset-6 rounded-full bg-gradient-to-tl from-[#fff1f2] to-rose-50 flex items-center justify-center">
              <div class="text-center">
                <div class="text-8xl mb-2">🌹</div>
                <p class="font-serif text-[#450a0a] font-semibold text-sm tracking-widest uppercase">Maison Éclat</p>
                <p class="text-[#450a0a]/50 text-xs mt-1">Montréal · Since 2018</p>
              </div>
            </div>
            <!-- Floating badges -->
            <div class="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-3 py-2 text-xs font-semibold text-[#450a0a]">
              🌿 100% Clean
            </div>
            <div class="absolute -bottom-4 -left-4 bg-[#450a0a] rounded-2xl shadow-lg px-3 py-2 text-xs font-semibold text-white">
              ⭐ 4.9 / 5 Rating
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="bg-[#450a0a] py-8">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-white font-bold text-2xl lg:text-3xl font-serif">{{ stat.value }}</div>
          <div class="text-rose-300 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6 bg-gradient-to-b from-rose-50 to-[#fff1f2]">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="font-serif text-4xl font-bold text-[#450a0a] mb-4">Why Maison Éclat?</h2>
          <p class="text-[#450a0a]/60 text-lg max-w-xl mx-auto">Where luxury meets efficacy — formulated for the modern woman.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-white/70 backdrop-blur rounded-2xl p-6 border border-rose-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in"
          >
            <div class="text-4xl mb-4">{{ benefit.icon }}</div>
            <h3 class="font-semibold text-[#450a0a] text-lg mb-2">{{ benefit.title }}</h3>
            <p class="text-[#450a0a]/60 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-1" class="py-20 px-6 bg-[#450a0a]">
      <div class="max-w-2xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="font-serif text-4xl font-bold text-white mb-3">Begin Your Glow Journey</h2>
          <p class="text-rose-300 text-lg">Get a personalised skincare consultation — complimentary.</p>
        </div>

        <div v-if="!submitted" class="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-rose-200 text-sm font-medium mb-2">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:border-rose-300 transition-colors"
                :class="errors.name ? 'border-red-400' : 'border-white/20'"
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1.5">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-rose-200 text-sm font-medium mb-2">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:border-rose-300 transition-colors"
                :class="errors.email ? 'border-red-400' : 'border-white/20'"
              />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1.5">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block text-rose-200 text-sm font-medium mb-2">Primary Skin Concern</label>
              <select
                v-model="form.concern"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-rose-300 transition-colors appearance-none"
              >
                <option value="" class="text-gray-800">Select a concern…</option>
                <option v-for="c in concerns" :key="c" :value="c" class="text-gray-800">{{ c }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-4 bg-rose-400 hover:bg-rose-300 text-[#450a0a] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-lg text-lg"
            >
              Claim My Free Consultation ✨
            </button>
          </form>
        </div>

        <!-- Success State -->
        <div v-else class="bg-white/10 backdrop-blur rounded-3xl p-12 border border-white/20 text-center">
          <div class="text-6xl mb-6 animate-bounce">🌹</div>
          <h3 class="font-serif text-3xl font-bold text-white mb-3">You're on the list!</h3>
          <p class="text-rose-300 text-lg">Thank you, <strong>{{ form.name }}</strong>! Your consultation details have been sent to {{ form.email }}.</p>
          <button @click="submitted = false" class="mt-6 text-rose-300 underline text-sm hover:text-white transition-colors">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-[#2d0707] py-12 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-serif text-white font-semibold text-xl">Maison Éclat</p>
          <p class="text-rose-300/60 text-sm mt-1">Premium Canadian Cosmetics · Montréal</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-rose-300/50 text-xs text-center md:text-right">
          © 2026 Maison Éclat. All rights reserved.<br />
          <span class="text-rose-300/30">A Tribe6 Portfolio Sample</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const stats = [
  { value: '50k+', label: 'Happy Customers' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '100%', label: 'Cruelty-Free' },
  { value: '14 Days', label: 'Visible Results' },
]

const benefits = [
  { icon: '🌿', title: 'Clean Beauty', desc: 'No parabens, sulfates or synthetic fragrances. Certified clean.' },
  { icon: '⚡', title: 'Fast-Acting', desc: 'Clinically proven formulas that show results within 14 days.' },
  { icon: '🧬', title: 'Dermatologist Tested', desc: 'Every product approved by Canadian board-certified dermatologists.' },
  { icon: '🔄', title: '30-Day Promise', desc: 'Love your results or we refund you completely. No questions asked.' },
]

const concerns = ['Dryness & Dehydration', 'Anti-Ageing', 'Acne & Breakouts', 'Hyperpigmentation', 'Sensitive Skin', 'Dullness & Uneven Tone']

const socials = [
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  },
]

const form = ref({ name: '', email: '', concern: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('lead-form-1')?.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Full name is required.'
  if (!form.value.email.trim()) {
    errors.value.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
  }
  if (Object.keys(errors.value).length === 0) {
    submitted.value = true
  }
}

let observer = null
onMounted(() => { observer = initAnimations() })
onUnmounted(() => observer?.disconnect())
</script>
