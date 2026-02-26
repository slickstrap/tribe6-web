<template>
  <nav v-if="breadcrumbs.length > 0" class="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap" aria-label="Breadcrumb">
    <div class="flex items-center gap-2">
      <router-link 
        :to="homeLink" 
        class="hover:text-electric-blue transition-colors flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>{{ homeLabel }}</span>
      </router-link>
      <svg v-if="breadcrumbs.length > 0" class="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <div v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center gap-2">
      <router-link 
        v-if="index < breadcrumbs.length - 1" 
        :to="crumb.path"
        class="hover:text-electric-blue transition-colors"
      >
        {{ crumb.label }}
      </router-link>
      <span v-else class="text-white font-medium">
        {{ crumb.label }}
      </span>

      <svg v-if="index < breadcrumbs.length - 1" class="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'

const route = useRoute()
const isAuthenticated = ref(false)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isAuthenticated.value = !!session
  
  supabase.auth.onAuthStateChange((_event, session) => {
    isAuthenticated.value = !!session
  })
})

const homeLink = computed(() => isAuthenticated.value ? '/profile' : '/')
const homeLabel = computed(() => isAuthenticated.value ? 'Portal Home' : 'Home')

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(p => p !== '')
  const crumbs = []
  let fullPath = ''

  const labelMap = {
    'command-center': 'Command Center',
    'security': 'Security Guard',
    'schema': 'Dynamic Schema',
    'firewall': 'Geo Shield',
    'content': 'Knowledge Base',
    'updates': 'System Updates',
    'seo': 'SEO Guard',
    'sample': 'Samples',
    'cosmetics': 'Cosmetics',
    'cleaning': 'Cleaning',
    'case-study': 'Case Studies',
    'profile': 'My Profile'
  }

  paths.forEach((path) => {
    fullPath += `/${path}`
    crumbs.push({
      label: labelMap[path] || path.charAt(0).toUpperCase() + path.slice(1),
      path: fullPath
    })
  })

  // If we are on profile, the "Portal Home" is enough
  if (route.path === '/profile') return []

  return crumbs
})
</script>
