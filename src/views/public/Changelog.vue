<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <Navbar />
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh]">
      <Breadcrumbs />
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl font-extrabold tracking-tight text-white mb-4">
          Platform Updates
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">Track the evolution of <span class="brand-text">Tribe6</span>. See what's new, what's been improved, and what bugs have been squashed.</p>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
      </div>

      <!-- Timeline visual line -->
      <div v-else class="relative w-full pb-32">
        <div v-if="logs.length === 0" class="text-center py-20 border border-slate-700/50 bg-slate-800/20 rounded-2xl">
           <svg class="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-white mb-2">No updates recorded yet</h3>
          <p class="text-slate-400">Everything is running smoothly.</p>
        </div>

        <template v-else>
          <div class="absolute left-4 md:left-24 top-4 bottom-0 w-0.5 bg-slate-800"></div>

          <div class="space-y-16">
            <div v-for="log in logs" :key="log.id" class="relative group">
              
              <!-- Timeline Date block (Desktop) -->
              <div class="hidden md:block absolute w-20 text-right left-0 top-1 text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                {{ formatMonthRow(log.created_at) }}<br/>
                <span class="text-slate-400 text-base font-normal">{{ formatDayRow(log.created_at) }}</span>
              </div>

              <!-- Timeline Dot -->
              <div class="absolute left-[11px] md:left-[90px] top-2 h-3.5 w-3.5 rounded-full border-2 border-slate-900 ring-2 ring-slate-800 bg-slate-600 group-hover:bg-electric-blue group-hover:ring-electric-blue/30 transition shadow-lg"></div>

              <!-- Content Card -->
              <div class="pl-12 md:pl-36 pr-4">
                
                <!-- Mobile Date -->
                <div class="md:hidden text-xs text-slate-500 font-bold mb-2 tracking-wider">
                  {{ new Date(log.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </div>

                <div class="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:bg-slate-800/80 transition group-hover:border-slate-600 shadow-xl">
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <span 
                      class="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded-full text-xs font-mono tracking-wider shadow-inner"
                      :class="{'line-through opacity-50': log.status === 'reverted'}"
                    >{{ log.version }}</span>
                    
                    <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight" :class="{'opacity-50 line-through': log.status === 'reverted'}">{{ log.title }}</h2>
                    
                    <span 
                      v-if="log.status === 'reverted'"
                      class="px-2 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded text-[10px] font-bold uppercase tracking-wider ml-auto"
                    >Reverted</span>
                  </div>

                  <div class="prose prose-invert prose-p:text-slate-400 prose-p:leading-relaxed max-w-none text-[15px]">
                    <!-- For simplicity, rendering markdown structurally as text unless rich html needed -->
                    <p class="whitespace-pre-wrap">{{ log.description || 'Routine platform maintenance and optimization.' }}</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </template>
      </div>

    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import Navbar from '../../components/Navbar.vue'
import AppFooter from '../../components/AppFooter.vue'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const loading = ref(true)
const logs = ref([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('changelog')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (!error && data) {
    logs.value = data
  }
  loading.value = false
})

function formatMonthRow(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short' })
}

function formatDayRow(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric' })
}
</script>
