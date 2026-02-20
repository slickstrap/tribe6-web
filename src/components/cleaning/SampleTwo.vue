<template>
  <div class="relative min-h-screen bg-[#faf8f5] font-sans text-stone-900 pb-20 md:pb-0 selection:bg-amber-200">
    <!-- PLACEHOLDER FOR FACEBOOK/TIKTOK PIXEL SCRIPTS (in <head>) -->

    <!-- Internal brand header removed — global Tribe6 Navbar handles navigation -->
    <!-- Brand is shown in the hero section instead -->
    <div style="display:none">
    </div>

    <!-- HERO — Full-Width with Centred Glassmorphism Box -->
    <section class="relative min-h-screen flex items-center justify-center pt-[104px] pb-16 px-6 overflow-hidden">
      <!-- Warm ambient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#fff9ef] via-[#fdf5e8] to-[#faecd8]"></div>
      <div class="absolute top-[15%] left-[5%]  w-[480px] h-[480px] bg-amber-200/50  rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-[5%]  right-[5%] w-[600px] h-[600px] bg-orange-100/60 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl w-full flex flex-col items-center">
        <!-- Brand name in hero (replaces removed header) -->
        <p class="font-black text-3xl tracking-tighter text-amber-900 mb-4">MY HOME<span class="text-amber-500">.</span></p>
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-white/70 border border-amber-200/60 rounded-full shadow-sm backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span class="text-[10px] font-black uppercase tracking-widest text-amber-800">Ottoway, Adelaide · NDIS Friendly</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-black text-amber-950 leading-[1.1] tracking-tight mb-6 text-center">
          Your Home, Spotless.<br />
          <span class="italic font-serif text-amber-600">Your Weekend, Reclaimed.</span>
        </h1>
        <p class="text-stone-500 text-lg md:text-xl font-medium mb-12 text-center max-w-2xl">
          Ottoway's most trusted home cleaning service — warm, professional, and on your schedule.
        </p>

        <!-- Glassmorphism Lead-Capture Box -->
        <div id="myhome-form" class="w-full max-w-xl relative">
          <div class="absolute -inset-px rounded-[44px] bg-gradient-to-br from-white/80 to-amber-100/40 pointer-events-none"></div>
          <div class="relative bg-white/40 backdrop-blur-3xl border border-white/70 rounded-[40px] p-8 md:p-12 shadow-[0_40px_80px_rgba(217,150,60,0.15)]">
            <!-- Frequency Toggle -->
            <p class="text-[9px] font-black uppercase tracking-[0.4em] text-amber-700/60 text-center mb-4">Choose Frequency</p>
            <div class="flex bg-white/60 rounded-2xl p-1.5 border border-white shadow-inner mb-8 gap-1">
              <button
                v-for="freq in frequencies" :key="freq"
                @click="selectedFreq = freq"
                :class="[
                  'flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300',
                  selectedFreq === freq
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-300/40 scale-[1.02]'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-white/50'
                ]">
                {{ freq }}
              </button>
            </div>

            <!-- GHL Iframe Placeholder -->
            <div class="w-full min-h-[180px] bg-amber-50/60 border-2 border-dashed border-amber-200/60 rounded-2xl flex flex-col items-center justify-center mb-6 px-4">
              <div class="text-3xl mb-3 opacity-40">📋</div>
              <p class="text-amber-700/40 font-bold uppercase tracking-widest text-[10px] text-center">GHL Custom Form<br/>
                <span class="font-medium normal-case block mt-1.5 opacity-80">Iframe embed placeholder</span>
              </p>
            </div>

            <button @click="scrollToForm"
              class="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-4 rounded-xl shadow-[0_15px_30px_rgba(217,119,6,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-sm">
              Check My Date →
            </button>

            <p class="text-center text-[10px] text-stone-400 font-bold mt-4">"Same Cleaner" Guarantee · NDIS Accepted · Fully Insured</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3-STEP SUCCESS MAP -->
    <section class="py-32 bg-white relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-amber-950 tracking-tight mb-4">The 3-Step Success Map</h2>
        <p class="text-stone-400 font-medium text-lg mb-20">Getting your time back has never been simpler.</p>

        <div class="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
          <!-- Connector line (desktop) -->
          <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 pointer-events-none"></div>

          <div v-for="(step, i) in steps" :key="step.title" class="relative z-10 flex flex-col items-center group">
            <div class="w-24 h-24 mx-auto rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center text-4xl mb-6 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_10px_20px_rgba(217,119,6,0.06)]">
              {{ step.icon }}
            </div>
            <h3 class="text-xl font-black text-amber-950 mb-3">{{ step.label }}</h3>
            <p class="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF STRIP -->
    <section class="py-16 bg-amber-600">
      <div class="max-w-6xl mx-auto px-6 flex flex-wrap justify-around gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl font-black text-white mb-1">{{ stat.value }}</div>
          <div class="text-amber-100 text-[10px] font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- TRUST SECTION -->
    <section class="py-24 bg-[#faf8f5]">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div v-for="trust in trustPoints" :key="trust.title" class="bg-white rounded-3xl p-8 border border-amber-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
          <div class="text-3xl mb-5">{{ trust.icon }}</div>
          <h4 class="font-black text-lg text-amber-950 mb-2">{{ trust.title }}</h4>
          <p class="text-stone-500 text-sm leading-relaxed">{{ trust.desc }}</p>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-16 bg-white border-t border-amber-50">
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <p class="text-2xl font-black text-amber-900">MY HOME Cleaning Services</p>
        <p class="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400">Ottoway · Adelaide · 2026</p>
        <p class="text-stone-300 text-[10px] font-bold uppercase tracking-widest">© 2026 MY HOME Cleaning Services · All Rights Reserved</p>
      </div>
    </footer>

    <!-- MOBILE STICKY BOTTOM BAR -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-stone-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] md:hidden z-[150]">
      <button @click="scrollToForm"
        class="w-full bg-amber-600 text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(217,119,6,0.2)] uppercase tracking-widest text-sm active:scale-95 transition-all">
        Get My Free Quote
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const frequencies = ['Weekly', 'Bi-Weekly', 'One-Off']
const selectedFreq = ref('Weekly')

const steps = [
  { icon: '📱', label: '1. Book It', desc: 'Pick a date and frequency in under 60 seconds through our instant booking portal.' },
  { icon: '✨', label: '2. We Clean', desc: 'Your dedicated, background-checked cleaner arrives and transforms your home.' },
  { icon: '🍷', label: '3. Enjoy', desc: 'Relax and enjoy your spotless space — your weekend is officially yours again.' },
]

const stats = [
  { value: '6,200+', label: 'Happy Homes' },
  { value: '4.9 ★', label: 'Google Rating' },
  { value: 'NDIS', label: 'Registered' },
  { value: '100%', label: 'Same-Cleaner Guarantee' },
]

const trustPoints = [
  { icon: '🛡️', title: 'Fully Insured', desc: '$20M public liability insurance. You are completely protected on every clean.' },
  { icon: '👤', title: 'Same Cleaner Every Time', desc: 'We match you to one dedicated professional who learns exactly how you like things done.' },
  { icon: '✅', title: 'NDIS Accepted', desc: 'Registered NDIS provider. We work seamlessly with NDIS participants and care coordinators.' },
]

function scrollToForm() {
  document.getElementById('myhome-form')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
