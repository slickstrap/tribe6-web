<template>
  <div class="relative min-h-screen bg-[#0c0f14] font-sans text-white pb-20 md:pb-0 selection:bg-orange-500/30">
    <!-- PLACEHOLDER FOR FACEBOOK/TIKTOK PIXEL SCRIPTS (in <head>) -->

    <!-- Internal brand header removed — global Tribe6 Navbar handles navigation -->
    <!-- Brand shown within the hero panel below -->


    <!-- HERO — Vertical Split: Before/After & Instant Quote Form -->
    <section class="min-h-screen pt-[68px] flex flex-col lg:flex-row overflow-hidden">
      <!-- LEFT: Before/After Slider Panel -->
      <div class="w-full lg:w-1/2 relative flex flex-col items-center justify-center px-8 py-20 overflow-hidden bg-[#0c0f14]">
        <!-- Drama glow -->
        <div class="absolute inset-0 bg-radial-gradient pointer-events-none" style="background: radial-gradient(circle at 50% 50%, rgba(249,115,22,0.12) 0%, transparent 70%);"></div>

        <div class="relative z-10 max-w-md w-full">
          <!-- Brand name in left panel (replaces removed header) -->
          <div class="font-black text-2xl tracking-tighter mb-6">
            <span class="text-orange-500">Bright</span><span class="text-white">Touch.</span>
          </div>
          <div class="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-widest text-orange-400">Pooraka, Adelaide · Specialist Cleaning</span>
          </div>

          <h1 class="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight mb-6">
            The Ultimate Reset:<br/>
            <span style="display:inline-block; background: linear-gradient(90deg, #f97316, #fb923c, #fdba74); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Carpet &amp; Oven</span><br/>
            Specialists.
          </h1>
          <p class="text-slate-400 text-lg font-medium mb-10 max-w-sm">
            Pooraka's #1 specialist for deep carpet extraction, professional oven restoration, and bond-back end-of-lease cleans.
          </p>

          <!-- Before / After Slider (CSS-based simulation) -->
          <div class="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] mb-8 select-none" style="aspect-ratio: 16/9;">
            <!-- AFTER side (full width, orange-hued clean) -->
            <div class="absolute inset-0 flex items-center justify-center" style="background: linear-gradient(135deg, #1a1007, #2d1a0a);">
              <div class="text-center">
                <div class="text-5xl mb-2">✨</div>
                <p class="text-orange-300 font-black text-xs uppercase tracking-widest">After: Bright Touch Result</p>
              </div>
            </div>
            <!-- BEFORE side (clipped) -->
            <div class="absolute inset-0 flex items-center justify-center overflow-hidden" :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }">
              <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, #1a1a1a, #2a2318);">
                <div class="text-center">
                  <div class="text-5xl mb-2">😬</div>
                  <p class="text-slate-400 font-black text-xs uppercase tracking-widest">Before</p>
                </div>
              </div>
            </div>
            <!-- Divider line -->
            <div class="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" :style="{ left: sliderPosition + '%' }">
              <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-ew-resize">
                <svg class="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l-3 3 3 3m8-6l3 3-3 3"/></svg>
              </div>
            </div>
            <!-- Drag input -->
            <input type="range" min="0" max="100" v-model="sliderPosition"
              class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />
          </div>
          <p class="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center">← Drag to Compare Results →</p>
        </div>
      </div>

      <!-- RIGHT: Multi-Step Instant Quote Form -->
      <div class="w-full lg:w-1/2 bg-[#111520] flex items-center justify-center px-8 py-20 border-l border-white/5">
        <div class="w-full max-w-md">
          <h2 class="text-3xl font-black mb-2">Get My Bundle Quote</h2>
          <p class="text-slate-500 font-medium mb-8">Instant pricing in under 60 seconds — no obligation.</p>

          <!-- Step indicator -->
          <div class="flex items-center gap-3 mb-10">
            <div v-for="s in 3" :key="s"
              :class="['h-1.5 rounded-full flex-1 transition-all duration-500', s <= currentStep ? 'bg-orange-500' : 'bg-white/10']"></div>
          </div>

          <!-- STEP 1: Select Service -->
          <div v-if="currentStep === 1" class="space-y-6">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">Step 1 — Select Service(s)</p>
            <div class="space-y-3">
              <div v-for="svc in services" :key="svc.name"
                @click="toggleService(svc.name)"
                :class="[
                  'relative group flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all',
                  selectedServices.includes(svc.name)
                    ? 'bg-orange-500/10 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                ]">
                <div class="text-2xl">{{ svc.icon }}</div>
                <div class="flex-1">
                  <p class="font-black text-sm">{{ svc.name }}</p>
                  <p class="text-slate-500 text-xs font-medium">{{ svc.desc }}</p>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="font-black text-orange-400 text-sm">{{ svc.price }}</span>
                  <span v-if="svc.bundle" class="text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white px-2 py-0.5 rounded-full">Bundle & Save</span>
                </div>
                <div v-if="selectedServices.includes(svc.name)"
                  class="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>
            <button @click="currentStep = 2" :disabled="selectedServices.length === 0"
              :class="['w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all', selectedServices.length ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02]' : 'bg-white/5 text-slate-600 cursor-not-allowed']">
              Next: My Details →
            </button>
          </div>

          <!-- STEP 2: Details -->
          <div v-if="currentStep === 2" class="space-y-5">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-4">Step 2 — Your Details</p>
            <input v-model="form.name" type="text" placeholder="Full Name"
              class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"/>
            <input v-model="form.email" type="email" placeholder="Email Address"
              class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"/>
            <input v-model="form.phone" type="tel" placeholder="Phone Number"
              class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all"/>
            <div class="flex gap-3">
              <button @click="currentStep = 1"
                class="flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-sm bg-white/5 text-slate-400 hover:bg-white/10 transition-all">
                ← Back
              </button>
              <button @click="handleNextStep"
                class="flex-[2] py-4 rounded-xl font-black uppercase tracking-widest text-sm bg-orange-500 text-white hover:bg-orange-600 shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] transition-all">
                Get My Quote →
              </button>
            </div>
          </div>

          <!-- STEP 3: Confirmation -->
          <div v-if="currentStep === 3" class="text-center py-10">
            <div class="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-3xl font-black text-white mb-3">Quote Sent!</h3>
            <p class="text-slate-500 font-medium">We'll call {{ form.name }} within 30 minutes with your bundle pricing.</p>
            <div class="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
              <span class="text-xs font-black uppercase tracking-widest text-orange-400">TikTok Before/After Campaign Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SPECIALIST BENTO BOX -->
    <section class="py-32 px-6 bg-[#0e1219]">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black tracking-tight">The Specialist Bento Box</h2>
          <p class="text-slate-500 text-xl font-medium mt-4">Combine services to unlock exclusive bundle discounts.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="pkg in packages" :key="pkg.name"
            class="group relative rounded-3xl border border-white/8 bg-white/[0.02] p-8 hover:bg-white/[0.05] hover:border-orange-500/30 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div v-if="pkg.badge" class="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(249,115,22,0.4)]">
              {{ pkg.badge }}
            </div>
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style="background: radial-gradient(circle at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 60%);"></div>
            <div class="text-4xl mb-6">{{ pkg.icon }}</div>
            <h3 class="text-xl font-black mb-3">{{ pkg.name }}</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-8">{{ pkg.desc }}</p>
            <div class="flex items-end justify-between pt-6 border-t border-white/5">
              <div>
                <span v-if="pkg.oldPrice" class="text-sm text-slate-600 line-through mr-2">{{ pkg.oldPrice }}</span>
                <span class="text-2xl font-black text-orange-400">{{ pkg.price }}</span>
              </div>
              <button @click="scrollToQuote"
                class="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-400 transition-colors">
                Select →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BEFORE/AFTER PROOF STRIP -->
    <section class="py-20 bg-orange-500 overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 flex flex-wrap justify-around gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl font-black text-white mb-1">{{ stat.value }}</div>
          <div class="text-orange-200 text-[10px] font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- LEAD GENERATION FORM -->
    <section id="brighttouch-lead-form" class="py-24 px-6 bg-[#0c0f14]">
      <div class="max-w-4xl mx-auto">
        <div class="bg-[#111520] rounded-3xl border border-white/8 overflow-hidden">
          <div class="flex flex-col lg:flex-row">
            <!-- Left panel branding -->
            <div class="lg:w-2/5 bg-orange-500 p-10 flex flex-col justify-center">
              <p class="text-[10px] font-black uppercase tracking-[0.4em] text-orange-100/70 mb-4">Free Quote · No Obligation</p>
              <h2 class="text-3xl font-black text-white leading-tight mb-6">Get Your Specialist Quote in 60 Seconds</h2>
              <ul class="space-y-3">
                <li class="flex items-center gap-3 text-orange-100 text-sm font-bold">
                  <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  Same-day availability
                </li>
                <li class="flex items-center gap-3 text-orange-100 text-sm font-bold">
                  <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  100% Bond-Back Guarantee
                </li>
                <li class="flex items-center gap-3 text-orange-100 text-sm font-bold">
                  <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  4.9 ★ Google Rating
                </li>
              </ul>
            </div>

            <!-- Right panel form -->
            <div class="lg:w-3/5 p-10">
              <!-- Success state -->
              <div v-if="leadSubmitted" class="h-full flex flex-col items-center justify-center text-center py-8">
                <div class="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-5">
                  <svg class="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 class="text-2xl font-black text-white mb-2">Quote Request Sent!</h3>
                <p class="text-slate-500 font-medium">We'll call <strong class="text-orange-400">{{ leadForm.name }}</strong> within 30 minutes with your bundle pricing.</p>
              </div>

              <!-- Form state -->
              <form v-else @submit.prevent="handleLeadSubmit" class="space-y-5">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-5">Your Details</p>
                </div>

                <div class="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Full Name *</label>
                    <input v-model="leadForm.name" type="text" placeholder="e.g. Tom Wilson"
                      class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-all"/>
                    <p v-if="leadErrors.name" class="text-[10px] text-orange-400 font-bold mt-1">{{ leadErrors.name }}</p>
                  </div>
                  <div>
                    <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Phone Number *</label>
                    <input v-model="leadForm.phone" type="tel" placeholder="04XX XXX XXX"
                      class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-all"/>
                    <p v-if="leadErrors.phone" class="text-[10px] text-orange-400 font-bold mt-1">{{ leadErrors.phone }}</p>
                  </div>
                </div>

                <div>
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1.5">Email Address *</label>
                  <input v-model="leadForm.email" type="email" placeholder="you@email.com"
                    class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold placeholder:text-slate-600 outline-none focus:border-orange-500/50 transition-all"/>
                  <p v-if="leadErrors.email" class="text-[10px] text-orange-400 font-bold mt-1">{{ leadErrors.email }}</p>
                </div>

                <div>
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Service Needed</label>
                  <div class="flex flex-wrap gap-2">
                    <button v-for="svc in ['Carpet Clean', 'Oven Restore', 'End of Lease', 'Bundle Deal']" :key="svc" type="button"
                      @click="leadForm.service = svc"
                      :class="['px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border',
                               leadForm.service === svc
                                 ? 'bg-orange-500 text-white border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                                 : 'bg-white/[0.03] text-slate-400 border-white/10 hover:border-orange-500/40']">
                      {{ svc }}
                    </button>
                  </div>
                </div>

                <button type="submit"
                  class="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-2">
                  Get My Free Quote →
                </button>
                <p class="text-center text-[10px] text-slate-600 font-bold">Same-Day Response · Pooraka, Adelaide · No Spam</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-20 bg-[#0a0d12] border-t border-white/5">
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <p class="text-xl font-black"><span class="text-orange-500">Bright</span>Touch Cleaning</p>
        <p class="text-[10px] font-black uppercase tracking-[0.5em] text-orange-700">Pooraka · Adelaide · 2026</p>
        <p class="text-white/20 text-[10px] font-bold uppercase tracking-widest">© 2026 Bright Touch Cleaning · All Rights Reserved</p>
      </div>
    </footer>

    <!-- MOBILE STICKY BOTTOM BAR -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-[#0c0f14]/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.4)] md:hidden z-[150]">
      <button @click="scrollToQuote"
        class="w-full bg-orange-500 text-white font-black py-4 rounded-xl shadow-[0_10px_25px_rgba(249,115,22,0.35)] uppercase tracking-widest text-sm active:scale-95 transition-all">
        Get My Free Quote
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const sliderPosition = ref(50)
const currentStep = ref(1)
const selectedServices = ref([])
const form = ref({ name: '', email: '', phone: '' })

// Lead gen form
const leadForm = ref({ name: '', email: '', phone: '', service: '' })
const leadErrors = ref({})
const leadSubmitted = ref(false)

const services = [
  { icon: '🧹', name: 'Carpet Deep Clean', desc: 'Hot water extraction for all carpet types', price: 'From $119', bundle: false },
  { icon: '🔥', name: 'Oven Restoration', desc: 'Full chemical soak & professional scrub', price: 'From $89',  bundle: false },
  { icon: '🏠', name: 'End-of-Lease',      desc: 'Bond-back guaranteed full clean',          price: 'From $299', bundle: true  },
]

const packages = [
  { icon: '🧹', name: 'Carpet Specialist', desc: 'Industrial hot-water extraction leaving every fibre spotless and fresh.', price: '$119+', badge: null, oldPrice: null },
  { icon: '🔥', name: 'Oven Restore',      desc: 'Complete oven deconstruction, soak treatment, and interior restoration.', price: '$89+', badge: null, oldPrice: null },
  { icon: '🏆', name: 'Bond-Back Bundle',  desc: 'Carpet + Oven + Full End-of-Lease. Our most popular package — bond guaranteed.', price: '$449', badge: 'Bundle & Save', oldPrice: '$507' },
]

const stats = [
  { value: '4,800+', label: 'Specialist Jobs' },
  { value: '100%',   label: 'Bond-Back Rate' },
  { value: '4.9 ★',  label: 'Google Rating' },
  { value: 'Same Day', label: 'Availability' },
]

function toggleService(name) {
  const idx = selectedServices.value.indexOf(name)
  if (idx === -1) selectedServices.value.push(name)
  else selectedServices.value.splice(idx, 1)
}

function handleNextStep() {
  if (form.value.name.trim() && form.value.email.includes('@')) {
    currentStep.value = 3
  }
}

function scrollToQuote() {
  document.getElementById('brighttouch-lead-form')?.scrollIntoView({ behavior: 'smooth' })
}

function handleLeadSubmit() {
  leadErrors.value = {}
  if (!leadForm.value.name.trim()) leadErrors.value.name = 'Required'
  if (!leadForm.value.phone.trim()) leadErrors.value.phone = 'Required'
  if (!leadForm.value.email.trim() || !leadForm.value.email.includes('@')) leadErrors.value.email = 'Valid email required'
  if (Object.keys(leadErrors.value).length === 0) leadSubmitted.value = true
}

let observer = null
onMounted(() => { observer = initAnimations() })
onUnmounted(() => observer?.disconnect())
</script>
