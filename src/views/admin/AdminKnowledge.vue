<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs />
      
      <!-- Header -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="text-left">
          <h1 class="text-3xl font-bold tracking-tight text-white">Content Hub</h1>
          <p class="text-slate-400 mt-1">Create and manage internal documentation and training articles</p>
        </div>
        
        
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
        
        <!-- Sidebar: Articles List -->
        <div class="lg:col-span-1 border border-slate-700 bg-slate-800/50 rounded-xl overflow-hidden flex flex-col h-full">
          <div class="p-4 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
            <h2 class="font-semibold text-lg text-white">Articles</h2>
            <button 
              @click="createNewArticle"
              class="bg-electric-blue/20 text-electric-blue hover:bg-electric-blue hover:text-white border border-electric-blue/50 px-2 py-1 rounded text-xs font-medium transition"
            >
              + New
            </button>
          </div>
          
          <div class="p-3 border-b border-slate-700/50">
             <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search titles..." 
              class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-electric-blue outline-none"
            />
          </div>

          <div v-if="loading" class="flex-1 flex justify-center py-10">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-electric-blue"></div>
          </div>
          
          <div v-else class="overflow-y-auto flex-1 p-2 space-y-1">
            <button
              v-for="article in filteredArticles" :key="article.id"
              @click="selectArticle(article)"
              class="w-full text-left p-3 rounded-lg transition flex items-start gap-3"
              :class="selectedArticle?.id === article.id ? 'bg-electric-blue/20 border border-electric-blue/50' : 'hover:bg-slate-700/50 border border-transparent'"
            >
              <div 
                class="shrink-0 mt-1 h-2 w-2 rounded-full"
                :class="article.is_active ? 'bg-emerald-400' : 'bg-slate-600'"
              ></div>
              <div class="overflow-hidden">
                <div class="font-medium text-sm truncate text-white" :class="{'opacity-50': !article.is_active}">{{ article.title || 'Untitled Article' }}</div>
                <div class="text-xs text-slate-400 truncate mt-0.5">{{ article.category || 'Uncategorized' }}</div>
              </div>
            </button>
            
            <div v-if="filteredArticles.length === 0" class="p-4 text-center text-sm text-slate-500">
              No articles found.
            </div>
          </div>
        </div>

        <!-- Editor Area -->
        <div class="lg:col-span-2 border border-slate-700 bg-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
          
          <div v-if="!selectedArticle" class="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
             <svg class="w-16 h-16 mb-4 opacity-50 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <p>Select an article to edit its contents, or create a brand new one.</p>
          </div>
          
          <template v-else>
            <!-- Editor Top Bar -->
            <div class="p-4 border-b border-slate-700 bg-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Article Title</label>
                <input 
                  v-model="editorData.title" 
                  type="text" 
                  class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 focus:ring-1 focus:ring-electric-blue outline-none font-semibold text-white"
                />
              </div>
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <input 
                    v-model="editorData.category" 
                    type="text" 
                    placeholder="e.g. Getting Started"
                    class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 focus:ring-1 focus:ring-electric-blue outline-none text-sm"
                  />
                </div>
                <div class="flex items-end pb-1.5">
                  <label class="flex items-center gap-2 cursor-pointer bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-800 transition">
                    <input 
                      type="checkbox" 
                      v-model="editorData.is_active"
                      class="h-4 w-4 rounded border-slate-600 bg-slate-700 text-electric-blue focus:ring-electric-blue focus:ring-offset-slate-800"
                    />
                    <span class="text-sm font-medium" :class="editorData.is_active ? 'text-emerald-400' : 'text-slate-400'">Published</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Editor Body -->
            <div class="flex-1 overflow-hidden flex flex-col relative bg-slate-900">
              <textarea 
                v-model="editorData.content_markdown" 
                class="flex-1 w-full bg-transparent border-none resize-none px-6 py-6 font-mono text-sm text-slate-300 outline-none leading-relaxed"
                placeholder="# Write your markdown content here..."
              ></textarea>
            </div>

            <!-- Editor Footer Toolbar -->
            <div class="p-4 border-t border-slate-700 bg-slate-800 flex z-10 items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.2)]">
               <button 
                v-if="selectedArticle.id !== 'draft'"
                @click="deleteArticle"
                class="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-sm font-medium px-4 py-2 rounded transition border border-transparent hover:border-rose-500/20"
              >
                Delete Article
              </button>
              <div v-else></div> <!-- Spacer -->
              
              <div class="flex items-center gap-4">
                <span class="text-xs" :class="saveStatus.includes('Error') ? 'text-rose-400' : 'text-emerald-400'">{{ saveStatus }}</span>
                <button 
                  @click="saveArticle" 
                  :disabled="saving"
                  class="bg-electric-blue hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition disabled:opacity-50 border border-blue-500"
                >
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </template>

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
const articles = ref([])
const searchQuery = ref('')
const selectedArticle = ref(null)

const saving = ref(false)
const saveStatus = ref('')

// Temporary state linking exactly to what's in the text boxes
const editorData = ref({
  title: '',
  category: '',
  content_markdown: '',
  is_active: false
})

const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles.value
  const q = searchQuery.value.toLowerCase()
  return articles.value.filter(a => 
    (a.title || '').toLowerCase().includes(q) || 
    (a.category || '').toLowerCase().includes(q)
  )
})

onMounted(async () => {
  await fetchArticles()
  loading.value = false
})

async function fetchArticles() {
  const { data, error } = await supabase
    .from('knowledge_articles')
    .select('id, title, category, is_active, updated_at')
    .order('updated_at', { ascending: false })
    
  if (!error && data) {
    articles.value = data
  }
}

async function selectArticle(articleMeta) {
  saveStatus.value = ''
  
  if (articleMeta.id === 'draft') {
    selectedArticle.value = articleMeta
    editorData.value = { title: '', category: '', content_markdown: '', is_active: false }
    return
  }

  // Fetch full content including heavy markdown
  const { data, error } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('id', articleMeta.id)
    .single()
    
  if (!error && data) {
    selectedArticle.value = data
    editorData.value = { ...data }
  }
}

function createNewArticle() {
  const draft = { id: 'draft', title: 'New Article', category: '', is_active: false }
  articles.value.unshift(draft)
  selectArticle(draft)
}

async function saveArticle() {
  if (!editorData.value.title) {
    saveStatus.value = 'Error: Title is required.'
    return
  }
  
  saving.value = true
  saveStatus.value = ''
  
  const payload = {
    title: editorData.value.title,
    category: editorData.value.category || 'General',
    content_markdown: editorData.value.content_markdown,
    is_active: editorData.value.is_active,
    updated_at: new Date().toISOString()
  }

  try {
    if (selectedArticle.value.id === 'draft') {
      // Insert
      const { data, error } = await supabase.from('knowledge_articles').insert([payload]).select()
      if (error) throw error
      
      saveStatus.value = 'Article published!'
      await fetchArticles() // Reload side menu
      if (data && data[0]) selectArticle({ id: data[0].id }) // Reselect it
      
    } else {
      // Update
      const { error } = await supabase
        .from('knowledge_articles')
        .update(payload)
        .eq('id', selectedArticle.value.id)
        
      if (error) throw error
      saveStatus.value = 'Changes saved.'
      await fetchArticles()
    }
  } catch (err) {
    saveStatus.value = 'Error: ' + err.message
  } finally {
    saving.value = false
    setTimeout(() => { if (saveStatus.value.includes('saved') || saveStatus.value.includes('published')) saveStatus.value = '' }, 3000)
  }
}

async function deleteArticle() {
  if (!selectedArticle.value || selectedArticle.value.id === 'draft') return
  
  if (confirm(`Are you sure you want to delete "${selectedArticle.value.title}"? This cannot be undone.`)) {
    const { error } = await supabase.from('knowledge_articles').delete().eq('id', selectedArticle.value.id)
    if (!error) {
      selectedArticle.value = null
      await fetchArticles()
    } else {
      alert('Failed to delete: ' + error.message)
    }
  }
}
</script>
