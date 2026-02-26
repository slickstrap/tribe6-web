<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold tracking-tight text-white">SEO Guard</h1>
          <p class="text-slate-400 mt-1">Configure search engine visibility and crawl permissions</p>
        </div>
      </header>
      
      <div class="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl flex gap-3 text-indigo-300">
        <svg class="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm leading-relaxed">
          <strong class="font-bold text-white">Dynamic Robots.txt is active.</strong> 
          Ticking a page here automatically adds an <code>Allow:</code> directive into the dynamically generated 
          <code>/robots.txt</code> file served to visiting web crawlers. Unticked pages fallback to the global <code>Disallow: /admin/</code> and implicit deny lists.
        </p>
      </div>

      <div class="border border-slate-700 bg-slate-800 rounded-xl flex flex-col h-[70vh]">
        <div class="p-6 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">Public Application Routes</h2>
          
          <button 
            @click="syncRoutes" 
            :disabled="syncing"
            class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-md text-sm transition flex items-center gap-2 disabled:opacity-50"
          >
            <svg class="w-4 h-4" :class="{'animate-spin': syncing}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ syncing ? 'Syncing...' : 'Scan New Routes' }}
          </button>
        </div>
        
        <div v-if="loading" class="flex-1 flex justify-center py-20">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
        </div>
        
        <div v-else class="flex-1 overflow-y-auto p-6 space-y-2">
          
          <label 
            v-for="route in seoRoutes" :key="route.id"
            class="flex items-center gap-4 p-4 rounded-xl border transition cursor-pointer"
            :class="route.is_crawled ? 'border-electric-blue/50 bg-electric-blue/10' : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800'"
          >
            <input 
              type="checkbox" 
              v-model="route.is_crawled"
              @change="toggleCrawl(route)"
              class="h-5 w-5 rounded border-slate-600 bg-slate-700 text-electric-blue focus:ring-electric-blue focus:ring-offset-slate-900 shrink-0"
            />
            
            <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="font-mono text-sm font-semibold truncate text-slate-200">
                {{ route.path }}
              </div>
              
              <span 
                class="text-xs font-bold uppercase shrink-0 w-fit px-2 py-1 rounded"
                :class="route.is_crawled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'"
              >
                {{ route.is_crawled ? 'Indexable' : 'Hidden' }}
              </span>
            </div>
          </label>
            
          <div v-if="seoRoutes.length === 0" class="text-center text-slate-500 py-12">
            Click "Scan New Routes" to populate the database with your frontend paths.
          </div>
          
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const loading = ref(true)
const syncing = ref(false)
const seoRoutes = ref([])

onMounted(async () => {
  await loadSEO()
})

async function loadSEO() {
  loading.value = true
  const { data, error } = await supabase.from('seo_config').select('*').order('path', { ascending: true })
  
  if (error) {
    console.error('Error loading SEO config:', error)
  } else if (data) {
    seoRoutes.value = data
    // Auto-sync once if empty to provide a better first-run experience
    if (data.length === 0) {
      await syncRoutes()
    }
  }
  loading.value = false
}

async function syncRoutes() {
  syncing.value = true
  
  // The predefined list of major public routes we want to offer for ticking
  const staticPaths = [
    '/',
    '/login',
    '/register',
    '/knowledge',
    '/changelog',
    '/sample/cosmetics',
    '/sample/cleaning',
    '/case-study'
  ]
  
  for (const path of staticPaths) {
    const exists = seoRoutes.value.find(r => r.path === path)
    if (!exists) {
      await supabase.from('seo_config').insert([{ path, is_crawled: true }]) // Opt-in by default
    }
  }
  
  await loadSEO()
  syncing.value = false
}

async function toggleCrawl(routeItem) {
  const { error } = await supabase
    .from('seo_config')
    .update({ is_crawled: routeItem.is_crawled })
    .eq('id', routeItem.id)
    
  if (error) {
    alert('Failed to update config: ' + error.message)
    routeItem.is_crawled = !routeItem.is_crawled // revert visually
  }
}
</script>
