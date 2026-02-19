<template>
  <div class="min-h-screen font-sans bg-white">
    <!-- HERO — Premium Navy -->
    <section class="relative min-h-screen flex items-center overflow-hidden pt-16" style="background: #0f172a;">
      <!-- Sparkle pattern -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="(spark, i) in sparks"
          :key="i"
          class="absolute rounded-full bg-white"
          :style="`width: ${spark.size}px; height: ${spark.size}px; top: ${spark.top}%; left: ${spark.left}%; opacity: ${spark.opacity}; animation: pulse ${spark.duration}s ease-in-out infinite; animation-delay: ${spark.delay}s;`"
        ></div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-1/2"
        style="background: linear-gradient(to top, #1e3a5f15, transparent);"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div class="animate-in">
          <div class="inline-flex items-center gap-2 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse"></span>
            ProShine Services · Melbourne, VIC
          </div>
          <h1 class="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Premium Clean.<br />
            <span class="text-transparent bg-clip-text" style="background: linear-gradient(90deg, #60a5fa, #38bdf8);">
              Guaranteed.
            </span>
          </h1>
          <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
            ProShine is Melbourne's most awarded premium residential and commercial cleaning company. Trusted by 15,000+ households and businesses across Victoria.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="scrollToForm"
              class="px-8 py-4 font-bold text-[#0f172a] rounded-2xl transition-all duration-300 shadow-2xl hover:-translate-y-1 transform text-lg"
              style="background: linear-gradient(135deg, #60a5fa, #38bdf8);"
            >
              Request a Quote
            </button>
            <button class="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-2xl transition-all duration-300 hover:bg-white/5">
              View Case Studies
            </button>
          </div>

          <!-- Awards row -->
          <div class="mt-10 flex flex-wrap gap-4">
            <div v-for="award in awards" :key="award" class="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
              <span class="text-blue-400 text-xs">★</span>
              <span class="text-white/70 text-xs font-medium">{{ award }}</span>
            </div>
          </div>
        </div>

        <!-- Stats vertical card -->
        <div class="animate-in" style="animation-delay: 0.3s;">
          <div class="rounded-3xl overflow-hidden border border-white/10" style="background: rgba(255,255,255,0.04); backdrop-filter: blur(20px);">
            <div class="p-2">
              <div class="rounded-2xl h-48 flex items-center justify-center" style="background: linear-gradient(135deg, #1e3a5f, #0f172a);">
                <div class="text-center">
                  <div class="text-5xl mb-2">✨</div>
                  <p class="text-white font-bold tracking-widest uppercase text-sm">ProShine Services</p>
                  <p class="text-blue-300/60 text-xs mt-1">Melbourne, Victoria</p>
                </div>
              </div>
            </div>
            <div class="p-6 grid grid-cols-2 gap-4">
              <div v-for="kpi in kpis" :key="kpi.label" class="text-center p-4 rounded-2xl" style="background: rgba(255,255,255,0.05);">
                <div class="text-2xl font-bold text-white mb-1">{{ kpi.value }}</div>
                <div class="text-blue-300/60 text-xs">{{ kpi.label }}</div>
              </div>
            </div>
            <div class="px-6 pb-6">
              <div class="rounded-2xl p-4 border border-blue-400/20" style="background: rgba(96,165,250,0.08);">
                <p class="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">Client Guarantee</p>
                <p class="text-white/70 text-sm">If you're not 100% satisfied, we re-clean for free within 24 hours — no questions, no fuss.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS dark band -->
    <section style="background: #1e3a5f;" class="py-10">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="stat in stats" :key="stat.label" class="text-center animate-in">
          <div class="text-3xl font-bold text-white">{{ stat.value }}</div>
          <div class="text-blue-300/70 text-sm mt-1">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- SERVICES grid -->
    <section class="py-20 px-6 bg-gray-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p class="text-gray-500 text-lg">From weekly maintenance to full commercial contracts.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in serviceCards"
            :key="service.name"
            class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in group"
          >
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:-rotate-3 transition-transform duration-200" :style="`background: ${service.bg};`">
              {{ service.icon }}
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">{{ service.name }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ service.desc }}</p>
            <div class="flex items-center justify-between">
              <span class="text-blue-600 font-bold text-sm">{{ service.price }}</span>
              <span class="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{{ service.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14 animate-in">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">The ProShine Standard</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="benefit in benefits" :key="benefit.title"
            class="p-6 rounded-2xl border-2 border-transparent hover:border-blue-100 bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 animate-in">
            <div class="text-3xl mb-4">{{ benefit.icon }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEAD FORM -->
    <section id="lead-form-6" style="background: #0f172a;" class="py-20 px-6">
      <div class="max-w-xl mx-auto animate-in">
        <div class="text-center mb-10">
          <h2 class="text-4xl font-bold text-white mb-3">Get Your Custom Quote</h2>
          <p class="text-blue-300 text-lg">Receive a tailored quote within 60 minutes. No lock-in contracts.</p>
        </div>

        <div v-if="!submitted" class="rounded-3xl p-8 border border-white/10" style="background: rgba(255,255,255,0.05);">
          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-blue-200 text-sm font-semibold mb-2">Full Name *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your full name"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                :class="errors.name ? 'border-red-400' : 'border-white/10'"
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1.5">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-blue-200 text-sm font-semibold mb-2">Email Address *</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="you@email.com"
                class="w-full px-4 py-3.5 rounded-xl bg-white/10 border text-white placeholder-white/30 focus:outline-none focus:border-blue-400 transition-colors"
                :class="errors.email ? 'border-red-400' : 'border-white/10'"
              />
              <p v-if="errors.email" class="text-red-400 text-xs mt-1.5">{{ errors.email }}</p>
            </div>
            <div>
              <label class="block text-blue-200 text-sm font-semibold mb-2">Property Type</label>
              <select v-model="form.concern" class="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:border-blue-400 appearance-none">
                <option value="" class="text-gray-800">Select property type…</option>
                <option v-for="t in propertyTypes" :key="t" :value="t" class="text-gray-800">{{ t }}</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full py-4 font-bold text-[#0f172a] rounded-xl transition-all duration-300 hover:-translate-y-0.5 transform shadow-xl text-lg"
              style="background: linear-gradient(135deg, #60a5fa, #38bdf8);"
            >
              Request My Custom Quote ✨
            </button>
          </form>
        </div>

        <div v-else class="rounded-3xl p-12 text-center border border-white/10" style="background: rgba(255,255,255,0.05);">
          <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style="background: linear-gradient(135deg, #60a5fa, #38bdf8);">
            <svg class="w-10 h-10 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h3 class="text-3xl font-bold text-white mb-3">Quote Request Received!</h3>
          <p class="text-blue-300 text-lg">Thanks, <strong>{{ form.name }}</strong>! A ProShine consultant will email {{ form.email }} within 60 minutes.</p>
          <button @click="submitted = false" class="mt-6 text-blue-400/60 underline text-sm hover:text-blue-300 transition-colors">Submit another</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-12 px-6 border-t border-white/5" style="background: #060c18;">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p class="font-bold text-white text-xl">ProShine Services</p>
          <p class="text-blue-400/50 text-sm mt-1">Melbourne, VIC · Premium Cleaning Solutions</p>
        </div>
        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener"
            class="w-10 h-10 rounded-full border border-white/10 hover:border-blue-400/40 flex items-center justify-center text-white/60 hover:text-blue-300 transition-all duration-200 hover:-translate-y-0.5"
            :aria-label="social.name">
            <span v-html="social.icon"></span>
          </a>
        </div>
        <p class="text-white/20 text-xs text-center md:text-right">
          © 2026 ProShine Services. All rights reserved.<br/>
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

// Random sparkle particles
const sparks = Array.from({ length: 30 }, () => ({
  size: Math.random() * 3 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.3 + 0.05,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 3,
}))

const awards = ['RACV Recommended 2025', 'Top Rated VIC 2024', 'ISO 9001 Certified', 'Master Cleaners Assoc.']

const kpis = [
  { value: '15k+', label: 'Clients Served' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '8 yrs', label: 'In Business' },
  { value: '100%', label: 'Satisfaction Rate' },
]

const stats = [
  { value: '15k+', label: 'Properties Cleaned' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '<60min', label: 'Response Time' },
  { value: '24hr', label: 'Re-clean Guarantee' },
]

const serviceCards = [
  { icon: '🏠', name: 'Residential Standard', desc: 'Thorough weekly or fortnightly cleaning for apartments and houses.', price: 'From $149', tag: 'Most Popular', bg: 'rgba(96,165,250,0.1)' },
  { icon: '🔍', name: 'Deep Clean', desc: 'Top-to-bottom intensive clean — perfect before moving in or out.', price: 'From $299', tag: 'Full Day', bg: 'rgba(56,189,248,0.1)' },
  { icon: '🏢', name: 'Commercial', desc: 'Office and retail cleaning on daily, weekly, or monthly schedules.', price: 'Custom Quote', tag: 'B2B', bg: 'rgba(99,102,241,0.1)' },
  { icon: '🚪', name: 'End of Lease', desc: 'Bond-back guaranteed cleaning for landlords and tenants.', price: 'From $449', tag: 'Guaranteed', bg: 'rgba(34,211,238,0.1)' },
  { icon: '✈️', name: 'Airbnb Turnover', desc: 'Fast, hotel-standard turnaround between guests.', price: 'From $99', tag: 'Per Turnover', bg: 'rgba(52,211,153,0.1)' },
  { icon: '🏗️', name: 'Post-Construction', desc: 'Remove dust, debris, and construction residue from new builds.', price: 'Custom Quote', tag: 'Specialist', bg: 'rgba(251,191,36,0.1)' },
]

const benefits = [
  { icon: '🛡️', title: 'Fully Insured', desc: 'All staff are police-checked, fully insured, and professionally trained.' },
  { icon: '⚙️', title: 'Pro-Grade Equipment', desc: 'Industrial HEPA vacuums, steam cleaners, and hospital-grade solutions.' },
  { icon: '📱', title: 'Online Booking', desc: 'Book, reschedule, and manage cleans from your phone 24/7.' },
  { icon: '✅', title: '100% Satisfaction', desc: 'Not happy? We re-clean within 24 hours at zero cost, guaranteed.' },
]

const propertyTypes = ['Apartment / Unit', 'House (1–2 bed)', 'House (3–4 bed)', 'House (5+ bed)', 'Office / Commercial', 'Retail Space', 'New Construction']

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
  document.getElementById('lead-form-6')?.scrollIntoView({ behavior: 'smooth' })
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
