<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
    <!-- Pending Review Card -->
    <div 
      v-if="submitted"
      class="max-w-md w-full bg-slate-800 rounded-xl p-10 border border-slate-700 shadow-2xl text-center space-y-5"
    >
      <div class="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20">
        <svg class="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white">Verification Required</h2>
      <p class="text-slate-400 leading-relaxed">
        We've sent a verification link to <span class="text-white font-medium">{{ form.email }}</span>.
      </p>
      <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-sm text-amber-200">
        <p>After verifying your email, your account will be <span class="font-bold">pending admin approval</span>. You will receive a final confirmation once full access is granted.</p>
      </div>
      <router-link to="/" class="inline-block mt-4 bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg text-white transition">
        Return to Home
      </router-link>
    </div>

    <!-- Registration Form -->
    <div v-else class="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl relative">
      <router-link to="/" class="absolute top-6 right-6 text-slate-500 hover:text-slate-300 transition" title="Return to Home">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </router-link>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Join <span class="brand-text">Tribe6</span></h1>
        <p class="text-slate-400 mt-2">Create your account to request access</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Username</label>
          <input v-model="form.username" type="text" required
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
          <input v-model="form.full_name" type="text" required
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Company</label>
            <input v-model="form.company" type="text"
              class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input v-model="form.email" type="email" required
              class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-1">Password</label>
          <input v-model="password" type="password" required minlength="8"
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
        </div>

        <!-- Dynamic Mandatory Fields -->
        <div v-for="field in dynamicFields" :key="field.id">
          <label class="block text-sm font-medium text-slate-300 mb-1">
            {{ field.label }} <span v-if="field.is_mandatory" class="text-rose-500">*</span>
          </label>
          <input v-if="field.type === 'text'"
            v-model="customFields[field.field_name]" type="text" :required="field.is_mandatory"
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition"/>
          <select v-else-if="field.type === 'select'"
            v-model="customFields[field.field_name]" :required="field.is_mandatory"
            class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 focus:ring-2 focus:ring-electric-blue outline-none transition">
            <option value="" disabled>Select an option</option>
            <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>

        <!-- Restriction notice -->
        <div class="flex items-start gap-2 bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-xs text-slate-400">
          <svg class="w-4 h-4 text-amber-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>By continuing, you understand that your account will require <strong class="text-slate-300">administrative approval</strong> before full access is granted.</span>
        </div>

        <div v-if="error" class="bg-rose-500/10 text-rose-400 p-3 rounded text-sm text-center border border-rose-500/20">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-2.5 rounded-md transition disabled:opacity-50 mt-6">
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-slate-400">
        Already have an account? 
        <router-link to="/login" class="text-electric-blue hover:underline">Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'

const form = ref({ username: '', full_name: '', company: '', email: '' })
const password = ref('')
const customFields = ref({})
const dynamicFields = ref([])
const loading = ref(false)
const error = ref('')
const submitted = ref(false)

onMounted(async () => {
  try {
    const { data } = await supabase.from('dynamic_fields').select('*')
    if (data) dynamicFields.value = data
  } catch (err) {
    console.error('Failed to load dynamic fields', err)
  }
})

async function handleRegister() {
  loading.value = true
  error.value = ''
  
  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: form.value.email,
      password: password.value,
      options: {
        data: {
          username: form.value.username,
          full_name: form.value.full_name,
          company: form.value.company,
          custom_fields: customFields.value
        }
      }
    })

    if (signUpError) throw signUpError

    submitted.value = true
    
  } catch (err) {
    console.error('Registration: Error:', err)
    error.value = err.message || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
