<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Security & Analytics Dashboard</h1>
          <p class="text-slate-400 mt-1">Monitor site traffic and manage blocked IPs</p>
        </div>
        <div class="flex flex-wrap gap-4 items-center">
          <button @click="exportToCsv" class="btn-secondary px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-200 font-medium hover:bg-slate-700 transition flex items-center gap-2 backdrop-blur-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export CSV
          </button>
        </div>
      </header>

      <!-- Stat Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-md hover:border-indigo-500/30 transition-colors group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-slate-400 text-sm font-medium">Total Signals</span>
            <div class="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-white">{{ stats.totalHits }}</div>
          <div class="text-xs text-slate-500 mt-1">Raw endpoint pings</div>
        </div>

        <div class="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-md hover:border-emerald-500/30 transition-colors group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-slate-400 text-sm font-medium">Unique Visitors</span>
            <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-white">{{ stats.uniqueIPs }}</div>
          <div class="text-xs text-slate-500 mt-1">Distinct IP addresses</div>
        </div>

        <div class="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-md hover:border-rose-500/30 transition-colors group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-slate-400 text-sm font-medium">Blocked Attempts</span>
            <div class="p-2 bg-rose-500/10 text-rose-400 rounded-lg group-hover:bg-rose-500/20 transition-colors">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-white">{{ stats.totalBlocked }}</div>
          <div class="text-xs text-slate-500 mt-1">Geo or IP filtered</div>
        </div>

        <div class="bg-slate-800/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
          <div class="flex items-center justify-between mb-2">
            <span class="text-slate-400 text-sm font-medium">Avg. Hits/User</span>
            <div class="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
          </div>
          <div class="text-3xl font-bold text-white">{{ stats.intensity }}</div>
          <div class="text-xs text-slate-500 mt-1">Interactions per IP</div>
        </div>
      </section>
      <!-- Admin Tool Launchpad -->
      <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <router-link to="/command-center/security" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-indigo-500/10">
          <div class="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Security</span>
        </router-link>
        
        <router-link to="/command-center/schema" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-500/10">
          <div class="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Schema</span>
        </router-link>
        
        <router-link to="/command-center/firewall" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-rose-500/10">
          <div class="p-3.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Firewall</span>
        </router-link>
 
        <router-link to="/command-center/content" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-amber-500/10">
          <div class="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Content</span>
        </router-link>
 
        <router-link to="/command-center/updates" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Updates</span>
        </router-link>
 
        <router-link to="/command-center/seo" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-fuchsia-500/10">
          <div class="p-3.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 group-hover:bg-fuchsia-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">SEO Guard</span>
        </router-link>

        <router-link to="/command-center/registrations" class="bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 rounded-2xl p-5 transition-all group flex flex-col items-center text-center gap-3 backdrop-blur-sm hover:translate-y-[-4px] hover:shadow-xl hover:shadow-violet-500/10">
          <div class="p-3.5 rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors shadow-inner">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
          </div>
          <span class="font-semibold text-xs text-slate-300 uppercase tracking-widest">Registrations</span>
        </router-link>
      </section>

      <!-- Charts Section -->
      <section class="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-md shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div class="flex items-center gap-6">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
              Traffic Dynamics
            </h2>
            <!-- Mode Toggle -->
            <div class="flex bg-slate-900/60 p-1.5 rounded-xl border border-slate-700/50 shadow-inner">
              <button 
                @click="trackingMode = 'raw'"
                class="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300"
                :class="trackingMode === 'raw' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/10' : 'text-slate-500 hover:text-slate-300'"
              >
                Raw Signals
              </button>
              <button 
                @click="trackingMode = 'unique'"
                class="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300"
                :class="trackingMode === 'unique' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/10' : 'text-slate-500 hover:text-slate-300'"
              >
                Uniques
              </button>
            </div>
          </div>
          <select 
            v-model="timeFilter" 
            class="bg-slate-900 border border-slate-700/50 rounded-xl px-5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-slate-800 transition-all cursor-pointer shadow-lg"
          >
            <option value="day">Past 24 Hours</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="quarter">Past Quarter</option>
            <option value="year">Past Year</option>
          </select>
        </div>

        <div v-if="loading" class="h-64 flex items-center justify-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
        </div>
        <div v-else-if="chartSeries[0].data.length === 0" class="h-64 flex items-center justify-center text-slate-500 italic">
          No data stream detected for this period.
        </div>
        <apexchart 
          v-else
          type="area" 
          height="350" 
          :options="chartOptions" 
          :series="chartSeries"
        />
      </section>

      <!-- Recent Traffic Table -->
      <section class="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-md shadow-2xl">
        <div class="p-6 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/20">
          <h2 class="text-xl font-bold text-white">Live Signal Feed</h2>
          <button @click="fetchData" class="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh Feed
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em]">
              <tr>
                <th class="px-6 py-5 min-w-[120px]">Date</th>
                <th class="px-6 py-5 min-w-[100px]">Time</th>
                <th class="px-6 py-5">IP Source</th>
                <th class="px-6 py-5">Location</th>
                <th class="px-6 py-5">Device Meta</th>
                <th class="px-6 py-5">Request Path</th>
                <th class="px-6 py-5">Status</th>
                <th class="px-6 py-5 text-right">Shield</th>
              </tr>
              <!-- Filter Row -->
              <tr class="bg-slate-900/40">
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3">
                  <input v-model="filterIp" type="text" placeholder="Filter IP..." class="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-400 placeholder-slate-600 transition-all font-mono" />
                </th>
                <th class="px-6 py-3">
                  <input v-model="filterLocation" type="text" placeholder="Filter Region..." class="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-400 placeholder-slate-600 transition-all" />
                </th>
                <th class="px-6 py-3">
                  <input v-model="filterDevice" type="text" placeholder="Filter Meta..." class="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none text-slate-400 placeholder-slate-600 transition-all" />
                </th>
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3"></th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-if="loading" class="text-center">
                <td colspan="7" class="py-12">Loading logs...</td>
              </tr>
              <tr v-else-if="!clicks.length" class="text-center">
                <td colspan="7" class="py-12 text-slate-500">No recent traffic found.</td>
              </tr>
              <tr 
                v-for="click in filteredClicks" 
                :key="click.id"
                class="hover:bg-slate-700/30 transition-colors"
                :class="{ 'opacity-60': click.is_blocked }"
              >
                <td class="px-6 py-4 text-slate-300 font-medium">{{ formatDateOnly(click.created_at) }}</td>
                <td class="px-6 py-4 text-slate-400 text-xs">{{ formatTimeOnly(click.created_at) }}</td>
                <td class="px-6 py-4 font-mono text-electric-blue/90">{{ click.ip }}</td>
                <td class="px-6 py-4">
                  <span v-if="click.geo_city || click.geo_country" class="inline-flex items-center gap-1.5">
                    {{ click.geo_city || 'Unknown City' }}, {{ click.geo_country || 'Unknown Country' }}
                  </span>
                  <span v-else class="text-slate-500">-</span>
                </td>
                <td class="px-6 py-4 text-slate-300 capitalize">{{ click.device }} / {{ click.browser }}</td>
                <td class="px-6 py-4 text-slate-300 font-mono text-xs">{{ click.path || '/' }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-1 rounded text-xs font-medium"
                    :class="click.is_blocked ? 'bg-rose-500/10 text-rose-400' : 'bg-green-500/10 text-green-400'"
                  >
                    {{ click.is_blocked ? 'Blocked' : 'Allowed' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button 
                    v-if="!isIpBlocked(click.ip)"
                    @click="blockIp(click.ip)"
                    class="text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded transition disabled:opacity-50"
                    :disabled="blocking === click.ip"
                  >
                    {{ blocking === click.ip ? 'Blocking...' : 'Block IP' }}
                  </button>
                  <button 
                    v-else
                    @click="unblockIp(click.ip)"
                    class="text-xs bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded transition disabled:opacity-50"
                    :disabled="blocking === click.ip"
                  >
                    {{ blocking === click.ip ? 'Unblocking...' : 'Unblock' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const router = useRouter()

const loading = ref(true)
const blocking = ref(null)
const clicks = ref([])
const blockedIpsList = ref([])
const timeFilter = ref('week')
const trackingMode = ref('raw') // 'raw' or 'unique'

// Header Filters
const filterIp = ref('')
const filterLocation = ref('')
const filterDevice = ref('')

const stats = computed(() => {
  const data = filteredClicks.value
  const uniqueIPs = new Set(data.map(c => c.ip)).size
  const totalHits = data.length
  const totalBlocked = data.filter(c => c.is_blocked).length
  const intensity = uniqueIPs > 0 ? (totalHits / uniqueIPs).toFixed(1) : 0

  return { totalHits, uniqueIPs, totalBlocked, intensity }
})

const totalBlockedRedirects = computed(() => {
  return filteredClicks.value.filter(c => c.is_blocked).length
})

const filteredClicks = computed(() => {
  const now = new Date()
  let cutoff = new Date()
  
  if (timeFilter.value === 'day') cutoff.setHours(now.getHours() - 24)
  if (timeFilter.value === 'week') cutoff.setDate(now.getDate() - 7)
  if (timeFilter.value === 'month') cutoff.setMonth(now.getMonth() - 1)
  if (timeFilter.value === 'quarter') cutoff.setMonth(now.getMonth() - 3)
  if (timeFilter.value === 'year') cutoff.setFullYear(now.getFullYear() - 1)

  return clicks.value.filter(click => {
    const clickDate = new Date(click.created_at)
    if (clickDate < cutoff) return false

    if (filterIp.value && !click.ip.toLowerCase().includes(filterIp.value.toLowerCase())) return false
    
    const locationStr = `${click.geo_city || ''}, ${click.geo_country || ''}`.toLowerCase()
    if (filterLocation.value && !locationStr.includes(filterLocation.value.toLowerCase())) return false
    
    const deviceStr = `${click.device || ''} / ${click.browser || ''}`.toLowerCase()
    if (filterDevice.value && !deviceStr.includes(filterDevice.value.toLowerCase())) return false

    return true
  })
})

// ApexCharts configuration
const chartSeries = ref([{ name: 'Visits', data: [] }])
const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    background: 'transparent',
    toolbar: { show: false },
    fontFamily: 'inherit',
    foreColor: '#94a3b8'
  },
  colors: ['#0ea5e9'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.05,
      stops: [0, 90, 100]
    }
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  xaxis: {
    type: 'datetime',
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    min: 0,
    forceNiceScale: true,
    labels: { formatter: (val) => Math.floor(val) }
  },
  grid: {
    borderColor: '#334155',
    strokeDashArray: 4,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
    padding: { top: 0, right: 0, bottom: 0, left: 10 }
  },
  theme: { mode: 'dark' }
}))

onMounted(() => {
  fetchData()
})

watch([timeFilter, trackingMode], () => {
  updateChartData()
})

async function fetchData() {
  loading.value = true
  try {
    // 1. Fetch blocked IPs
    const { data: blockedData, error: blockedError } = await supabase
      .from('blocked_ips')
      .select('*')
      
    if (blockedError) throw blockedError
    blockedIpsList.value = blockedData || []

    // 2. Fetch all clicks (limit 1000 for client safety, but in prod you'd paginate)
    const { data: clicksData, error: clicksError } = await supabase
      .from('clicks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000)
      
    if (clicksError) throw clicksError
    clicks.value = clicksData || []

    // Update chart
    updateChartData()

  } catch (err) {
    console.error('Error fetching dashboard data:', err)
  } finally {
    loading.value = false
  }
}

function updateChartData() {
  const now = new Date()
  let cutoff = new Date()
  
  // Set cutoff point based on filter
  if (timeFilter.value === 'day') cutoff.setHours(now.getHours() - 24)
  if (timeFilter.value === 'week') cutoff.setDate(now.getDate() - 7)
  if (timeFilter.value === 'month') cutoff.setMonth(now.getMonth() - 1)
  if (timeFilter.value === 'quarter') cutoff.setMonth(now.getMonth() - 3)
  if (timeFilter.value === 'year') cutoff.setFullYear(now.getFullYear() - 1)

  // Filter clicks within timeframe
  const currentFilteredClicks = clicks.value.filter(c => new Date(c.created_at) >= cutoff)

  // Group by time interval (hour for 'day', otherwise by day)
  const grouped = {}
  
  currentFilteredClicks.forEach(click => {
    const d = new Date(click.created_at)
    // Create a grouping key (truncate to hour or day)
    if (timeFilter.value === 'day') {
      d.setMinutes(0,0,0) // group by hour
    } else {
      d.setHours(0,0,0,0) // group by day
    }
    const key = d.getTime()
    
    if (trackingMode.value === 'unique') {
      // In unique mode, the value in grouped is a Set of IPs for that bucket
      if (!grouped[key]) grouped[key] = new Set()
      grouped[key].add(click.ip)
    } else {
      grouped[key] = (grouped[key] || 0) + 1
    }
  })

  // Fill in zero-values for empty periods
  let currentObj = new Date(cutoff)
  if (timeFilter.value === 'day') {
    currentObj.setMinutes(0,0,0)
    while (currentObj <= now) {
      const k = currentObj.getTime()
      if (!grouped[k]) {
        grouped[k] = trackingMode.value === 'unique' ? new Set() : 0
      }
      currentObj.setHours(currentObj.getHours() + 1)
    }
  } else {
    currentObj.setHours(0,0,0,0)
    while (currentObj <= now) {
      const k = currentObj.getTime()
      if (!grouped[k]) {
        grouped[k] = trackingMode.value === 'unique' ? new Set() : 0
      }
      currentObj.setDate(currentObj.getDate() + 1)
    }
  }

  // Convert to ApexCharts format
  const seriesData = Object.keys(grouped)
    .sort((a, b) => Number(a) - Number(b))
    .map(timestamp => {
      const val = trackingMode.value === 'unique' 
        ? grouped[timestamp].size 
        : grouped[timestamp]
      return [Number(timestamp), val]
    })

  chartSeries.value = [{ 
    name: trackingMode.value === 'unique' ? 'Unique Visitors' : 'Total Hits', 
    data: seriesData 
  }]
}

function formatDateOnly(isoString) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(isoString))
}

function formatTimeOnly(isoString) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  }).format(new Date(isoString))
}

function exportToCsv() {
  const headers = ['Date', 'Time', 'IP Address', 'Country', 'City', 'Device', 'Browser', 'Path', 'Status']
  const rows = filteredClicks.value.map(c => [
    formatDateOnly(c.created_at),
    formatTimeOnly(c.created_at),
    c.ip,
    c.geo_country || 'Unknown',
    c.geo_city || 'Unknown',
    c.device,
    c.browser,
    c.path,
    c.is_blocked ? 'Blocked' : 'Allowed'
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.map(field => `"${field}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `tribe6_traffic_${timeFilter.value}_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function formatDate(isoString) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  }).format(date)
}

function isIpBlocked(ip) {
  return blockedIpsList.value.some(b => b.ip === ip)
}

async function blockIp(ip) {
  if (!confirm(`Are you sure you want to block ${ip}?`)) return
  
  blocking.value = ip
  try {
    const { error } = await supabase
      .from('blocked_ips')
      .insert({ ip })
      
    if (error) throw error
    
    // Refresh lists manually to avoid full reload
    blockedIpsList.value.push({ ip, created_at: new Date().toISOString() })
    
  } catch (err) {
    console.error('Error blocking IP:', err)
    alert('Failed to block IP. See console for details.')
  } finally {
    blocking.value = null
  }
}

async function unblockIp(ip) {
  blocking.value = ip
  try {
    const { error } = await supabase
      .from('blocked_ips')
      .delete()
      .eq('ip', ip)
      
    if (error) throw error
    
    blockedIpsList.value = blockedIpsList.value.filter(b => b.ip !== ip)
    
  } catch (err) {
    console.error('Error unblocking IP:', err)
  } finally {
    blocking.value = null
  }
}
</script>
