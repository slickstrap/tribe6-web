<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <Breadcrumbs />

      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Registration Requests</h1>
          <p class="text-slate-400 mt-1">Review and approve incoming access requests</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-slate-400">{{ pendingCount }} pending</span>
          <button @click="fetchRegistrations"
            class="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
        </div>
      </header>

      <!-- Filter Tabs -->
      <div class="flex gap-2 bg-slate-800/40 p-1.5 rounded-xl border border-slate-700/50 w-fit">
        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
          class="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
          :class="activeTab === tab.value ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:text-slate-200'">
          {{ tab.label }}
          <span v-if="tab.count > 0" class="ml-1.5 px-1.5 py-0.5 text-xs rounded-full"
            :class="activeTab === tab.value ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'">
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Table -->
      <section class="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur-md shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em]">
              <tr>
                <th class="px-6 py-5">Date</th>
                <th class="px-6 py-5">Name</th>
                <th class="px-6 py-5">Email</th>
                <th class="px-6 py-5">Company</th>
                <th class="px-6 py-5">Status</th>
                <th class="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-if="loading">
                <td colspan="6" class="py-16 text-center text-slate-500">
                  <div class="flex items-center justify-center gap-2">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>
                    Loading requests...
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredRegistrations.length === 0">
                <td colspan="6" class="py-16 text-center text-slate-500 italic">No requests found.</td>
              </tr>
              <tr v-for="reg in filteredRegistrations" :key="reg.id"
                class="hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">{{ formatDate(reg.created_at) }}</td>
                <td class="px-6 py-4">
                  <div class="font-medium text-white">{{ reg.full_name || '—' }}</div>
                  <div class="text-xs text-slate-500">@{{ reg.username || '—' }}</div>
                </td>
                <td class="px-6 py-4 text-electric-blue/90 font-mono text-xs">{{ reg.email }}</td>
                <td class="px-6 py-4 text-slate-300">{{ reg.company || '—' }}</td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20': reg.approval_status === 'pending',
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': reg.approval_status === 'approved',
                    }">
                    {{ reg.approval_status === 'pending' ? '⏳ Pending' : '✅ Approved & Active' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <!-- Approve -->
                    <button v-if="reg.approval_status === 'pending'"
                      @click="approve(reg)" :disabled="actionLoading === reg.id"
                      class="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50 font-medium">
                      {{ actionLoading === reg.id ? 'Approving...' : 'Approve Access' }}
                    </button>
                    <!-- Delete -->
                    <button @click="deleteRequest(reg)" :disabled="actionLoading === reg.id"
                      class="text-xs bg-rose-600/80 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50 font-medium">
                      {{ actionLoading === reg.id ? '...' : 'Delete' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Toast -->
      <div v-if="statusMsg" class="fixed bottom-6 right-6 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl backdrop-blur-md border transition-all"
        :class="statusMsg.type === 'success' ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-300' : 'bg-rose-900/80 border-rose-500/30 text-rose-300'">
        {{ statusMsg.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../supabase'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const loading = ref(true)
const registrations = ref([]) // We'll keep the name 'registrations' to minimize template changes
const activeTab = ref('all')
const actionLoading = ref(null)
const statusMsg = ref(null)

const tabs = computed(() => [
  { label: 'All Users',     value: 'all',     count: registrations.value.length },
  { label: 'Pending',       value: 'pending',  count: registrations.value.filter(r => r.approval_status === 'pending').length },
  { label: 'Approved',      value: 'approved', count: registrations.value.filter(r => r.approval_status === 'approved').length },
])

const pendingCount = computed(() => registrations.value.filter(r => r.approval_status === 'pending').length)
const filteredRegistrations = computed(() =>
  activeTab.value === 'all' 
    ? registrations.value 
    : registrations.value.filter(r => r.approval_status === activeTab.value)
)

onMounted(() => fetchRegistrations())

async function fetchRegistrations() {
  loading.value = true
  try {
    // We fetch all profiles with role='user' to manage their approval lifecycle
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'user')
      .order('created_at', { ascending: false })
    if (error) throw error
    registrations.value = data || []
  } catch (err) {
    console.error('Error fetching profiles:', err)
    showStatus('Failed to load user profiles.', 'error')
  } finally {
    loading.value = false
  }
}

async function approve(reg) {
  if (!confirm(`Grant full access to ${reg.full_name || reg.email}?\n\nThey will be able to access the Portal immediately.`)) return
  actionLoading.value = reg.id
  try {
    // Directly update the profile status — no Edge Function needed!
    const { error } = await supabase
      .from('profiles')
      .update({ approval_status: 'approved' })
      .eq('id', reg.id)
      
    if (error) throw error

    // Update locally
    const idx = registrations.value.findIndex(r => r.id === reg.id)
    if (idx !== -1) registrations.value[idx].approval_status = 'approved'

    showStatus(`✅ ${reg.email} approved successfully.`, 'success')
  } catch (err) {
    console.error('Error approving:', err)
    showStatus(`Failed to approve: ${err.message}`, 'error')
  } finally {
    actionLoading.value = null
  }
}

async function deleteRequest(reg) {
  const confirmMsg = `PERMANENTLY DELETE user account for ${reg.email}?\n\nThis will remove them from Supabase Auth and all data associated with their profile.\n\nAre you sure?`
    
  if (!confirm(confirmMsg)) return
  
  actionLoading.value = reg.id
  try {
    // Since RLS or triggers might be complex, we still use the delete-user function 
    // OR we can try to delete from profiles if it cascades. 
    // To be safe and definitive, we'll keep using the Edge Function for deletion 
    // because it handles 'auth.users' which profiles can't always do via RLS.
    // However, the user asked to "remove what we did", so I'll try to use the Edge Function 
    // but ensure it's robust. Actually, the user wants to avoid Edge Functions for approval 
    // but deletion of an Auth user is still better done via a service role.
    
    // Let's try to call the delete-user function (it's already hardened with bypass)
    const { error: deleteError } = await supabase.functions.invoke('delete-user', {
      body: { userId: reg.id } 
    })
    
    if (deleteError) throw deleteError

    registrations.value = registrations.value.filter(r => r.id !== reg.id)
    showStatus('User account deleted successfully.', 'success')
  } catch (err) {
    console.error('Error during deletion:', err)
    showStatus(`Failed to delete: ${err.message}`, 'error')
  } finally {
    actionLoading.value = null
  }
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(iso))
}

function showStatus(text, type = 'success') {
  statusMsg.value = { text, type }
  setTimeout(() => { statusMsg.value = null }, 5000)
}
</script>
