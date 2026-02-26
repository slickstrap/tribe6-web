<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold tracking-tight text-white">System Updates</h1>
          <p class="text-slate-400 mt-1">Review deployment history and system integrity logs</p>
        </div>
      </header>

      <div class="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl flex gap-3 text-indigo-300">
        <svg class="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p class="text-sm leading-relaxed">
          <strong class="font-bold text-white">Automated Logs Active.</strong> 
          Antigravity automatically writes entries to this timeline when changes are deployed or reverted. 
          You can also manually insert records below if needed for legacy tracking.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Add Manual Log Form -->
        <div class="lg:col-span-1 border border-slate-700 bg-slate-800 rounded-xl p-6 h-fit">
          <h2 class="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Record Manual Entry</h2>
          
          <form @submit.prevent="addLog" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Version Number</label>
              <input v-model="newLog.version" type="text" placeholder="e.g. v2.1.4" required class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Update Title</label>
              <input v-model="newLog.title" type="text" placeholder="e.g. Hotfix: Analytics Route" required class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Description (Optional Markdown)</label>
              <textarea v-model="newLog.description" rows="3" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none resize-none"></textarea>
            </div>
            
            <div>
               <label class="block text-sm font-medium text-slate-400 mb-1">Functions Affected (Comma Separated)</label>
               <input v-model="newLog.functionsRaw" type="text" placeholder="e.g. process-traffic, auth-trigger" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none font-mono" />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Status</label>
              <select v-model="newLog.status" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none">
                <option value="deployed">Deployed</option>
                <option value="reverted">Reverted</option>
              </select>
            </div>
            
            <button type="submit" :disabled="saving" class="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-2 rounded-md transition mt-4">
              {{ saving ? 'Logging...' : 'Append to Timeline' }}
            </button>
          </form>
        </div>

        <!-- Timeline Log View -->
        <div class="lg:col-span-2 border border-slate-700 bg-slate-800 rounded-xl flex flex-col h-[75vh]">
          <div class="p-6 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">System Timeline</h2>
          </div>
          
          <div v-if="loading" class="flex-1 flex justify-center py-20">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
          </div>
          
          <div v-else class="flex-1 p-6 overflow-y-auto w-full relative">
            <div v-if="logs.length === 0" class="text-center text-slate-500 py-12">
              No log history recorded yet.
            </div>

            <!-- Timeline visual line -->
            <div v-if="logs.length > 0" class="absolute left-6 md:left-10 top-6 bottom-6 w-0.5 bg-slate-700 z-0"></div>

            <div class="space-y-8 relative z-10 w-full pl-6 md:pl-10">
              <div v-for="log in logs" :key="log.id" class="relative w-full">
                <!-- Dot -->
                <div 
                  class="absolute -left-10 top-1.5 h-4 w-4 rounded-full border-2 border-slate-800 shadow"
                  :class="log.status === 'deployed' ? 'bg-emerald-500' : 'bg-rose-500'"
                ></div>
                
                <div class="bg-slate-900/80 border border-slate-700 rounded-lg p-5 w-full hover:bg-slate-800 transition">
                  <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
                    <div class="flex-1 w-full max-w-full overflow-hidden">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-bold text-white text-lg">{{ log.title }}</span>
                        <span class="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded font-mono shrink-0">{{ log.version }}</span>
                        <span 
                          v-if="log.status === 'reverted'" 
                          class="bg-rose-500/20 text-rose-400 text-xs px-2 py-0.5 rounded border border-rose-500/30 shrink-0"
                        >REVERTED</span>
                      </div>
                      <div class="text-xs text-slate-400 mb-3">{{ new Date(log.created_at).toLocaleString() }}</div>
                      
                       <p class="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-w-[100%] break-words">{{ log.description || 'No detailed description provided.' }}</p>
                      
                      <div v-if="log.functions_affected && log.functions_affected.length > 0" class="mt-4 pt-4 border-t border-slate-800">
                        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Affected Functions</span>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="f in log.functions_affected" :key="f" class="text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded">
                            {{ f }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
const logs = ref([])
const saving = ref(false)

const newLog = ref({
  version: '',
  title: '',
  description: '',
  status: 'deployed',
  functionsRaw: ''
})

onMounted(async () => {
  await loadLogs()
})

async function loadLogs() {
  loading.value = true
  const { data, error } = await supabase
    .from('changelog')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error loading changelog:', error)
  } else if (data) {
    logs.value = data
  }
  loading.value = false
}

async function addLog() {
  saving.value = true
  
  const payload = {
    version: newLog.value.version,
    title: newLog.value.title,
    description: newLog.value.description,
    status: newLog.value.status,
    functions_affected: newLog.value.functionsRaw 
      ? newLog.value.functionsRaw.split(',').map(s => s.trim()).filter(Boolean) 
      : []
  }

  const { error } = await supabase.from('changelog').insert([payload])
  
  if (error) {
    alert('Failed to save log: ' + error.message)
  } else {
    newLog.value = { version: '', title: '', description: '', status: 'deployed', functionsRaw: '' }
    await loadLogs()
  }
  
  saving.value = false
}
</script>
