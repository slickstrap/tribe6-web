<template>
  <div class="min-h-screen font-sans" style="background-color: #f0f7f4;">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 via-[#f0f7f4] to-white"></div>
      <div class="absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-20" style="background: radial-gradient(circle, #6ee7b7 0%, transparent 70%);"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text -->
        <div class="animate-in">
          <span class="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-semibold text-emerald-700 mb-8 bg-emerald-100 px-4 py-2 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            Canadian Clean Beauty
          </span>
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Pure. Natural.<br />
            <span class="text-emerald-600">Effortlessly</span> You.
          </h1>
          <p class="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
            Pure North Beauty is rooted in Canada's boreal forest traditions — wild-harvested botanicals, sustainable packaging, and zero compromise on clean.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="scrollToForm"
              class="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Get My Free Sample Kit
            </button>
            <button class="px-8 py-4 text-emerald-700 font-medium border-2 border-emerald-200 hover:border-emerald-400 rounded-xl transition-all duration-300">
              Learn Our Story
            </button>
          </div>

          <!-- Trust badges -->
          <div class="flex flex-wrap gap-3 mt-8">
            <span v-for="badge in badges" :key="badge" class="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
              ✓ {{ badge }}
            </span>
          </div>
        </div>

        <!-- Visual card -->
        <div class="relative animate-in" style="animation-delay: 0.3s;">
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div class="h-56 bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
              <div class="text-center">
                <div class="text-6xl mb-2">🌲</div>
                <p class="text-emerald-800 font-semibold tracking-widest text-sm uppercase">Pure North Beauty</p>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="product in products" :key="product.name" class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl flex-shrink-0">{{ product.icon }}</div>
                <div>
                  <p class="text-gray-900 font-semibold text-sm">{{ product.name }}</p>
                  <p class="text-gray-500 text-xs">{{ product.desc }}</p>
                </div>
                <span class="ml-auto text-emerald-700 font-bold text-sm">{{ product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="bg-emerald-800 py-8">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-3xl font-bold text-white">{{ stat.value }}</div>
          <div class="text-emerald-300 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">The Pure North Difference</h2>
          <p class="text-gray-500 text-lg max-w-md mx-auto">Clean beauty that's better for you and the planet.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="group p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 animate-in hover:bg-emerald-50"
          >
            <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-200 transition-colors">{{ benefit.icon }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-2" class="py-20 px-6 bg-emerald-900">
      <div class="max-w-xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-white mb-3">Claim Your Free Sample Kit</h2>
          <p class="text-emerald-300 text-lg">Tell us about yourself and we'll send you a personalised selection.</p>
        </div>

        <div v-if="!submitted" class="space-y-5">
          <div>
            <label class="block text-emerald-200 text-sm font-medium mb-2">Full Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your full name"
              class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
              :class="errors.name ? 'border-red-400' : 'border-white/20'"
            />
            <p v-if="errors.name" class="text-red-400 text-xs mt-1.5">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-emerald-200 text-sm font-medium mb-2">Email Address *</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@email.com"
              class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors"
              :class="errors.email ? 'border-red-400' : 'border-white/20'"
            />
            <p v-if="errors.email" class="text-red-400 text-xs mt-1.5">{{ errors.email }}</p>
          </div>
          <div>
            <label class="block text-emerald-200 text-sm font-medium mb-2">Skin Type</label>
            <select v-model="form.concern" class="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-emerald-400 appearance-none">
              <option value="" class="text-gray-800">Select your skin type…</option>
              <option v-for="c in concerns" :key="c" :value="c" class="text-gray-800">{{ c }}</option>
            </select>
          </div>
          <button
            @click="handleSubmit"
            class="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-lg text-lg"
          >
            Send My Free Kit 🌲
          </button>
        </div>

        <div v-else class="bg-white/10 rounded-3xl p-12 text-center border border-white/20">
          <div class="text-6xl mb-6">🌲</div>
          <h3 class="text-3xl font-bold text-white mb-3">On its way, {{ form.name }}!</h3>
          <p class="text-emerald-300 text-lg">We've sent confirmation to {{ form.email }}. Your sample kit ships within 3–5 business days.</p>
          <button @click="submitted = false" class="mt-6 text-emerald-300 underline text-sm hover:text-white transition-colors">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-emerald-950 py-10 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-bold text-white text-xl">Pure North Beauty</p>
          <p class="text-emerald-400/60 text-sm mt-1">Clean Canadian Cosmetics · Est. 2020</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-emerald-400/40 text-xs text-center md:text-right">
          © 2026 Pure North Beauty. All rights reserved.<br/>
          <span class="text-emerald-400/20">A Tribe6 Portfolio Sample</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const badges = ['Vegan', 'Leaping Bunny Certified', 'Sustainably Sourced', 'Carbon Neutral']

const products = [
  { icon: '🫧', name: 'Arctic Glow Serum', desc: 'Wild rosehip + sea buckthorn', price: '$68' },
  { icon: '🌿', name: 'Boreal Balm', desc: 'Calendula & birch bark moisturiser', price: '$52' },
  { icon: '💧', name: 'Muskeg Mist', desc: 'Peat water toning mist', price: '$38' },
]

const stats = [
  { value: '35k+', label: 'Happy Customers' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '100%', label: 'Vegan & Cruelty-Free' },
  { value: '21 Days', label: 'To See Results' },
]

const benefits = [
  { icon: '🌾', title: 'Wild-Harvested', desc: 'Botanicals sourced from Canada\'s pristine wilderness, ethically harvested.' },
  { icon: '♻️', title: 'Zero Waste', desc: 'All packaging is 100% recyclable or compostable. No plastic ever.' },
  { icon: '🔬', title: 'Science-Backed', desc: 'Every formula is clinically tested and peer-reviewed by our R&D team.' },
  { icon: '💚', title: 'B-Corp Certified', desc: 'We meet the highest standards of social and environmental performance.' },
]

const concerns = ['Dry/Dehydrated', 'Oily/Acne-Prone', 'Combination', 'Sensitive/Reactive', 'Mature/Anti-Ageing', 'Normal/Balanced']

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
  document.getElementById('lead-form-2')?.scrollIntoView({ behavior: 'smooth' })
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
