<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold tracking-tight text-white">Dynamic Schema</h1>
          <p class="text-slate-400 mt-1">Configure profile data extensions and custom identity attributes</p>
        </div>
        
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Add Field Form -->
        <div class="lg:col-span-1 border border-slate-700 bg-slate-800 rounded-xl p-6 h-fit">
          <h2 class="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Add New Field</h2>
          
          <form @submit.prevent="addField" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Field Label</label>
              <input 
                v-model="newField.label" 
                type="text" 
                required 
                placeholder="e.g. Phone Number"
                class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none" 
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Database Key Name</label>
              <input 
                v-model="databaseKeyName" 
                type="text" 
                readonly
                disabled
                class="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-sm text-slate-500 font-mono cursor-not-allowed" 
              />
              <p class="text-xs text-slate-500 mt-1">Auto-generated from label.</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-400 mb-1">Input Type</label>
              <select 
                v-model="newField.type" 
                class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none"
              >
                <option value="text">Text (Short Answer)</option>
                <option value="select">Dropdown (Select)</option>
              </select>
            </div>
            
            <div v-if="newField.type === 'select'" class="space-y-2">
              <label class="block text-sm font-medium text-slate-400 mb-1">Options (Comma separated)</label>
              <input 
                v-model="newField.optionsRaw" 
                type="text" 
                required 
                placeholder="e.g. Director, Manager, Staff"
                class="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-electric-blue outline-none" 
              />
            </div>

            <div class="pt-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="newField.is_mandatory"
                  class="h-4 w-4 rounded border-slate-600 bg-slate-700 text-electric-blue focus:ring-electric-blue focus:ring-offset-slate-800"
                />
                <span class="text-sm text-slate-300">Mandatory (Required for registration)</span>
              </label>
            </div>
            
            <button 
              type="submit" 
              :disabled="adding"
              class="w-full bg-electric-blue hover:bg-blue-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50 mt-4"
            >
              {{ adding ? 'Adding...' : 'Save Field' }}
            </button>
            <div v-if="addError" class="text-xs text-rose-400 text-center mt-2">{{ addError }}</div>
          </form>
        </div>

        <!-- Active Fields List -->
        <div class="lg:col-span-2 border border-slate-700 bg-slate-800 rounded-xl flex flex-col">
          <div class="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white">Active Global Fields</h2>
            <span class="text-sm text-slate-400">{{ fields.length }} fields configured</span>
          </div>
          
          <div v-if="loading" class="flex-1 flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue"></div>
          </div>
          
          <div v-else-if="fields.length === 0" class="flex-1 flex flex-col items-center justify-center py-16 text-slate-500">
            <svg class="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p>No dynamic fields added yet.</p>
          </div>

          <div v-else class="flex-1 p-6 space-y-4">
            <div v-for="field in fields" :key="field.id" class="bg-slate-900 border border-slate-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-bold text-white">{{ field.label }}</h3>
                  <span v-if="field.is_mandatory" class="bg-rose-500/10 text-rose-400 text-xs px-2 py-0.5 rounded-full border border-rose-500/20">Required</span>
                </div>
                <div class="text-sm font-mono text-slate-500 mt-1">Key: {{ field.field_name }} &bull; Type: {{ field.type }}</div>
                
                <div v-if="field.type === 'select'" class="mt-2 text-xs flex flex-wrap gap-1">
                  <span v-for="opt in field.options" :key="opt" class="bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    {{ opt }}
                  </span>
                </div>
              </div>
              
              <button 
                @click="deleteField(field.id)"
                class="text-rose-400 hover:text-rose-300 text-sm font-medium px-3 py-1.5 rounded hover:bg-rose-500/10 transition shrink-0"
              >
                Remove
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

const fields = ref([])
const loading = ref(true)
const adding = ref(false)
const addError = ref('')

const newField = ref({
  label: '',
  type: 'text',
  is_mandatory: false,
  optionsRaw: ''
})

const databaseKeyName = computed(() => {
  return newField.value.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/(^_|_$)/g, '')
})

onMounted(async () => {
  await loadFields()
})

async function loadFields() {
  loading.value = true
  const { data, error } = await supabase.from('dynamic_fields').select('*').order('created_at', { ascending: true })
  if (!error && data) {
    fields.value = data
  }
  loading.value = false
}

async function addField() {
  if (!newField.value.label.trim() || !databaseKeyName.value) return
  
  adding.value = true
  addError.value = ''
  
  try {
    const payload = {
      field_name: databaseKeyName.value,
      label: newField.value.label,
      type: newField.value.type,
      is_mandatory: newField.value.is_mandatory,
      options: newField.value.type === 'select' ? newField.value.optionsRaw.split(',').map(s => s.trim()).filter(s => s) : []
    }
    
    const { error } = await supabase.from('dynamic_fields').insert([payload])
    
    if (error) {
      if (error.code === '23505') throw new Error('A field with this name already exists.')
      throw error
    }
    
    newField.value = { label: '', type: 'text', is_mandatory: false, optionsRaw: '' }
    await loadFields()
    
  } catch (err) {
    addError.value = err.message
  } finally {
    adding.value = false
  }
}

async function deleteField(id) {
  if (confirm('Are you sure you want to delete this field? Profiles holding this data will still retain their JSON values, but the field will no longer appear on forms.')) {
    await supabase.from('dynamic_fields').delete().eq('id', id)
    await loadFields()
  }
}
</script>
