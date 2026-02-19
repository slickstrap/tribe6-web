<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-slate-900 shadow-lg' : 'bg-slate-800'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand Logo -->
        <div class="flex items-center gap-2 cursor-pointer" @click="handleSwitch('cosmetics', 1)">
          <div class="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <span class="text-white font-bold text-sm tracking-tight">T6</span>
          </div>
          <span class="text-white font-semibold text-lg tracking-wide">Tribe6</span>
        </div>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <!-- Cosmetics Dropdown -->
          <div class="relative" @mouseenter="openDropdown('cosmetics')" @mouseleave="closeDropdown('cosmetics')">
            <button
              class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              :class="activeNiche === 'cosmetics'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:text-white hover:bg-white/10'"
              @click="toggleDropdown('cosmetics')"
            >
              <span class="w-2 h-2 rounded-full bg-rose-300 inline-block"></span>
              Canadian Cosmetics
              <svg class="w-4 h-4 transition-transform duration-200" :class="openMenu === 'cosmetics' ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <Transition name="slide-down">
              <div
                v-if="openMenu === 'cosmetics'"
                class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-xl border border-white/10"
                style="background: rgba(69,10,10,0.92); backdrop-filter: blur(20px);"
              >
                <button
                  v-for="n in 3"
                  :key="n"
                  class="w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors flex items-center gap-3"
                  :class="activeNiche === 'cosmetics' && activeSample === n ? 'bg-white/15 font-semibold' : ''"
                  @click="handleSwitch('cosmetics', n)"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-300"></span>
                  {{ cosmeticsLabels[n - 1] }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Cleaning Dropdown -->
          <div class="relative" @mouseenter="openDropdown('cleaning')" @mouseleave="closeDropdown('cleaning')">
            <button
              class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              :class="activeNiche === 'cleaning'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:text-white hover:bg-white/10'"
              @click="toggleDropdown('cleaning')"
            >
              <span class="w-2 h-2 rounded-full bg-sky-300 inline-block"></span>
              Australian Cleaning
              <svg class="w-4 h-4 transition-transform duration-200" :class="openMenu === 'cleaning' ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <Transition name="slide-down">
              <div
                v-if="openMenu === 'cleaning'"
                class="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-xl border border-white/10"
                style="background: rgba(15,23,42,0.92); backdrop-filter: blur(20px);"
              >
                <button
                  v-for="n in 3"
                  :key="n"
                  class="w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors flex items-center gap-3"
                  :class="activeNiche === 'cleaning' && activeSample === n ? 'bg-white/15 font-semibold' : ''"
                  @click="handleSwitch('cleaning', n)"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
                  {{ cleaningLabels[n - 1] }}
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          @click="mobileOpen = !mobileOpen"
          aria-label="Open menu"
        >
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-white/10 px-4 py-4 space-y-1"
        style="background: rgba(15,23,42,0.97); backdrop-filter: blur(20px);"
      >
        <p class="text-white/50 text-xs font-semibold uppercase tracking-widest px-3 pb-2">Canadian Cosmetics</p>
        <button
          v-for="n in 3"
          :key="`c${n}`"
          class="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
          :class="activeNiche === 'cosmetics' && activeSample === n ? 'bg-white/10 text-white font-medium' : ''"
          @click="handleSwitch('cosmetics', n)"
        >
          <span class="w-2 h-2 rounded-full bg-rose-300"></span>
          {{ cosmeticsLabels[n - 1] }}
        </button>

        <p class="text-white/50 text-xs font-semibold uppercase tracking-widest px-3 pb-2 pt-4">Australian Cleaning</p>
        <button
          v-for="n in 3"
          :key="`cl${n}`"
          class="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-3"
          :class="activeNiche === 'cleaning' && activeSample === n ? 'bg-white/10 text-white font-medium' : ''"
          @click="handleSwitch('cleaning', n)"
        >
          <span class="w-2 h-2 rounded-full bg-sky-300"></span>
          {{ cleaningLabels[n - 1] }}
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  activeNiche: String,
  activeSample: Number,
})
const emit = defineEmits(['switch'])

const cosmeticsLabels = ['Maison Éclat', 'Pure North Beauty', 'Velour & Co.']
const cleaningLabels = ['Brightside Clean Co.', 'Coastal Clear', 'ProShine Services']

const openMenu = ref(null)
const mobileOpen = ref(false)
const scrolled = ref(false)

function openDropdown(menu) {
  openMenu.value = menu
}
function closeDropdown(menu) {
  if (openMenu.value === menu) openMenu.value = null
}
function toggleDropdown(menu) {
  openMenu.value = openMenu.value === menu ? null : menu
}
function handleSwitch(niche, sample) {
  emit('switch', { niche, sample })
  openMenu.value = null
  mobileOpen.value = false
}

function onScroll() {
  scrolled.value = window.scrollY > 20
}
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.slide-down-enter-active { animation: slideDown 0.2s ease-out; }
.slide-down-leave-active { animation: slideDown 0.15s ease-in reverse; }
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
