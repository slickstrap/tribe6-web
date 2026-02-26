<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold tracking-tight text-white">Geo Firewall</h1>
          <p class="text-slate-400 mt-1">Manage geographic access restrictions and blocked regions</p>
        </div>
      </header>

      <!-- Global Rule Alert -->
      <div class="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl flex gap-3 text-indigo-300">
        <svg class="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm leading-relaxed">
          <strong class="font-bold text-white">Default Allow Policy is Active.</strong> 
          All global traffic is permitted by default. 
          Use the lists below to analyze where traffic and blocks are originating from. 
          If you detect abuse from a specific Region, you can manually block it here, which instantly redirects that region to Google in the Edge layer.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Active Blocklist -->
        <div class="border border-slate-700 bg-slate-800 rounded-xl overflow-hidden flex flex-col min-h-[50vh]">
          <div class="p-6 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Active Edge Blocks</h2>
            <button 
              @click="isAddingBlock = true"
              class="text-xs bg-electric-blue hover:bg-blue-600 text-white font-medium px-3 py-1.5 rounded transition"
            >
              + Add Rule
            </button>
          </div>
          
          <div v-if="loadingBlocks" class="flex-1 flex justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>

          <div v-else class="flex-1 p-6 space-y-4 overflow-y-auto">
            
            <!-- Manual Add Form -->
            <form v-if="isAddingBlock" @submit.prevent="addBlock" class="bg-slate-900 border border-electric-blue/50 p-4 rounded-lg space-y-4 mb-6">
              <h3 class="text-sm font-semibold text-electric-blue mb-2">Create New Block Rule</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">Country Code (e.g. US, RU)</label>
                  <input v-model="newBlock.country_code" type="text" maxlength="2" required class="w-full bg-slate-800 border-none rounded px-3 py-1.5 text-sm uppercase focus:ring-1 focus:ring-electric-blue outline-none" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">City (Optional)</label>
                  <input v-model="newBlock.city" type="text" placeholder="Leave blank to block whole country" class="w-full bg-slate-800 border-none rounded px-3 py-1.5 text-sm placeholder:text-slate-600 focus:ring-1 focus:ring-electric-blue outline-none" />
                </div>
              </div>
              <div class="flex gap-2 pt-2">
                <button type="submit" class="bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 px-3 py-1.5 rounded text-sm transition font-medium flex-1">Enforce Block</button>
                <button type="button" @click="isAddingBlock = false" class="bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded text-sm transition">Cancel</button>
              </div>
            </form>

            <div v-if="blocks.length === 0 && !isAddingBlock" class="text-center text-slate-500 py-12">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              No geographic block rules defined.
            </div>

            <div v-for="rule in blocks" :key="rule.id" class="bg-slate-900 border border-slate-700/50 p-4 rounded-lg flex items-center justify-between hover:bg-slate-800/80 transition">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-white uppercase">{{ rule.country_code || 'ALL COUNTRIES' }}</h3>
                  <div class="text-sm text-slate-400">{{ rule.city || 'Entire Country Blocked' }}</div>
                </div>
              </div>
              <button 
                @click="removeBlock(rule.id)"
                class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1.5 rounded transition"
              >
                Unblock
              </button>
            </div>
          </div>
        </div>

        <!-- Traffic Heatmap / Analysis -->
        <div class="border border-slate-700 bg-slate-800 rounded-xl overflow-hidden flex flex-col min-h-[50vh]">
          <div class="p-6 border-b border-slate-700 bg-slate-800">
            <h2 class="text-lg font-semibold text-white">Recent Traffic Origins</h2>
            <p class="text-xs text-slate-400 mt-1">Countries generating the most traffic (last 30 days)</p>
          </div>
          
          <div v-if="loadingTraffic" class="flex-1 flex justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
          </div>
          
          <div v-else class="flex-1 p-6 overflow-y-auto w-full">
            <div class="space-y-5">
              <div v-for="(stat, idx) in trafficStats" :key="idx">
                <div class="flex justify-between text-sm mb-1 text-slate-300">
                  <span class="font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-2">{{ stat.country }}</span>
                  <span class="font-mono bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-xs shrink-0">{{ stat.count }} requests</span>
                </div>
                <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700/50">
                  <div class="bg-electric-blue h-2 rounded-full" :style="{ width: `${(stat.count / maxTraffic) * 100}%` }"></div>
                </div>
              </div>
              
              <div v-if="trafficStats.length === 0" class="text-center text-slate-500 py-8">
                Not enough traffic data to display.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../supabase'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const loadingBlocks = ref(true)
const loadingTraffic = ref(true)
const blocks = ref([])
const trafficStats = ref([])
const isAddingBlock = ref(false)

const newBlock = ref({
  country_code: '',
  city: ''
})

const maxTraffic = computed(() => {
  if (trafficStats.value.length === 0) return 1
  return trafficStats.value[0].count // Highest is sorted first
})

onMounted(async () => {
  await Promise.all([
    loadBlocks(),
    loadTrafficStats()
  ])
})

async function loadBlocks() {
  loadingBlocks.value = true
  const { data, error } = await supabase
    .from('geo_config')
    .select('*')
    .eq('is_blocked', true)
    .order('country_code', { ascending: true })
    
  if (!error && data) {
    blocks.value = data
  }
  loadingBlocks.value = false
}

async function addBlock() {
  if (!newBlock.value.country_code.trim()) return
  
  const payload = {
    country_code: newBlock.value.country_code.trim().toUpperCase(),
    city: newBlock.value.city.trim() || null,
    is_blocked: true
  }

  const { error } = await supabase.from('geo_config').insert([payload])
  
  if (error) {
    if (error.code === '23505') alert('A block rule already exists for this exact Country/City combination.')
    else alert('Error: ' + error.message)
  } else {
    isAddingBlock.value = false
    newBlock.value = { country_code: '', city: '' }
    await loadBlocks()
  }
}

async function removeBlock(id) {
  const { error } = await supabase.from('geo_config').delete().eq('id', id)
  if (!error) {
    await loadBlocks()
  } else {
    alert('Failed to remove block: ' + error.message)
  }
}

async function loadTrafficStats() {
  loadingTraffic.value = true
  
  // Grouping by country mathematically in client since Supabase postgREST doesn't support GROUP BY natively yet via JS client
  // Fetching max 1000 recent rows to build the list
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  
  const { data, error } = await supabase
    .from('clicks')
    .select('country')
    .gte('created_at', thirtyDaysAgo)
    .order('created_at', { ascending: false })
    .limit(1000)
    
  if (error || !data) {
    loadingTraffic.value = false
    return
  }
  
  const counts = {}
  data.forEach(row => {
    const code = row.country || 'Unknown'
    counts[code] = (counts[code] || 0) + 1
  })
  
  const formatted = Object.keys(counts).map(country => ({
    country,
    count: counts[country]
  }))
  
  // Sort highest to lowest
  formatted.sort((a, b) => b.count - a.count)
  
  // Limit to top 15
  trafficStats.value = formatted.slice(0, 15)
  loadingTraffic.value = false
}
</script>
