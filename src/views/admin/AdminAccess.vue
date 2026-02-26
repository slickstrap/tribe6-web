<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="text-left">
            <h1 class="text-3xl font-bold tracking-tight text-white">Security Guard</h1>
            <p class="text-slate-400 mt-1">Manage granular user access and platform permissions</p>
          </div>
        </div>
      </header>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-electric-blue"></div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- User Selection Sidebar -->
        <div class="lg:col-span-1 border border-slate-700 bg-slate-800/50 rounded-xl overflow-hidden flex flex-col h-[70vh]">
          <div class="p-4 border-b border-slate-700 bg-slate-800">
            <h2 class="font-semibold text-lg text-white">Registered Users</h2>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search users..." 
              class="mt-3 w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-electric-blue outline-none"
            />
          </div>
          <div class="overflow-y-auto flex-1 p-2">
            <button
              v-for="user in filteredUsers" :key="user.id"
              @click="selectUser(user)"
              class="w-full text-left p-3 rounded-lg mb-1 transition flex items-center gap-3"
              :class="selectedUser?.id === user.id ? 'bg-electric-blue/20 border border-electric-blue/50' : 'hover:bg-slate-700/50 border border-transparent'"
            >
              <div class="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                {{ user.full_name?.charAt(0) || user.username?.charAt(0) || '?' }}
              </div>
              <div class="overflow-hidden">
                <div class="font-medium text-sm truncate text-white">{{ user.full_name || user.username }}</div>
                <div class="text-xs text-slate-400 truncate">{{ user.email }}</div>
              </div>
              <span v-if="user.role === 'admin'" class="ml-auto text-xs bg-indigo-500/20 text-indigo-400 px-2 rounded-full shrink-0">Admin</span>
            </button>
            <div v-if="filteredUsers.length === 0" class="p-4 text-center text-sm text-slate-500">
              No users found.
            </div>
          </div>
        </div>

        <!-- Permissions Editor -->
        <div class="lg:col-span-2 border border-slate-700 bg-slate-800 rounded-xl flex flex-col h-[70vh]">
          <div v-if="!selectedUser" class="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            <svg class="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
            </svg>
            <p>Select a user from the list to view and edit their page permissions.</p>
          </div>
          
          <div v-else class="flex flex-col h-full">
            <div class="p-6 border-b border-slate-700 bg-slate-800/80 flex items-center justify-between">
              <div>
                <h2 class="text-xl font-bold text-white">{{ selectedUser.full_name || selectedUser.username }}</h2>
                <p class="text-sm text-slate-400 mt-1">Editing access permissions</p>
              </div>
              <span 
                class="px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition hover:opacity-80"
                :class="selectedUser.role === 'admin' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'"
                @click="toggleAdminRole(selectedUser)"
                title="Click to toggle Admin role"
              >
                {{ selectedUser.role === 'admin' ? 'Administrator' : 'Standard User' }}
              </span>
            </div>
            
            <div class="p-6 flex-1 overflow-y-auto space-y-6">
              
              <div v-if="selectedUser.role === 'admin'" class="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-lg flex gap-3 text-indigo-300 text-sm">
                <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>Administrators have implicit access to all pages and management settings. Page-level rules below only apply if they are demoted to a regular User.</p>
              </div>

              <!-- Available Pages List -->
              <div>
                <h3 class="font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">Allowed Pages</h3>
                <div class="space-y-2">
                  <label v-for="page in availablePages" :key="page.id" class="flex items-center gap-3 p-3 rounded-lg border border-slate-700 bg-slate-900/50 cursor-pointer hover:bg-slate-800 transition">
                    <input 
                      type="checkbox" 
                      :value="page.id" 
                      v-model="userPerms"
                      class="h-4 w-4 rounded border-slate-600 bg-slate-700 text-electric-blue focus:ring-electric-blue focus:ring-offset-slate-900"
                    />
                    <div>
                      <div class="font-medium text-slate-200">{{ page.label }}</div>
                      <div class="text-xs text-slate-500 font-mono mt-0.5">{{ page.id }}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-slate-700 bg-slate-800 flex items-center justify-between">
              <span class="text-sm" :class="saveStatus.includes('Error') ? 'text-rose-400' : 'text-emerald-400'">{{ saveStatus }}</span>
              <button 
                @click="savePermissions" 
                :disabled="saving"
                class="bg-electric-blue hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50"
              >
                {{ saving ? 'Saving...' : 'Save Permissions' }}
              </button>
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

const loading = ref(true)
const users = ref([])
const searchQuery = ref('')
const selectedUser = ref(null)

// Hardcoded for now, could be dynamic later if routes are complex
const availablePages = [
  { id: '/knowledge', label: 'Knowledge Hub' },
  { id: '/changelog', label: 'System Updates' },
  { id: '/sample/cosmetics', label: 'Cosmetics Samples Gallery' },
  { id: '/sample/cleaning', label: 'Cleaning Samples Gallery' },
  { id: '/case-study', label: 'Case Studies' },
]

const userPerms = ref([])
const saving = ref(false)
const saveStatus = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  const q = searchQuery.value.toLowerCase()
  return users.value.filter(u => 
    (u.full_name || '').toLowerCase().includes(q) || 
    (u.username || '').toLowerCase().includes(q) ||
    (u.email || '').toLowerCase().includes(q)
  )
})

onMounted(async () => {
  await fetchUsers()
  loading.value = false
})

async function fetchUsers() {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  if (!error && data) {
    users.value = data
  }
}

async function selectUser(user) {
  selectedUser.value = user
  userPerms.value = []
  saveStatus.value = ''
  
  // Fetch their current permissions
  const { data, error } = await supabase
    .from('page_access')
    .select('page_identifier')
    .eq('user_id', user.id)
    
  if (!error && data) {
    userPerms.value = data.map(row => row.page_identifier)
  }
}

async function toggleAdminRole(user) {
  const newRole = user.role === 'admin' ? 'user' : 'admin'
  const confirmMsg = newRole === 'admin' 
    ? `Are you sure you want to promote ${user.username} to Administrator? They will have full system access.`
    : `Are you sure you want to demote ${user.username} to a standard User?`
    
  if (confirm(confirmMsg)) {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', user.id)
    if (!error) {
      user.role = newRole
      const index = users.value.findIndex(u => u.id === user.id)
      if (index !== -1) users.value[index].role = newRole
    } else {
      alert('Failed to update role: ' + error.message)
    }
  }
}

async function savePermissions() {
  if (!selectedUser.value) return
  
  saving.value = true
  saveStatus.value = ''
  
  try {
    // 1. Delete all existing for user
    await supabase.from('page_access').delete().eq('user_id', selectedUser.value.id)
    
    // 2. Insert new ones
    if (userPerms.value.length > 0) {
      const inserts = userPerms.value.map(page => ({
        user_id: selectedUser.value.id,
        page_identifier: page
      }))
      const { error } = await supabase.from('page_access').insert(inserts)
      if (error) throw error
    }
    
    saveStatus.value = 'Permissions saved successfully.'
    setTimeout(() => { saveStatus.value = '' }, 3000)
  } catch (err) {
    saveStatus.value = 'Error: ' + err.message
  } finally {
    saving.value = false
  }
}
</script>
