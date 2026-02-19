<template>
  <div class="min-h-screen font-sans bg-[#450a0a]">
    <!-- HERO — Dark glamour -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div class="absolute inset-0" style="background: linear-gradient(135deg, #2d0707 0%, #450a0a 50%, #6b1a1a 100%);"></div>
      <!-- Animated glow orbs -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-slow"
        style="background: radial-gradient(circle, #c9a84c 0%, transparent 70%);"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse-slow"
        style="background: radial-gradient(circle, #fda4af 0%, transparent 70%); animation-delay: 1s;"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <div class="animate-in">
          <span class="inline-block text-[#c9a84c] text-xs tracking-[0.4em] uppercase font-semibold mb-8 border border-[#c9a84c]/30 px-6 py-2 rounded-full">
            ✦ Velour & Co. — Toronto, Canada ✦
          </span>
          <h1 class="font-serif text-6xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Glamour<br />
            <span class="text-transparent bg-clip-text" style="background: linear-gradient(90deg, #c9a84c, #f5d78e, #c9a84c);">
              Redefined
            </span>
          </h1>
          <p class="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Velour & Co. is where luxury meets bold self-expression. Our pigment-rich formulas are designed for the woman who refuses to be invisible.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="scrollToForm"
              class="px-10 py-4 font-bold text-[#450a0a] rounded-full transition-all duration-300 hover:-translate-y-1 transform shadow-2xl text-lg"
              style="background: linear-gradient(90deg, #c9a84c, #f5d78e);"
            >
              Unlock My Look 💄
            </button>
            <button class="px-10 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-medium rounded-full hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300">
              View the Collection
            </button>
          </div>
        </div>

        <!-- Floating product showcase -->
        <div class="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-in" style="animation-delay: 0.4s;">
          <div v-for="shade in shades" :key="shade.name" class="group cursor-pointer">
            <div
              class="h-16 rounded-2xl shadow-lg group-hover:-translate-y-2 transition-transform duration-300 border border-white/10"
              :style="`background: ${shade.color};`"
            ></div>
            <p class="text-white/50 text-xs mt-2 group-hover:text-[#c9a84c] transition-colors">{{ shade.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section style="background: linear-gradient(90deg, #2d0707, #6b1a1a);" class="py-10">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-3xl font-bold text-[#c9a84c] font-serif">{{ stat.value }}</div>
          <div class="text-white/60 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6" style="background: #2d0707;">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="font-serif text-4xl font-bold text-white mb-4">The Velour Standard</h2>
          <p class="text-white/50 text-lg max-w-md mx-auto">Four pillars that set us apart from the rest.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="rounded-2xl p-6 border border-white/10 hover:border-[#c9a84c]/30 hover:-translate-y-1 transition-all duration-300 animate-in"
            style="background: rgba(255,255,255,0.04);"
          >
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style="background: linear-gradient(135deg, #c9a84c22, #c9a84c11);">
              {{ benefit.icon }}
            </div>
            <h3 class="font-semibold text-[#c9a84c] text-lg mb-2">{{ benefit.title }}</h3>
            <p class="text-white/50 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS strip -->
    <section class="py-12 px-6 overflow-hidden" style="background: #450a0a;">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div v-for="t in testimonials" :key="t.name" class="bg-white/5 rounded-2xl p-6 border border-white/10 animate-in">
          <div class="text-[#c9a84c] text-2xl mb-3">★★★★★</div>
          <p class="text-white/80 text-sm italic leading-relaxed mb-4">"{{ t.quote }}"</p>
          <p class="text-[#c9a84c] text-sm font-semibold">— {{ t.name }}, {{ t.city }}</p>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-3" class="py-20 px-6" style="background: linear-gradient(135deg, #2d0707 0%, #450a0a 100%);">
      <div class="max-w-xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="font-serif text-4xl font-bold text-white mb-3">Unlock Your Exclusive Look</h2>
          <p class="text-[#c9a84c] text-lg">Get early access to new shades + a 20% welcome discount.</p>
        </div>

        <div v-if="!submitted" class="rounded-3xl p-8 border border-[#c9a84c]/20" style="background: rgba(255,255,255,0.05);">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-[#c9a84c]/80 text-sm font-medium mb-2">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none transition-colors"
                :class="errors.name ? 'border-red-400' : 'border-white/10 focus:border-[#c9a84c]/50'"
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1.5">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-[#c9a84c]/80 text-sm font-medium mb-2">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none transition-colors"
                :class="errors.email ? 'border-red-400' : 'border-white/10 focus:border-[#c9a84c]/50'"
              />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1.5">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block text-[#c9a84c]/80 text-sm font-medium mb-2">Favourite Category</label>
              <select v-model="form.concern" class="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-[#c9a84c]/50 appearance-none">
                <option value="" class="text-gray-800">Select category…</option>
                <option v-for="c in categories" :key="c" :value="c" class="text-gray-800">{{ c }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-4 font-bold text-[#450a0a] rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-xl text-lg"
              style="background: linear-gradient(90deg, #c9a84c, #f5d78e);"
            >
              Unlock My 20% Discount 💄
            </button>
          </form>
        </div>

        <div v-else class="rounded-3xl p-12 border border-[#c9a84c]/20 text-center" style="background: rgba(255,255,255,0.05);">
          <div class="text-6xl mb-6 animate-bounce">💄</div>
          <h3 class="font-serif text-3xl font-bold text-white mb-3">Welcome to Velour, {{ form.name }}!</h3>
          <p class="text-[#c9a84c] text-lg">Your 20% discount code is heading to {{ form.email }} right now.</p>
          <button @click="submitted = false" class="mt-6 text-[#c9a84c]/60 underline text-sm hover:text-[#c9a84c] transition-colors">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-12 px-6 border-t border-white/10" style="background: #1a0404;">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-serif text-white font-bold text-xl">Velour & Co.</p>
          <p class="text-[#c9a84c]/50 text-sm mt-1">Toronto, Canada · Luxury Cosmetics</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 flex items-center justify-center text-[#c9a84c]/70 hover:text-[#c9a84c] transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-white/20 text-xs text-center md:text-right">
          © 2026 Velour & Co. All rights reserved.<br/>
          <span class="text-white/10">A Tribe6 Portfolio Sample</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const shades = [
  { name: 'Velvet Merlot', color: '#7f1d1d' },
  { name: 'Gold Rush', color: '#c9a84c' },
  { name: 'Nude Luxe', color: '#c68642' },
  { name: 'Noir Rose', color: '#4a1c1c' },
  { name: 'Champagne', color: '#f5e6c0' },
  { name: 'Scarlet Sin', color: '#991b1b' },
]

const stats = [
  { value: '75k+', label: 'Global Clients' },
  { value: '4.9/5', label: 'Luxury Rating' },
  { value: '48hrs', label: 'Express Delivery' },
  { value: '200+', label: 'Signature Shades' },
]

const benefits = [
  { icon: '💎', title: 'Ultra-Rich Pigment', desc: 'One stroke. Intense, saturated colour that lasts 16+ hours.' },
  { icon: '🌹', title: 'Luxe Ingredients', desc: 'Infused with 24K gold extract and hyaluronic acid.' },
  { icon: '✈️', title: 'Worldwide Delivery', desc: 'Ships to 60+ countries with luxury packaging.' },
  { icon: '🛡️', title: 'Sensitivity Tested', desc: 'Formulated for all skin types, including sensitive.' },
]

const testimonials = [
  { quote: "Velour is the only brand that makes me feel like a runway model in my own kitchen.", name: "Isabelle M.", city: "Toronto" },
  { quote: "The pigment on their Scarlet Sin lipstick is unlike anything I've ever worn. Absolutely stunning.", name: "Priya K.", city: "Vancouver" },
  { quote: "Worth every cent. The packaging alone is a work of art. My go-to for every special occasion.", name: "Lauren B.", city: "Calgary" },
]

const categories = ['Lip Colour & Gloss', 'Foundation & Concealer', 'Eye & Brow', 'Blush & Highlight', 'Full Collection']

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
  document.getElementById('lead-form-3')?.scrollIntoView({ behavior: 'smooth' })
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
