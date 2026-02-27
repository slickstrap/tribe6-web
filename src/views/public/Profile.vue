<template>
<div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-electric-blue/30">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="space-y-12 text-left">
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span class="brand-text"><span class="text-electric-blue">my</span>Tribe6</span>
          </h1>
          <p class="text-slate-400 mt-1">Your Elite Personal Command Hub</p>
        </div>
        <div class="flex gap-4">
          <button @click="router.push('/command-center')" v-if="isAdmin" class="px-6 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold hover:bg-indigo-600 hover:text-white transition-all active:scale-95 text-sm uppercase tracking-wider">
            Command Center
          </button>
          <button @click="handleLogout" class="px-6 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 font-bold hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-all active:scale-95 text-sm uppercase tracking-wider">
            Sign Out
          </button>
        </div>
      </header>

      <div v-if="pageLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        <!-- PENDING APPROVAL VIEW -->
        <div v-if="profile.approval_status === 'pending'" class="lg:col-span-3">
          <div class="max-w-2xl mx-auto bg-slate-800/50 border border-slate-700/50 rounded-3xl p-10 backdrop-blur-xl shadow-2xl text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div class="relative w-24 h-24 mx-auto">
              <div class="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse"></div>
              <div class="relative flex items-center justify-center w-full h-full rounded-3xl bg-amber-500/10 border border-amber-500/30">
                <svg class="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>

            <div class="space-y-4">
              <h2 class="text-3xl font-bold text-white tracking-tight">Welcome, {{ profile.full_name || profile.username }}!</h2>
              <p class="text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
                Your account has been successfully created and verified.
              </p>
            </div>

            <div class="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 text-slate-300 space-y-4">
              <div class="flex items-center justify-center gap-3 text-amber-400 font-semibold mb-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Pending Admin Approval
              </div>
              <p class="text-sm text-slate-400">
                To maintain the high quality of <span class="brand-text">Tribe6</span>, all new accounts are manually reviewed. You will receive an email confirmation once your access is activated.
              </p>
            </div>

            <div class="pt-4">
              <router-link to="/" class="text-sm text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Landing Page
              </router-link>
            </div>
          </div>
        </div>

        <!-- FULL ACCESS SIDEBAR -->
        <div v-else class="lg:col-span-1 space-y-6">
          <div class="bg-slate-900/80 rounded-3xl p-8 border border-slate-800/80 backdrop-blur-2xl shadow-2xl text-left relative overflow-hidden group">
            <!-- Decorative Glow -->
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/10 rounded-full blur-3xl group-hover:bg-electric-blue/20 transition-colors duration-500"></div>
            
            <div class="relative">
              <div class="h-32 w-32 bg-gradient-to-br from-electric-blue via-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-5xl font-black mb-6 rotate-3 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] group-hover:rotate-0 transition-all duration-500 cursor-default">
                <span class="-rotate-3 group-hover:rotate-0 transition-transform duration-500 uppercase text-white drop-shadow-lg">
                  {{ profile.full_name?.charAt(0) || profile.username?.charAt(0) || '?' }}
                </span>
              </div>
              <h2 class="text-3xl font-black text-white text-left tracking-tight mb-1">{{ profile.full_name || 'User' }}</h2>
              <p class="text-electric-blue/80 text-sm font-bold font-mono text-left tracking-wider">@{{ profile.username?.toUpperCase() }}</p>
            </div>
            
            <div class="mt-6 pt-6 border-t border-slate-700/50 space-y-2 text-left">
              <div class="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <span>Account Tier</span>
                <span 
                  class="px-3 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest"
                  :class="profile.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'"
                >
                  {{ profile.role === 'admin' ? 'Admin Access' : 'Standard' }}
                </span>
              </div>
              <div class="text-xs text-slate-500 flex items-center gap-2 text-left">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Joined {{ new Date(profile.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) }}
              </div>
            </div>
          </div>

          <!-- Quick Navigation Link for Admins -->
          <div v-if="isAdmin" class="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-6 backdrop-blur-sm group cursor-pointer hover:bg-indigo-600/20 transition-all active:scale-95" @click="scrollToSection('management-console')">
            <div class="flex items-center justify-between">
              <div class="text-left">
                <h3 class="text-white font-bold text-sm">Command Center</h3>
                <p class="text-indigo-400 text-xs mt-1">Direct system management</p>
              </div>
              <svg class="w-6 h-6 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </div>
          </div>
        </div>

        <!-- Launchpad Content -->
        <div v-if="profile.approval_status !== 'pending'" class="lg:col-span-2 space-y-10">
          <!-- Portal Hub (User Resources) -->
          <section id="portal-hub" class="space-y-6">
            <div class="flex items-center justify-between text-left">
              <h3 class="text-2xl font-black text-white flex items-center gap-4 text-left tracking-tight">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-left border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                Portal Launchpad
              </h3>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">{{ availableLaunchpadItems.length }} Resources Available</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div 
                v-for="item in availableLaunchpadItems" :key="item.path"
                @click="router.push(item.path)"
                class="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:bg-slate-800/60 hover:border-electric-blue/40 transition-all duration-300 cursor-pointer group shadow-xl hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)] hover:scale-[1.02] text-left"
              >
                <div class="flex items-start justify-between mb-5 text-left">
                  <div class="p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 text-left shadow-inner" :class="item.colorBg">
                    <component :is="item.icon" class="w-6 h-6" :class="item.colorText" />
                  </div>
                  <div class="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <svg class="w-4 h-4 text-slate-600 group-hover:text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </div>
                <h4 class="text-lg font-black text-white mb-2 text-left tracking-tight group-hover:text-electric-blue transition-colors">{{ item.label }}</h4>
                <p class="text-sm text-slate-500 leading-relaxed text-left group-hover:text-slate-400 transition-colors">{{ item.description }}</p>
              </div>
            </div>

            <div v-if="availableLaunchpadItems.length === 0" class="bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-16 text-center">
              <p class="text-slate-600 font-medium italic">No specific resource access granted yet. Contact your advisor.</p>
            </div>
          </section>

          <!-- Management Console (Admin Only) -->
          <section v-if="isAdmin" id="management-console" class="space-y-8 pt-12 border-t border-slate-900 text-left">
            <div class="flex items-center justify-between text-left">
              <h3 class="text-2xl font-black text-white flex items-center gap-4 text-left tracking-tight">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-left border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                Command Console
              </h3>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                v-for="tool in adminTools" :key="tool.path"
                @click="router.push(tool.path)"
                class="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 hover:bg-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer group text-left shadow-lg"
              >
                <div class="p-2.5 rounded-xl w-fit mb-4 text-left shadow-inner transition-transform group-hover:scale-110" :class="tool.colorBg">
                  <component :is="tool.icon" class="w-5 h-5 text-left" :class="tool.colorText" />
                </div>
                <h5 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-left group-hover:text-white transition-colors">{{ tool.label }}</h5>
              </div>
            </div>
          </section>

          <!-- Profile Settings Form -->
          <section id="settings" class="space-y-8 pt-12 border-t border-slate-900 text-left">
            <div class="flex items-center justify-between text-left">
              <h3 class="text-2xl font-black text-white flex items-center gap-4 text-left tracking-tight">
                <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 text-left border border-slate-700 shadow-lg shadow-black/20">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                Personal Identity
              </h3>
            </div>

            <form @submit.prevent="updateProfile" class="bg-slate-900/40 rounded-3xl p-8 border border-slate-800 space-y-10 backdrop-blur-2xl shadow-2xl text-left relative overflow-hidden">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div class="text-left group">
                  <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-electric-blue transition-colors">Full Name</label>
                  <input v-model="profile.full_name" type="text" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue outline-none transition-all placeholder:text-slate-700" placeholder="e.g. John Doe" />
                </div>
                <div class="text-left group">
                  <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-electric-blue transition-colors">Company</label>
                  <input v-model="profile.company" type="text" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-electric-blue/20 focus:border-electric-blue outline-none transition-all placeholder:text-slate-700" placeholder="Company entity" />
                </div>
              </div>

              <!-- Custom Admins Fields dynamically mapped to profile.custom_fields JSONB -->
              <div v-if="dynamicFields.length > 0" class="pt-6 border-t border-slate-700 text-left">
                <h3 class="text-lg font-semibold border-b border-slate-700 pb-2 mb-4 border-t-0 text-left">Additional Details</h3>
                <div class="space-y-4 text-left">
                  <div v-for="field in dynamicFields" :key="field.id" class="text-left">
                    <label class="block text-sm font-medium text-slate-400 mb-1 text-left">
                      {{ field.label }} <span v-if="field.is_mandatory" class="text-rose-500">*</span>
                    </label>
                    <input 
                      v-if="field.type === 'text'"
                      v-model="profile.custom_fields[field.field_name]" 
                      type="text" 
                      :required="field.is_mandatory"
                      class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none"
                    />
                    <select 
                      v-else-if="field.type === 'select'"
                      v-model="profile.custom_fields[field.field_name]"
                      :required="field.is_mandatory"
                      class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none"
                    >
                      <option disabled value="">Select an option</option>
                      <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div v-if="statusMsg" class="bg-emerald-500/10 text-emerald-400 p-3 rounded text-sm text-center border border-emerald-500/20">
                {{ statusMsg }}
              </div>
              <div v-if="errorMsg" class="bg-rose-500/10 text-rose-400 p-3 rounded text-sm text-center border border-rose-500/20">
                {{ errorMsg }}
              </div>

              <div class="pt-8 border-t border-slate-800 flex items-center justify-between gap-4">
                <p class="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-loose max-w-[200px]">
                  Updates take effect across all synced portal services instantly.
                </p>
                <button type="submit" :disabled="saving" class="bg-electric-blue hover:bg-blue-600 text-white font-black px-10 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-electric-blue/20 text-sm uppercase tracking-widest whitespace-nowrap">
                  {{ saving ? 'Syncing...' : 'Update Protocol' }}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'
import { useAuth } from '../../composables/useAuthSync'
import { 
  BookOpen, 
  Terminal, 
  Layout, 
  Sparkles, 
  Users, 
  Database, 
  Globe, 
  Search, 
  Activity,
  UserCheck
} from 'lucide-vue-next'

const router = useRouter()
const { user, profile: authProfile, checkSession } = useAuth()
const pageLoading = ref(true)
const saving = ref(false)
const statusMsg = ref('')
const errorMsg = ref('')

// Inactivity Timeout Logic (1 Minute)
let inactivityTimer = null
const INACTIVITY_LIMIT = 15 * 60 * 1000 // 15 minutes

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer)
  inactivityTimer = setTimeout(() => {
    handleLogout()
  }, INACTIVITY_LIMIT)
}

function setupInactivityListeners() {
  window.addEventListener('mousemove', resetInactivityTimer)
  window.addEventListener('keydown', resetInactivityTimer)
  window.addEventListener('click', resetInactivityTimer)
  window.addEventListener('scroll', resetInactivityTimer)
  resetInactivityTimer()
}

function removeInactivityListeners() {
  window.removeEventListener('mousemove', resetInactivityTimer)
  window.removeEventListener('keydown', resetInactivityTimer)
  window.removeEventListener('click', resetInactivityTimer)
  window.removeEventListener('scroll', resetInactivityTimer)
  if (inactivityTimer) clearTimeout(inactivityTimer)
}

const profile = ref({
  full_name: '',
  company: '',
  username: '',
  role: 'user',
  custom_fields: {}
})

const dynamicFields = ref([])
const isAdmin = computed(() => profile.value.role === 'admin')
const userPermissions = ref([])

const availableLaunchpadItems = computed(() => {
  const items = [
    { 
      path: '/knowledge', 
      label: 'Knowledge Hub', 
      description: 'Access internal training manuals and platform SOPs.',
      icon: BookOpen,
      colorText: 'text-emerald-400',
      colorBg: 'bg-emerald-500/10',
      requires: '/knowledge'
    },
    { 
      path: '/changelog', 
      label: 'System Updates', 
      description: 'Track the evolution and deployment history of <span class="brand-text">Tribe6</span>.',
      icon: Terminal,
      colorText: 'text-indigo-400',
      colorBg: 'bg-indigo-500/10',
      requires: '/changelog'
    },
    { 
      path: '/sample/cosmetics', 
      label: 'Cosmetics Gallery', 
      description: 'View elite landing page templates for beauty brands.',
      icon: Sparkles,
      colorText: 'text-fuchsia-400',
      colorBg: 'bg-fuchsia-500/10',
      requires: '/sample/cosmetics'
    },
    { 
      path: '/sample/cleaning', 
      label: 'Home Service Gallery', 
      description: 'Explore conversion-optimized local service templates.',
      icon: Layout,
      colorText: 'text-cyan-400',
      colorBg: 'bg-cyan-500/10',
      requires: '/sample/cleaning'
    },
    { 
      path: '/case-study', 
      label: 'Case Studies', 
      description: 'In-depth analysis of successful business automations.',
      icon: Activity,
      colorText: 'text-amber-400',
      colorBg: 'bg-amber-500/10',
      requires: '/case-study'
    }
  ]
  
  if (isAdmin.value) return items
  return items.filter(item => userPermissions.value.includes(item.requires))
})

const adminTools = [
  { path: '/command-center', label: 'Monitor', icon: Activity, colorText: 'text-indigo-400', colorBg: 'bg-indigo-500/10' },
  { path: '/command-center/security', label: 'Security', icon: UserCheck, colorText: 'text-emerald-400', colorBg: 'bg-emerald-500/10' },
  { path: '/command-center/schema', label: 'Schema', icon: Database, colorText: 'text-amber-400', colorBg: 'bg-amber-500/10' },
  { path: '/command-center/firewall', label: 'Shield', icon: Globe, colorText: 'text-rose-400', colorBg: 'bg-rose-500/10' },
  { path: '/command-center/content', label: 'Hub', icon: BookOpen, colorText: 'text-indigo-400', colorBg: 'bg-indigo-500/10' },
  { path: '/command-center/updates', label: 'Logs', icon: Terminal, colorText: 'text-cyan-400', colorBg: 'bg-cyan-500/10' },
  { path: '/command-center/seo', label: 'SEO', icon: Search, colorText: 'text-fuchsia-400', colorBg: 'bg-fuchsia-500/10' }
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const { user: authUser, profile: syncedProfile } = await checkSession()
    
    if (!authUser) {
      router.push('/login')
      return
    }

    if (syncedProfile) {
      profile.value = JSON.parse(JSON.stringify(syncedProfile))
      if (!profile.value.custom_fields) {
        profile.value.custom_fields = {}
      }
    }

    // 2. Fetch Admin required dynamic fields
    const { data: fieldData } = await supabase.from('dynamic_fields').select('*')
    if (fieldData) {
      dynamicFields.value = fieldData
    }

    // 3. Fetch User Permissions
    const { data: permissionData } = await supabase
      .from('page_access')
      .select('page_identifier')
      .eq('user_id', authUser.id)
    
    if (permissionData) {
      userPermissions.value = permissionData.map(p => p.page_identifier)
    }

    setupInactivityListeners()

  } catch (err) {
    console.error('Error loading profile:', err)
  } finally {
    pageLoading.value = false
  }
})

onUnmounted(() => {
  removeInactivityListeners()
})

async function updateProfile() {
  saving.value = true
  statusMsg.value = ''
  errorMsg.value = ''
  
  try {
    const authUser = user.value
    if (!authUser) throw new Error('Not logged in')

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.value.full_name,
        company: profile.value.company,
        custom_fields: profile.value.custom_fields,
      })
      .eq('id', user.value.id)

    if (error) throw error
    
    statusMsg.value = 'Profile updated successfully!'
    setTimeout(() => { statusMsg.value = '' }, 3000)

  } catch (err) {
    errorMsg.value = err.message || 'Failed to update profile.'
  } finally {
    saving.value = false
  }
}

async function handleLogout() {
  try {
    await supabase.auth.signOut()
  } catch {
    // Swallow errors — redirect regardless
  } finally {
    router.push('/login').catch(() => {
      window.location.href = '/login'
    })
  }
}
</script>
