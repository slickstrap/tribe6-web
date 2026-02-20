<template>
  <div class="min-h-screen font-sans bg-[#fff1f2] text-[#450a0a] overflow-x-hidden">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <!-- Premium Background Architecture -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#ffe4e6_0%,_#fff1f2_100%)]"></div>
      
      <!-- Organic Flowing Shapes (Curvy replacement for blocks) -->
      <div class="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style="background: #fda4af;"></div>
      <div class="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-40 blur-[120px]"
        style="background: #fecdd3;"></div>
      
      <div class="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        <div class="flex-1 text-center lg:text-left animate-in">
          <div class="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-white/40 border border-[#fda4af]/30 backdrop-blur-xl">
            <span class="text-[#fda4af] text-[10px] tracking-[0.4em] uppercase font-bold">
              Est. Montréal 2018
            </span>
          </div>

          <h1 class="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 text-[#450a0a]">
            Reveal Your<br />
            <span class="italic font-normal text-rose-500" style="font-family: 'Dancing Script', cursive;">Radiant</span> Glow
          </h1>

          <p class="text-[#450a0a]/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            Maison Éclat blends pristine Canadian botanicals with advanced molecular science. Experience 14-day transformations that feel as good as they look.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button
              @click="scrollToForm"
              class="px-10 py-4 bg-[#450a0a] text-white font-bold rounded-full transition-all duration-500 hover:scale-105 hover:bg-[#7f1d1d] shadow-2xl shadow-rose-900/10"
            >
              Start My Transformation
            </button>
            <button class="px-10 py-4 border border-[#450a0a]/20 text-[#450a0a] font-semibold rounded-full hover:bg-white/50 transition-all duration-300 backdrop-blur-md">
              The Collection
            </button>
          </div>
        </div>

        <!-- Curvy Visual Feature Object -->
        <div class="flex-1 relative animate-in" style="animation-delay: 0.3s;">
          <div class="relative z-10 w-full max-w-sm mx-auto">
            <!-- Organic shaped card -->
            <div class="relative rounded-[40%_60%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br from-rose-100 to-rose-200/60 p-2 shadow-2xl shadow-rose-200/50">
              <div class="rounded-[38%_62%_48%_52%/38%_38%_62%_62%] bg-white/70 backdrop-blur-3xl flex items-center justify-center border border-white/40 py-16 px-8">
                <div class="text-center">
                  <div class="text-8xl mb-4 drop-shadow-2xl">🌹</div>
                  <p class="font-serif text-2xl font-bold tracking-tight text-[#450a0a] mb-1">Maison Éclat</p>
                  <div class="w-12 h-[2px] bg-rose-400 mx-auto mb-2"></div>
                  <p class="text-rose-400 text-[10px] uppercase tracking-widest font-bold">Montréal · Est. 2018</p>
                </div>
              </div>
            </div>
            <!-- Floating badges — pinned to safe corners, never overlap -->
            <div class="absolute -top-4 right-4 bg-white rounded-2xl shadow-xl px-4 py-2.5 text-sm font-bold text-[#450a0a] flex items-center gap-2 whitespace-nowrap">
              ✨ 100% Clean
            </div>
            <div class="absolute -bottom-4 left-4 bg-[#450a0a] text-white rounded-2xl shadow-xl px-4 py-2.5 text-sm font-bold flex items-center gap-2 whitespace-nowrap">
              ⭐ 4.9 / 5 Rating
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS (Soft curved bar) -->
    <section class="relative z-20 -mt-12 px-6">
      <div class="max-w-6xl mx-auto bg-white/60 backdrop-blur-2xl border border-white rounded-[40px] p-10 grid grid-cols-2 lg:grid-cols-4 gap-10 shadow-xl animate-in">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-4xl font-serif font-bold text-[#450a0a]">{{ stat.value }}</div>
          <div class="text-rose-400 text-[10px] font-bold uppercase tracking-widest mt-3">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- BENEFITS (Curved approach) -->
    <section class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20 animate-in">
          <h2 class="font-serif text-5xl font-bold text-[#450a0a] mb-6">The Éclat Difference</h2>
          <div class="w-20 h-1 bg-rose-200 mx-auto rounded-full mb-6"></div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" 
               class="group p-10 rounded-[50px] bg-white/40 border border-white/60 hover:bg-white/80 transition-all duration-500 animate-in">
            <div class="w-16 h-16 rounded-[20px_40px_10px_30%] bg-rose-100 flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform">
              {{ benefit.icon }}
            </div>
            <h3 class="text-xl font-bold text-[#450a0a] mb-4">{{ benefit.title }}</h3>
            <p class="text-[#450a0a]/60 leading-relaxed text-sm">
              {{ benefit.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FORM SECTION (Organic layout) -->
    <section id="lead-form-1" class="py-32 px-6 bg-white/40">
      <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div class="flex-1 animate-in">
          <h2 class="font-serif text-5xl md:text-6xl text-[#450a0a] font-bold mb-8 leading-tight">
            The Journey to <br/>
            <span class="italic text-rose-400" style="font-family: 'Dancing Script', cursive;">Perfection</span>
          </h2>
          <p class="text-lg text-[#450a0a]/60 leading-relaxed max-w-md">
            Join our exclusive list for complimentary skincare consultations and first-look access to our Montréal laboratory releases.
          </p>
        </div>

        <div class="flex-1 w-full max-w-md animate-in" style="animation-delay: 0.2s;">
          <div v-if="!submitted" class="bg-white rounded-[60px_20px_60px_20px] shadow-2xl p-10 md:p-14 border border-rose-100">
            <form @submit.prevent="handleSubmit" class="space-y-8">
              <div class="relative">
                <input v-model="form.name" type="text" placeholder="Full Name" 
                       class="w-full bg-transparent border-b-2 border-rose-50 py-4 outline-none focus:border-rose-300 transition-all placeholder:text-gray-300" />
                <p v-if="errors.name" class="absolute -bottom-6 left-0 text-[10px] text-rose-500 font-bold uppercase tracking-widest">{{ errors.name }}</p>
              </div>
              <div class="relative">
                <input v-model="form.email" type="email" placeholder="Email Address" 
                       class="w-full bg-transparent border-b-2 border-rose-50 py-4 outline-none focus:border-rose-300 transition-all placeholder:text-gray-300" />
                <p v-if="errors.email" class="absolute -bottom-6 left-0 text-[10px] text-rose-500 font-bold uppercase tracking-widest">{{ errors.email }}</p>
              </div>
              
              <div class="pt-4">
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-4">Focus Area</label>
                <div class="flex flex-wrap gap-2">
                  <button v-for="c in concerns" :key="c" type="button"
                    @click="form.concern = c"
                    :class="['px-4 py-2 rounded-full text-xs font-bold transition-all border', 
                             form.concern === c ? 'bg-[#450a0a] text-white border-[#450a0a]' : 'text-gray-400 border-gray-100 hover:border-gray-200']">
                    {{ c }}
                  </button>
                </div>
              </div>

              <button type="submit" class="w-full py-5 bg-[#450a0a] text-white font-bold rounded-full shadow-xl hover:bg-[#7f1d1d] hover:scale-[1.02] active:scale-[0.98] transition-all">
                Claim My Consultation
              </button>
            </form>
          </div>
          <div v-else class="bg-white rounded-[60px] p-16 text-center shadow-xl">
            <p class="text-rose-400 text-6xl mb-6">✿</p>
            <h3 class="text-3xl font-serif font-bold text-[#450a0a] mb-4">You're Registered</h3>
            <p class="text-gray-400 text-sm leading-relaxed">Check your inbox, {{ form.name }}. A specialist will be in touch within 24 hours.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-20 px-6 border-t border-rose-100 bg-white/20">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div class="text-center md:text-left">
          <p class="font-serif text-3xl font-bold text-[#450a0a]">Maison Éclat</p>
          <p class="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-300 mt-2">Montréal · Paris · Quebec</p>
        </div>

        <div class="flex gap-10">
          <a v-for="social in socials" :key="social.name" :href="social.url" class="text-rose-200 hover:text-rose-500 transition-colors">
            <span v-html="social.icon"></span>
          </a>
        </div>

        <p class="text-gray-300 text-[10px] text-center md:text-right uppercase tracking-[0.2em] leading-relaxed">
          © 2026 Maison Éclat<br/>
          Canadian Botanical Luxury
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
  { value: '50k+', label: 'Glow Seekers' },
  { value: '4.9/5', label: 'Customer Love' },
  { value: 'Clean', label: 'Toxic Free' },
  { value: '14 Days', label: 'Efficacy Focus' },
]

const benefits = [
  { icon: '✿', title: 'Clean Formula', desc: 'Sustainably sourced botanical concentrates. No synthetic fillers or parabens.' },
  { icon: '✧', title: 'Real Results', desc: 'Clinically benchmarked efficacy that builds healthier skin structure.' },
  { icon: '◎', title: 'Derm-Tested', desc: 'Rigorous dermatological validation for sensitive and reactive skin types.' },
  { icon: '♻', title: 'Zero Waste', desc: 'Every component of our glass packaging is endlessly recyclable.' },
]

const concerns = ['Anti-Ageing', 'Hydration', 'Acne', 'Sensitive']

const socials = [
  { name: 'Instagram', url: '#', icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  { name: 'TikTok', url: '#', icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
]

const form = ref({ name: '', email: '', concern: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('lead-form-1')?.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Full name is required'
  if (!form.value.email.trim() || !form.value.email.includes('@')) {
    errors.value.email = 'Valid email is required'
  }
  if (Object.keys(errors.value).length === 0) submitted.value = true
}

let observer = null
onMounted(() => { observer = initAnimations() })
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
/* No extra overrides needed - relying on utility classes and inline styles */
</style>
