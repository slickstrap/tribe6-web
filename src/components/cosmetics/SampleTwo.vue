<template>
  <div class="min-h-screen font-sans bg-[#f4f9f7] text-gray-900 overflow-x-hidden">
    <!-- HERO -->
    <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <!-- Boreal Gradient Layers -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#ecfdf5_0%,_#f4f9f7_100%)]"></div>
      
      <!-- Leaf-like Organic Shapes (Curvy replacement) -->
      <div class="absolute top-[-5%] right-[-10%] w-[700px] h-[700px] rounded-[60%_40%_70%_30%] opacity-20 blur-[100px]"
        style="background: #10b981;"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
        style="background: #064e3b;"></div>
      
      <div class="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-20">
        <div class="flex-1 text-center lg:text-left animate-in">
          <div class="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full bg-emerald-100/50 border border-emerald-200 backdrop-blur-md">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-emerald-800 text-[10px] tracking-[0.3em] uppercase font-bold">
              Wild Harvested · Canada
            </span>
          </div>

          <h1 class="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
            Pure.<br />
            Natural.<br />
            <span class="text-emerald-600 italic font-medium" style="font-family: 'Dancing Script', cursive;">Effortlessly</span> You.
          </h1>

          <p class="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            Rooted in the wisdom of Canada's boreal forests. Sustainable skincare crafted from wild-harvested botanicals and zero-waste ethics.
          </p>

          <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start font-bold">
            <button
              @click="scrollToForm"
              class="px-10 py-5 bg-emerald-800 text-white rounded-[20px_50px_20px_50px] transition-all duration-500 hover:rounded-[50px_20px_50px_20px] hover:bg-emerald-900 shadow-xl"
            >
              Get My Trial Kit
            </button>
            <button class="px-10 py-5 border-2 border-emerald-100 text-emerald-800 rounded-full hover:bg-white transition-all duration-300">
              Our Boreal Story
            </button>
          </div>

          <!-- Organic Trust badges -->
          <div class="flex flex-wrap gap-4 mt-12 justify-center lg:justify-start">
            <div v-for="badge in badges" :key="badge" class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-800/60 bg-white/40 px-4 py-2 rounded-full border border-emerald-50">
              <span class="text-emerald-500">✦</span> {{ badge }}
            </div>
          </div>
        </div>

        <!-- Curvy Product Interaction Card -->
        <div class="flex-1 relative animate-in" style="animation-delay: 0.3s;">
          <div class="relative z-10 bg-white/80 backdrop-blur-2xl rounded-[60px_40px_100px_40px] p-10 shadow-[0_40px_80px_rgba(6,78,59,0.1)] border border-white/50">
            <div class="h-64 bg-emerald-50/50 rounded-[40px_40px_100px_40px] mb-10 flex items-center justify-center relative overflow-hidden group">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#d1fae5_0%,_transparent_70%)] group-hover:scale-110 transition-transform duration-700"></div>
              <div class="relative text-center">
                <div class="text-[120px] drop-shadow-2xl">🌲</div>
                <p class="text-emerald-900 font-black tracking-[0.4em] text-[10px] uppercase mt-4">Pure North Beauty</p>
              </div>
            </div>
            
            <div class="space-y-6">
              <div v-for="product in products" :key="product.name" class="flex items-center gap-6 group cursor-pointer p-2 rounded-3xl hover:bg-emerald-50 transition-colors">
                <div class="w-14 h-14 rounded-[15px_25px_10px_20%] bg-white flex items-center justify-center text-2xl shadow-sm text-emerald-700 transition-transform group-hover:scale-110 group-hover:rotate-3">{{ product.icon }}</div>
                <div>
                  <p class="text-gray-900 font-bold text-sm">{{ product.name }}</p>
                  <p class="text-gray-400 text-[10px] font-medium uppercase tracking-widest">{{ product.desc }}</p>
                </div>
                <span class="ml-auto text-emerald-800 font-black text-sm">{{ product.price }}</span>
              </div>
            </div>
          </div>
          <!-- Decorative leaf shapes -->
          <div class="absolute -top-10 -left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>

    <!-- STATS (Floating Pavement) -->
    <section class="py-12 px-6">
      <div class="max-w-6xl mx-auto flex flex-wrap justify-center gap-8 lg:gap-16">
        <div v-for="stat in stats" :key="stat.label" class="text-center w-36 animate-in">
          <div class="text-4xl font-black text-emerald-900 leading-none">{{ stat.value }}</div>
          <div class="text-emerald-500/60 text-[10px] font-bold uppercase tracking-widest mt-2">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- THE BOREAL STANDARD (Replacements for blocks) -->
    <section class="py-32 px-6 bg-white relative overflow-hidden">
      <!-- Decorative background wave -->
      <div class="absolute bottom-0 left-0 w-full h-[30%] bg-[#f4f9f7] rounded-[100%_100%_0_0]"></div>

      <div class="relative max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-20 animate-in">
          <h2 class="text-5xl font-black text-gray-900 mb-6 tracking-tight">Forest to Face</h2>
          <p class="text-gray-400 text-lg leading-relaxed">Our process is cyclical, organic, and entirely respectful of the land we harvest from.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div v-for="(benefit, bIdx) in menuBenefits" :key="benefit.title" 
               class="group relative animate-in" :style="{ animationDelay: `${bIdx * 0.1}s` }">
            <div class="relative z-10 p-10 rounded-[30px_60px_20px_40px] border border-gray-100 bg-white hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div class="w-16 h-16 rounded-[20px] bg-emerald-50 flex items-center justify-center text-2xl mb-8 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                {{ benefit.icon }}
              </div>
              <h3 class="text-lg font-black text-gray-900 mb-4">{{ benefit.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                {{ benefit.desc }}
              </p>
            </div>
            <!-- Organic shadow element -->
            <div class="absolute inset-4 rounded-[30px_60px_20px_40px] bg-emerald-900/5 blur-2xl group-hover:blur-3xl transition-all"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ACTION AREA (Curvy Form Panel) -->
    <section id="lead-form-2" class="py-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="bg-emerald-900 rounded-[80px_10px_80px_10px] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
          <!-- Background flora -->
          <div class="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div class="absolute top-10 right-10 w-64 h-64 border-[40px] border-emerald-500 rounded-full blur-[80px]"></div>
          </div>

          <div class="flex-1 text-center lg:text-left relative z-10 animate-in">
            <h2 class="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Experience <br/>True Purity.</h2>
            <p class="text-emerald-200/60 text-xl leading-relaxed max-w-md">
              Apply for a customized boreal sample kit based on your skin's unique connection to the elements.
            </p>
          </div>

          <div class="flex-1 w-full max-w-md relative z-10 animate-in" style="animation-delay: 0.2s;">
            <div v-if="!submitted" class="bg-white rounded-[40px_100px_40px_100px] p-10 md:p-14 shadow-2xl">
              <form @submit.prevent="handleSubmit" class="space-y-8">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-800/40 ml-1">Full Name</label>
                  <input v-model="form.name" type="text" placeholder="Your Name" 
                    :class="['w-full bg-emerald-50/50 rounded-2xl px-6 py-4 outline-none border transition-all', errors.name ? 'border-red-400' : 'border-transparent focus:border-emerald-200 focus:bg-white']" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-800/40 ml-1">Email Address</label>
                  <input v-model="form.email" type="email" placeholder="you@email.com" 
                    :class="['w-full bg-emerald-50/50 rounded-2xl px-6 py-4 outline-none border transition-all', errors.email ? 'border-red-400' : 'border-transparent focus:border-emerald-200 focus:bg-white']" />
                </div>
                <div class="pt-4">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Your Skin Element</p>
                  <div class="grid grid-cols-2 gap-2">
                    <button type="button" v-for="c in categories" :key="c" 
                      @click="form.concern = c"
                      :class="['px-4 py-3 rounded-2xl text-[10px] font-bold uppercase transition-all', 
                               form.concern === c ? 'bg-emerald-800 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100']">
                      {{ c }}
                    </button>
                  </div>
                </div>
                <button type="submit" class="w-full py-5 bg-emerald-800 text-white font-black rounded-full uppercase tracking-[0.2em] text-xs hover:bg-emerald-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl">
                  Send My Kit
                </button>
              </form>
            </div>
            <div v-else class="bg-white rounded-[40px] p-16 text-center shadow-2xl">
              <div class="text-7xl mb-8">🌿</div>
              <h3 class="text-3xl font-black text-emerald-900 mb-4">Confirmed.</h3>
              <p class="text-gray-400 leading-relaxed font-medium">The boreal elements are being prepared for you, {{ form.name }}.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER (Simplified & Clean) -->
    <footer class="py-20 px-6">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        <div class="text-center mb-12">
          <p class="text-2xl font-black text-emerald-900 tracking-tighter">Pure North Beauty</p>
          <p class="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500 mt-3 opacity-60">Sustainably Crafted · Est 2020</p>
        </div>
        
        <div class="flex gap-12 mb-16">
          <a v-for="social in socials" :key="social.name" :href="social.url" class="text-emerald-100 hover:text-emerald-800 transition-colors">
            <span v-html="social.icon"></span>
          </a>
        </div>

        <p class="text-gray-300 text-[10px] font-bold uppercase tracking-[0.3em] text-center">
          © 2026 Pure North Beauty<br/>
          From Canada With Care
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnimateIn } from '../../composables/useAnimateIn'

const { initAnimations } = useAnimateIn()

const badges = ['Vegan', 'Nontoxic', 'Sustainable']

const products = [
  { icon: '🫧', name: 'Arctic Glow', desc: 'Serum Base', price: '$68' },
  { icon: '🌲', name: 'Boreal Balm', desc: 'Deep Hydration', price: '$52' },
  { icon: '🌪️', name: 'Peat Peel', desc: 'Exfoliation', price: '$44' },
]

const stats = [
  { value: '35k', label: 'Members' },
  { value: '4.8', label: 'Rating' },
  { value: '100%', label: 'Vegan' },
  { value: 'Boreal', label: 'Origin' },
]

const menuBenefits = [
  { icon: '🌾', title: 'Ethical Harvest', desc: 'Our botanicals are picked at peak potency by hand, ensuring the boreal ecosystem remains undisturbed.' },
  { icon: '♻', title: 'Glass Only', desc: 'We never use plastic. Every vessel is heavy-gauge violet glass designed for reuse or infinite recycling.' },
  { icon: '🔬', title: 'Clean Tech', desc: 'Cold-press extraction preserves the molecular integrity of every wildflower and needle extract we use.' },
  { icon: '💚', title: 'Climate First', desc: 'Carbon-negative shipping and reforestation initiatives in every Canadian province we operate in.' },
]

const categories = ['Dry', 'Oily', 'Sensitive', 'Global']

const socials = [
  { name: 'Instagram', url: '#', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>` },
  { name: 'TikTok', url: '#', icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>` },
]

const form = ref({ name: '', email: '', concern: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('lead-form-2')?.scrollIntoView({ behavior: 'smooth' })
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
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');
</style>
