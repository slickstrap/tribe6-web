<template>
  <div class="min-h-screen font-sans bg-[#0f0202] text-white overflow-x-hidden">
    <!-- HERO — Ultra Premium Noir -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <!-- Deep Cinematic Background -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2d0707_0%,_#0f0202_100%)]"></div>
      
      <!-- Liquid Gold & Crimson Orbs (Organic curves) -->
      <div class="absolute top-[-20%] left-[-10%] w-[900px] h-[900px] rounded-full opacity-30 blur-[150px]"
        style="background: #8a6d1d;"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style="background: #450a0a;"></div>
      
      <div class="relative max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-24">
        <div class="flex-1 text-center lg:text-left animate-in">
          <div class="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/5 border border-[#c9a84c]/30 backdrop-blur-2xl">
            <span class="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shadow-[0_0_10px_#c9a84c]"></span>
            <span class="text-[#c9a84c] text-[10px] tracking-[0.5em] uppercase font-black">
              Toronto · Signature Studio
            </span>
          </div>

          <h1 class="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.0] mb-10">
            Artistry in<br />
            <span
              class="italic font-normal"
              style="
                font-family: 'Dancing Script', cursive;
                background: linear-gradient(135deg, #f5d78e 0%, #c9a84c 50%, #8a6d1d 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                display: inline-block;
              "
            >Glamour</span>
          </h1>

          <p class="text-white/50 text-xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-light">
            Velour & Co. isn't just cosmetic; it's a sensory manifestation of Canadian luxury. Pigment-rich infusions for the bold, the beautiful, and the brave.
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <button
              @click="scrollToForm"
              class="px-12 py-5 bg-[#c9a84c] text-[#0f0202] font-black rounded-full transition-all duration-700 hover:scale-105 hover:bg-[#f5d78e] shadow-[0_20px_40px_rgba(201,168,76,0.2)] uppercase tracking-widest text-xs"
            >
              Secure My Glow
            </button>
            <button class="px-12 py-5 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 hover:border-white/30 transition-all text-xs uppercase tracking-widest">
              The Vault
            </button>
          </div>
        </div>

        <!-- Organic Lipstick Feature Visual -->
        <div class="flex-1 relative animate-in" style="animation-delay: 0.3s;">
          <div class="relative z-10 grid grid-cols-2 gap-8 lg:gap-12">
            <div v-for="(shade, idx) in showcaseShades" :key="shade.name" 
                 class="relative group aspect-[2/3] transition-all duration-700"
                 :style="{ transform: `translateY(${idx % 2 === 0 ? '0' : '60px'})` }">
              <!-- Fluid Bullet Shape -->
              <div class="absolute inset-0 rounded-[100px_100px_40px_40px] bg-[#1a0404] border border-white/5 overflow-hidden shadow-2xl">
                <div class="absolute inset-x-0 bottom-0 h-3/4 transition-all duration-700 group-hover:h-4/5"
                     :style="{ background: `linear-gradient(to top, ${shade.color} 0%, ${shade.color}aa 100%)` }">
                  <div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-tr from-transparent via-white to-transparent"></div>
                </div>
                <div class="absolute bottom-10 left-0 w-full text-center px-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <p class="text-[9px] font-black tracking-[0.4em] uppercase text-white">{{ shade.name }}</p>
                </div>
              </div>
              <!-- Premium Accent -->
              <div class="absolute top-[-10px] right-[-10px] w-20 h-20 border border-[#c9a84c]/20 rounded-full -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS (Luxury Glass Strip) -->
    <section class="relative z-20 -mt-16 px-6">
      <div class="max-w-6xl mx-auto bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[60px] p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-5xl font-serif font-bold text-white mb-2 leading-none tracking-tighter">{{ stat.value }}</div>
          <div class="text-[#c9a84c]/60 text-[9px] font-black uppercase tracking-[0.4em]">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- THE EXPERIENCE (Fluid Narrative) -->
    <section class="py-40 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32 animate-in">
          <div class="max-w-3xl">
            <h2 class="font-serif text-6xl md:text-7xl text-white font-bold leading-none mb-4">The Alchemy <br/>of <span class="text-[#c9a84c] italic font-normal" style="font-family: 'Dancing Script', cursive;">Prestige</span></h2>
          </div>
          <p class="text-white/30 text-xl max-w-md font-light">Beyond color. We engineer experiences that resonate with the frequency of luxury.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-20">
          <div v-for="(benefit, bIdx) in menuBenefits" :key="benefit.title" 
               class="group animate-in" :style="{ animationDelay: `${bIdx * 0.1}s` }">
            <div class="w-16 h-16 rounded-[25px_45px_15px_35%] bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-10 group-hover:bg-[#c9a84c]/20 group-hover:scale-110 transition-all duration-500">
              {{ benefit.icon }}
            </div>
            <h3 class="text-2xl font-serif text-white mb-6 group-hover:text-[#c9a84c] transition-colors leading-tight">{{ benefit.title }}</h3>
            <p class="text-white/40 leading-relaxed text-sm font-medium">
              {{ benefit.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS (Curvy Cards) -->
    <section class="py-32 px-6 bg-gradient-to-t from-black to-transparent">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div v-for="t in testimonials" :key="t.name" 
             class="p-12 rounded-[60px_40px_100px_40px] bg-white/[0.03] border border-white/5 hover:border-[#c9a84c]/40 transition-all duration-700 animate-in">
          <div class="flex gap-2 mb-10">
            <span v-for="i in 5" :key="i" class="text-[#c9a84c]/40 text-xs">✧</span>
          </div>
          <p class="text-white/70 text-2xl font-serif italic mb-10 leading-relaxed">"{{ t.quote }}"</p>
          <div class="flex items-center gap-6">
            <div class="w-12 h-[1px] bg-[#c9a84c]/30"></div>
            <span class="text-[#c9a84c] font-black text-[10px] uppercase tracking-[0.3em]">{{ t.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ACCESS FORM (Fluid Dark Panel) -->
    <section id="lead-form-3" class="py-40 px-6">
      <div class="max-w-7xl mx-auto bg-white/[0.02] border border-white/10 rounded-[100px_40px_100px_40px] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-24 shadow-2xl overflow-hidden relative">
        <!-- Floating light leak -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

        <div class="flex-1 animate-in">
          <h2 class="font-serif text-6xl md:text-7xl text-white font-bold mb-10 leading-none">The <br/><span class="text-[#c9a84c] italic font-normal" style="font-family: 'Dancing Script', cursive;">Inner Circle</span></h2>
          <p class="text-white/40 text-xl font-light leading-relaxed max-w-sm">
            Bespoke invitations to private Toronto masterclasses and early laboratory releases.
          </p>
        </div>

        <div class="flex-1 w-full max-w-md animate-in" style="animation-delay: 0.2s;">
          <div v-if="!submitted">
            <form @submit.prevent="handleSubmit" class="space-y-12">
              <div class="relative">
                <input v-model="form.name" type="text" placeholder="Full Name" 
                  class="w-full bg-transparent border-b-2 border-white/5 py-4 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-white/20 font-serif text-lg italic" />
                <p v-if="errors.name" class="absolute -bottom-6 left-0 text-[9px] font-black text-[#c9a84c] uppercase tracking-widest">{{ errors.name }}</p>
              </div>
              <div class="relative">
                <input v-model="form.email" type="email" placeholder="Private Email" 
                  class="w-full bg-transparent border-b-2 border-white/5 py-4 text-white focus:border-[#c9a84c] outline-none transition-all placeholder:text-white/20 font-serif text-lg italic" />
                <p v-if="errors.email" class="absolute -bottom-6 left-0 text-[9px] font-black text-[#c9a84c] uppercase tracking-widest">{{ errors.email }}</p>
              </div>
              
              <div class="pt-6">
                <p class="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 text-center">Your Atelier</p>
                <div class="flex flex-wrap justify-center gap-3">
                  <button v-for="c in categories" :key="c" type="button"
                    @click="form.concern = c"
                    :class="['px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border', 
                             form.concern === c ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'text-white/30 border-white/5 hover:border-white/20']">
                    {{ c }}
                  </button>
                </div>
              </div>

              <button type="submit" class="w-full py-6 bg-[#c9a84c] text-black font-black rounded-full uppercase tracking-[0.3em] text-[10px] hover:bg-[#f5d78e] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-2xl shadow-gold/20">
                Request Credential
              </button>
            </form>
          </div>
          <div v-else class="text-center p-12 bg-white/5 rounded-[60px] border border-white/10">
            <div class="text-6xl mb-8 animate-pulse text-[#c9a84c]">✧</div>
            <h3 class="text-3xl font-serif text-white mb-6">Credential Received</h3>
            <p class="text-white/40 text-sm font-light">Verification for {{ form.name }} is in progress. Check your private server.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-24 px-6 bg-black">
      <div class="max-w-7xl mx-auto flex flex-col items-center gap-16">
        <div class="text-center">
          <p class="text-5xl font-serif font-black tracking-tighter text-white">Velour & Co.</p>
          <p class="text-[10px] font-black uppercase tracking-[0.8em] text-[#c9a84c] mt-4 opacity-100">Toronto · NYC · Paris</p>
        </div>
        
        <div class="flex gap-16">
          <a v-for="social in socials" :key="social.name" :href="social.url" class="text-white/20 hover:text-[#c9a84c] transition-all duration-300 hover:scale-125">
            <span v-html="social.icon"></span>
          </a>
        </div>

        <div class="w-full pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p class="text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">© 2026 Velour & Co.</p>
          <p class="text-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-center">Crafted for the Discerning</p>
          <p class="text-white/10 text-[9px] font-black uppercase tracking-[0.3em]">Canadian Haute Beauty</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const showcaseShades = [
  { name: 'Merlot', color: '#7f1d1d' },
  { name: 'Gold', color: '#c9a84c' },
  { name: 'Noir', color: '#1a0404' },
  { name: 'Royal', color: '#2d0707' },
]

const stats = [
  { value: '75k', label: 'Artisans' },
  { value: '4.9', label: 'Gold Tier' },
  { value: 'Luxe', label: 'Standard' },
  { value: '24k', label: 'Infused' },
]

const menuBenefits = [
  { icon: '✧', title: 'Eternal Suspension', desc: 'Pigments are held in a weightless emulsion of flower oils and micro-gold particles.' },
  { icon: '✧', title: 'Molecular Bond', desc: 'Engineered to link with your lip architecture for a second-skin finish that lasts 16 hours.' },
  { icon: '✧', title: 'Teardrop Cut', desc: 'Asymmetrical bullet design allows for ergonomic, tool-free application with surgical precision.' },
]

const categories = ['Lips', 'Eyes', 'Noir', 'Limited']

const testimonials = [
  { quote: "The Merlot bullet is a confidence multiplier. Simply divine.", name: "Vera D." },
  { quote: "It feels like holding a piece of heavy jewelry. The weight of luxury.", name: "Sloane R." },
  { quote: "Finally, a brand that understands pigment depth for dark skin.", name: "Elena Q." },
]

const socials = [
  { name: 'Instagram', url: '#', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  { name: 'TikTok', url: '#', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
]

const form = ref({ name: '', email: '', concern: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('lead-form-3')?.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Name Required'
  if (!form.value.email.trim() || !form.value.email.includes('@')) {
    errors.value.email = 'Valid Email Required'
  }
  if (Object.keys(errors.value).length === 0) submitted.value = true
}

let observer = null
onMounted(() => { observer = initAnimations() })
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
/* High contrast and premium focus */
</style>
