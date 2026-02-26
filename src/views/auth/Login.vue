<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
    <div class="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl">
      <div class="text-center mb-8 relative">
        <router-link to="/" class="absolute -top-4 -right-2 text-slate-500 hover:text-slate-300 transition" title="Return to Home">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </router-link>
        <h1 class="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
        <p class="text-slate-400 mt-2">Log in to your <span class="brand-text">Tribe6</span> Command Center</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
          <input v-model="email" type="email" required
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input v-model="password" type="password" required
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
        </div>

        <div v-if="error" class="bg-rose-500/10 text-rose-400 p-3 rounded text-sm text-center border border-rose-500/20">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-2.5 rounded-md transition disabled:opacity-50 mt-6">
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-slate-400">
        Don't have an account? 
        <router-link to="/register" class="text-electric-blue hover:underline">Register here</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../supabase'
import { useAuth } from '../../composables/useAuthSync'

const router = useRouter()
const { checkSession, session } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  console.log('Login: v2.1.0 Mounted')
  await checkSession()
  if (session.value) {
    router.push('/profile')
  }
})

async function handleLogin() {
  loading.value = true
  error.value = ''
  
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (signInError) throw signInError

    // Users only exist in auth AFTER admin approval (via invite).
    // No extra approval_status check needed here.
    router.push('/profile')
    
  } catch (err) {
    console.error('Login: Error:', err)
    error.value = err.message || 'Invalid login credentials.'
  } finally {
    loading.value = false
  }
}
</script>
