<template>
  <div class="min-h-screen font-sans bg-white">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div class="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style="background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Text -->
        <div class="animate-in">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
            </div>
            <span class="text-sky-600 font-semibold text-sm tracking-wide">Brightside Clean Co. · Sydney, NSW</span>
          </div>
          <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Your Home,<br />
            <span class="text-sky-500">Spotlessly</span><br />
            Clean.
          </h1>
          <p class="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
            Sydney's most trusted residential cleaning service. Professional, insured, and obsessed with the details — so you don't have to be.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="scrollToForm"
              class="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-sky-200 hover:-translate-y-0.5 transform text-lg"
            >
              Book My Clean Today
            </button>
            <button class="px-8 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-2xl border border-gray-200 transition-all duration-300">
              See Our Services
            </button>
          </div>

          <!-- Trust row -->
          <div class="mt-10 flex flex-wrap gap-6 items-center">
            <div v-for="trust in trustBadges" :key="trust.label" class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-500 text-lg">{{ trust.icon }}</div>
              <span class="text-gray-600 text-sm font-medium">{{ trust.label }}</span>
            </div>
          </div>
        </div>

        <!-- Service card stack -->
        <div class="relative animate-in" style="animation-delay: 0.3s;">
          <div class="space-y-4">
            <div
              v-for="(service, i) in services"
              :key="service.name"
              class="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              :style="`animation-delay: ${i * 0.1}s`"
            >
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" :class="service.bg">
                {{ service.icon }}
              </div>
              <div class="flex-1">
                <p class="font-bold text-gray-900">{{ service.name }}</p>
                <p class="text-gray-500 text-sm">{{ service.desc }}</p>
              </div>
              <span class="text-sky-500 font-bold text-sm whitespace-nowrap">{{ service.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="bg-sky-500 py-10">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-3xl font-bold text-white">{{ stat.value }}</div>
          <div class="text-sky-100 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Brightside?</h2>
          <p class="text-gray-500 text-lg max-w-md mx-auto">We're not just cleaners — we're your home's best friend.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in"
          >
            <div class="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl mb-4">{{ benefit.icon }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-4" class="py-20 px-6 bg-sky-600">
      <div class="max-w-xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-white mb-3">Book Your First Clean</h2>
          <p class="text-sky-200 text-lg">Get an instant quote — no obligation, no lock-in contracts.</p>
        </div>

        <div v-if="!submitted" class="bg-white rounded-3xl p-8 shadow-2xl">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full px-4 py-3.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
                :class="errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p v-if="errors.name" class="text-red-500 text-xs mt-1.5">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-4 py-3.5 rounded-xl border text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
                :class="errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p v-if="errors.email" class="text-red-500 text-xs mt-1.5">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-semibold mb-2">Service Type</label>
              <select v-model="form.concern" class="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 appearance-none bg-white">
                <option value="">Select a service…</option>
                <option v-for="s in serviceTypes" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-lg text-lg"
            >
              Get My Free Quote ✓
            </button>
            <p class="text-gray-400 text-xs text-center">No credit card needed. We'll contact you within 2 hours.</p>
          </form>
        </div>

        <div v-else class="bg-white rounded-3xl p-12 text-center shadow-2xl">
          <div class="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 class="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>
          <p class="text-gray-600 text-lg">Thanks, <strong>{{ form.name }}</strong>! We'll be in touch at {{ form.email }} within 2 hours.</p>
          <button @click="submitted = false" class="mt-6 text-sky-500 underline text-sm hover:text-sky-700 transition-colors">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-gray-900 py-12 px-6">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-bold text-white text-xl">Brightside Clean Co.</p>
          <p class="text-gray-400 text-sm mt-1">Sydney, NSW · Australian Residential Cleaning</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-gray-600 text-xs text-center md:text-right">
          © 2026 Brightside Clean Co. All rights reserved.<br/>
          <span class="text-gray-700">A Tribe6 Portfolio Sample</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const trustBadges = [
  { icon: '🛡️', label: 'Fully Insured' },
  { icon: '✅', label: 'Police Checked' },
  { icon: '🌿', label: 'Eco Products' },
  { icon: '📅', label: 'Flexible Scheduling' },
]

const services = [
  { icon: '🏠', name: 'Standard Clean', desc: 'All rooms, 2–3 bedrooms', price: 'From $129', bg: 'bg-sky-50' },
  { icon: '✨', name: 'Deep Clean', desc: 'Top-to-bottom thorough clean', price: 'From $249', bg: 'bg-blue-50' },
  { icon: '🚪', name: 'End of Lease', desc: 'Bond-back guaranteed', price: 'From $349', bg: 'bg-indigo-50' },
]

const stats = [
  { value: '12k+', label: 'Homes Cleaned' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '100%', label: 'Happiness Guarantee' },
  { value: '2hrs', label: 'Response Time' },
]

const benefits = [
  { icon: '🌿', title: 'Eco-Safe Products', desc: 'Hospital-grade clean with plant-based, family-safe cleaning solutions.' },
  { icon: '🛡️', title: 'Insured & Police Checked', desc: 'Every cleaner undergoes rigorous background checks and is fully insured.' },
  { icon: '📱', title: 'Same-Day Booking', desc: 'Book online in under 60 seconds. Available 7 days a week across greater Sydney.' },
  { icon: '💯', title: 'Happiness Guarantee', desc: 'Not happy? We come back within 24 hours to re-clean at absolutely no charge.' },
]

const serviceTypes = ['Standard Residential Clean', 'Deep Clean', 'End of Lease / Bond Clean', 'Airbnb Turnover', 'Office Cleaning', 'Other']

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
  document.getElementById('lead-form-4')?.scrollIntoView({ behavior: 'smooth' })
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
