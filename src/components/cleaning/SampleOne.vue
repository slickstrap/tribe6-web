<template>
  <div class="relative min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0 selection:bg-blue-200">

    <!-- HERO SECTION (60/40 Split) -->
    <section class="pt-[104px] pb-20 px-6 lg:min-h-[90vh] flex items-center relative overflow-hidden">
      <!-- Background Graphic -->
      <div class="absolute right-0 top-0 w-1/2 h-full bg-blue-50 transform skew-x-12 translate-x-32 hidden lg:block opacity-50"></div>

      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center w-full relative z-10">
        <!-- Left: Copy & Trust (60%) -->
        <div class="w-full lg:w-3/5 text-center lg:text-left">
          <!-- Brand name -->
          <div class="font-black text-3xl tracking-tighter text-blue-950 mb-6">
            Cleanworks<span class="text-blue-600">.</span>
          </div>
          <div class="inline-block bg-white text-blue-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
            Commercial & B2B Focus
          </div>
          <h1 class="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
            Adelaide's Standard in Professional <br class="hidden lg:block"/>
            <span class="text-blue-600">Facility & Education</span> Cleaning.
          </h1>
          <ul class="space-y-4 text-slate-600 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto lg:mx-0">
            <li class="flex items-center justify-center lg:justify-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </span>
              Fully Insured & Vetted
            </li>
            <li class="flex items-center justify-center lg:justify-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </span>
              NDIS & School Compliant
            </li>
            <li class="flex items-center justify-center lg:justify-start gap-4">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              </span>
              24/7 Priority Support
            </li>
          </ul>
          <!-- CTA for desktop -->
          <button @click="scrollToForm"
            class="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.25)] transition-all hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-sm">
            Get a Free Facility Audit
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>

        <!-- Right: Lead Gen Form (40%) -->
        <div class="w-full lg:w-2/5">
          <div id="ghl-form-wrapper" class="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 border border-slate-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

            <!-- Success state -->
            <div v-if="submitted" class="py-10 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5 text-blue-600">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 class="text-2xl font-black text-slate-800 mb-2">Request Received!</h3>
              <p class="text-slate-500 text-sm font-medium">
                Thanks <strong>{{ form.name }}</strong>. Our team will contact you within 2 business hours.
              </p>
            </div>

            <!-- Form state -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-5 mt-2">
              <div>
                <h3 class="text-2xl font-black text-slate-800 mb-1">Get a Commercial Audit</h3>
                <p class="text-sm text-slate-500 mb-6 font-medium">No-obligation quote for Adelaide facilities.</p>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Full Name *</label>
                <input v-model="form.name" type="text" placeholder="e.g. Sarah Johnson"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"/>
                <p v-if="errors.name" class="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wide">{{ errors.name }}</p>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Company / Facility *</label>
                <input v-model="form.company" type="text" placeholder="e.g. Northside Primary School"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"/>
                <p v-if="errors.company" class="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wide">{{ errors.company }}</p>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Email Address *</label>
                <input v-model="form.email" type="email" placeholder="you@company.com.au"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"/>
                <p v-if="errors.email" class="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wide">{{ errors.email }}</p>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="04XX XXX XXX"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all placeholder:text-slate-300"/>
              </div>

              <div>
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Service Required</label>
                <div class="flex flex-wrap gap-2">
                  <button v-for="svc in services" :key="svc" type="button"
                    @click="form.service = svc"
                    :class="['px-3 py-2 rounded-lg text-xs font-bold transition-all border',
                             form.service === svc
                               ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                               : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-300']">
                    {{ svc }}
                  </button>
                </div>
              </div>

              <button type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all hover:-translate-y-1 active:translate-y-0 uppercase tracking-widest text-sm">
                Request Facility Audit →
              </button>
              <p class="text-center text-[10px] text-slate-400 font-bold">ISO 9001 Certified · $20M Insured · Police Checked Team</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- KEY SECTION: COMPLIANCE & CERTIFICATION -->
    <section class="py-24 bg-white border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12">Compliance & Certifications</h2>
        <div class="flex flex-wrap items-center justify-center gap-12 lg:gap-24">
          <div class="flex flex-col items-center gap-4 group">
            <div class="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 text-3xl group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300 shadow-sm">👮</div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">Police Checked</span>
          </div>
          <div class="flex flex-col items-center gap-4 group">
            <div class="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 text-2xl font-black text-slate-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300 shadow-sm">ISO</div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">ISO 9001</span>
          </div>
          <div class="flex flex-col items-center gap-4 group">
            <div class="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 text-3xl group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300 shadow-sm">🛡️</div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">$20M Insured</span>
          </div>
          <div class="flex flex-col items-center gap-4 group">
            <div class="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 text-3xl group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300 shadow-sm">🏫</div>
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600">NDIS & School</span>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS STRIP -->
    <section class="py-16 bg-blue-600">
      <div class="max-w-6xl mx-auto px-6 flex flex-wrap justify-around gap-10 text-center">
        <div v-for="stat in stats" :key="stat.label">
          <div class="text-4xl font-black text-white mb-1">{{ stat.value }}</div>
          <div class="text-blue-100 text-[10px] font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-14 bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <p class="text-2xl font-black text-blue-950">Cleanworks<span class="text-blue-600">.</span></p>
        <p class="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Adelaide · Commercial & Facilities · 2026</p>
        <p class="text-slate-300 text-[10px] font-bold uppercase tracking-widest">© 2026 Cleanworks Adelaide · All Rights Reserved</p>
      </div>
    </footer>

    <!-- MOBILE STICKY BOTTOM BAR -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:hidden z-50">
      <button @click="scrollToForm" class="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg uppercase tracking-widest text-sm hover:bg-blue-700 active:scale-95 transition-all">
        Get My Free Quote
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ['Offices', 'Schools', 'NDIS Facilities', 'Warehouses', 'Medical']

const stats = [
  { value: '12 yrs', label: 'Industry Experience' },
  { value: '350+', label: 'Commercial Clients' },
  { value: '4.9 ★', label: 'Google Rating' },
  { value: '$20M', label: 'Insured Coverage' },
]

const form = ref({ name: '', company: '', email: '', phone: '', service: '' })
const errors = ref({})
const submitted = ref(false)

function scrollToForm() {
  document.getElementById('ghl-form-wrapper')?.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  errors.value = {}
  if (!form.value.name.trim()) errors.value.name = 'Required'
  if (!form.value.company.trim()) errors.value.company = 'Required'
  if (!form.value.email.trim() || !form.value.email.includes('@')) errors.value.email = 'Valid email required'
  if (Object.keys(errors.value).length === 0) submitted.value = true
}
</script>
