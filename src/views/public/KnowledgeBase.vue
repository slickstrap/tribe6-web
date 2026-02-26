<template>
  <div class="min-h-screen bg-slate-900 text-slate-200">
    <Navbar />
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh]">
      <Breadcrumbs />
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          <span class="brand-text">Kino Tribe6 Hub</span>
        </h1>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto">Master the platform with reading material, instructions, and standard operating procedures designed to maximize your efficiency.</p>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
      </div>

      <div v-else-if="Object.keys(groupedArticles).length === 0" class="text-center py-20 border border-slate-700/50 bg-slate-800/20 rounded-2xl">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">Check back soon</h3>
        <p class="text-slate-400">Our team is currently preparing the documentation.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative items-start">
        
        <!-- Table of Contents Sidebar -->
        <div class="md:col-span-1 md:sticky md:top-24 space-y-8 pb-8 md:pb-0">
          <div v-for="(articles, category) in groupedArticles" :key="category">
            <h3 class="font-bold text-white uppercase tracking-wider text-xs mb-3 text-slate-400">{{ category }}</h3>
            <ul class="space-y-2 border-l border-slate-700/50 ml-1.5 pl-4">
              <li v-for="article in articles" :key="article.id">
                <button 
                  @click="scrollToArticle(article.id)"
                  class="text-sm text-left w-full transition font-medium"
                  :class="activeArticleId === article.id ? 'text-electric-blue translate-x-1' : 'text-slate-400 hover:text-slate-200'"
                >
                  {{ article.title }}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Main Content Area (Reading Zone) -->
        <div class="md:col-span-3 space-y-24 pb-32">
          <div v-for="(articles, category) in groupedArticles" :key="category" class="space-y-24">
            
            <article 
              v-for="article in articles" :key="article.id" 
              :id="`article-${article.id}`"
              class="scroll-mt-24"
            >
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">{{ article.title }}</h2>
              <div class="flex items-center gap-3 mb-8">
                <span class="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">{{ article.category }}</span>
                <span class="text-xs text-slate-500 tracking-wider font-mono">Last Updated: {{ new Date(article.updated_at).toLocaleDateString() }}</span>
              </div>
              
              <!-- Markdown Content -> HTML Render Placeholder -->
              <!-- In a real prod Vue app, we would use a library like marked.js or DOMPurify, 
                   but to keep dependencies low for this scope, a pre-format CSS approach is used to render text safely -->
              <div class="prose prose-invert prose-blue max-w-none text-slate-300 leading-loose prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700">
                <pre class="bg-transparent border-none p-0 !whitespace-pre-wrap !font-sans !text-[15px] !leading-relaxed text-slate-300">{{ article.content_markdown }}</pre>
              </div>
              
              <div class="mt-12 pt-8 border-t border-slate-800/50 flex items-center justify-between">
                <span class="text-slate-500 text-sm">Was this helpful?</span>
                <div class="flex gap-2">
                  <button class="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition flex items-center justify-center">👍</button>
                  <button class="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition flex items-center justify-center">👎</button>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { supabase } from '../../supabase'
import Navbar from '../../components/Navbar.vue'
import AppFooter from '../../components/AppFooter.vue'
import Breadcrumbs from '../../components/Breadcrumbs.vue'

const loading = ref(true)
const rawArticles = ref([])
const activeArticleId = ref(null)

onMounted(async () => {
  await fetchArticles()
  setupScrollListener()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

async function fetchArticles() {
  const { data, error } = await supabase
    .from('knowledge_articles')
    .select('*')
    .eq('is_active', true)
    // Order by category alphabetically, then newest first
    .order('category', { ascending: true })
    .order('updated_at', { ascending: false })
    
  if (!error && data) {
    rawArticles.value = data
    if (data.length > 0) activeArticleId.value = data[0].id
  }
  loading.value = false
}

// Group articles by Category for rendering
const groupedArticles = computed(() => {
  const groups = {}
  rawArticles.value.forEach(article => {
    const cat = article.category || 'General'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(article)
  })
  return groups
})

function scrollToArticle(id) {
  const el = document.getElementById(`article-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeArticleId.value = id
  }
}

// Simple intersection observer logical equivalent to highlight TOC on scroll
function handleScroll() {
  const scrollPosition = window.scrollY + 150 // offset for header
  
  for (const article of rawArticles.value) {
    const el = document.getElementById(`article-${article.id}`)
    if (el && el.offsetTop <= scrollPosition && (el.offsetTop + el.offsetHeight) > scrollPosition) {
      activeArticleId.value = article.id
      break
    }
  }
}

function setupScrollListener() {
  window.addEventListener('scroll', handleScroll, { passive: true })
}
</script>

<style scoped>
/* Scoped overrides to make raw markdown <pre> text look like native paragraphs */
.prose pre {
  margin: 0;
  border-radius: 0;
  font-family: inherit;
}
</style>
