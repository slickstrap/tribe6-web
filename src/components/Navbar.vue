<template>
  <nav
    class="tribe-nav"
    :class="{ 'tribe-nav--scrolled': scrolled }"
  >
    <div class="tribe-nav__inner">
      <!-- ── Brand ── -->
      <div class="tribe-nav__brand" @click="handleSwitch('cosmetics', 1)">
        <span class="tribe-nav__logo-text">Tribe6</span>
      </div>

      <!-- ── Desktop links ── -->
      <div class="tribe-nav__links">

        <!-- Cosmetics dropdown -->
        <div
          class="tribe-nav__item"
          @mouseenter="openDropdown('cosmetics')"
          @mouseleave="closeDropdown('cosmetics')"
        >
          <button
            class="tribe-nav__btn"
            :class="{ 'tribe-nav__btn--active': activeNiche === 'cosmetics' && activePage === 'portfolio' }"
            @click="toggleDropdown('cosmetics')"
          >
            <span class="tribe-nav__dot tribe-nav__dot--rose"></span>
            Canadian Cosmetics
            <svg class="tribe-nav__chevron" :class="{ 'tribe-nav__chevron--open': openMenu === 'cosmetics' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <Transition name="drop">
            <div v-if="openMenu === 'cosmetics'" class="tribe-nav__dropdown tribe-nav__dropdown--rose">
              <button
                v-for="n in 3"
                :key="n"
                class="tribe-nav__drop-item"
                :class="{ 'tribe-nav__drop-item--active': activeNiche === 'cosmetics' && activeSample === n }"
                @click="handleSwitch('cosmetics', n)"
              >
                <span class="tribe-nav__dot tribe-nav__dot--rose"></span>
                {{ cosmeticsLabels[n - 1] }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Cleaning dropdown -->
        <div
          class="tribe-nav__item"
          @mouseenter="openDropdown('cleaning')"
          @mouseleave="closeDropdown('cleaning')"
        >
          <button
            class="tribe-nav__btn"
            :class="{ 'tribe-nav__btn--active': activeNiche === 'cleaning' && activePage === 'portfolio' }"
            @click="toggleDropdown('cleaning')"
          >
            <span class="tribe-nav__dot tribe-nav__dot--sky"></span>
            Australian Cleaning
            <svg class="tribe-nav__chevron" :class="{ 'tribe-nav__chevron--open': openMenu === 'cleaning' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <Transition name="drop">
            <div v-if="openMenu === 'cleaning'" class="tribe-nav__dropdown tribe-nav__dropdown--sky">
              <button
                v-for="n in 3"
                :key="n"
                class="tribe-nav__drop-item"
                :class="{ 'tribe-nav__drop-item--active': activeNiche === 'cleaning' && activeSample === n }"
                @click="handleSwitch('cleaning', n)"
              >
                <span class="tribe-nav__dot tribe-nav__dot--sky"></span>
                {{ cleaningLabels[n - 1] }}
              </button>
            </div>
          </Transition>
        </div>

      </div>

      <!-- ── Mobile hamburger ── -->
      <button
        class="tribe-nav__hamburger"
        @click="mobileOpen = !mobileOpen"
        aria-label="Open menu"
      >
        <svg v-if="!mobileOpen" class="tribe-nav__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="tribe-nav__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- ── Mobile menu ── -->
    <Transition name="drop">
      <div v-if="mobileOpen" class="tribe-nav__mobile">
        <p class="tribe-nav__mobile-label">Canadian Cosmetics</p>
        <button
          v-for="n in 3"
          :key="`mc${n}`"
          class="tribe-nav__mobile-item"
          :class="{ 'tribe-nav__mobile-item--active': activeNiche === 'cosmetics' && activeSample === n }"
          @click="handleSwitch('cosmetics', n)"
        >
          <span class="tribe-nav__dot tribe-nav__dot--rose"></span>
          {{ cosmeticsLabels[n - 1] }}
        </button>

        <p class="tribe-nav__mobile-label" style="margin-top:1rem">Australian Cleaning</p>
        <button
          v-for="n in 3"
          :key="`mcl${n}`"
          class="tribe-nav__mobile-item"
          :class="{ 'tribe-nav__mobile-item--active': activeNiche === 'cleaning' && activeSample === n }"
          @click="handleSwitch('cleaning', n)"
        >
          <span class="tribe-nav__dot tribe-nav__dot--sky"></span>
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
const cleaningLabels  = ['Cleanworks Adelaide', 'MY HOME Cleaning', 'BrightTouch Specialist']

const openMenu   = ref(null)
const mobileOpen = ref(false)
const scrolled   = ref(false)

function openDropdown(menu)  { openMenu.value = menu }
function closeDropdown(menu) { if (openMenu.value === menu) openMenu.value = null }
function toggleDropdown(menu){ openMenu.value = openMenu.value === menu ? null : menu }

function handleSwitch(niche, sample) {
  emit('switch', { niche, sample })
  openMenu.value   = null
  mobileOpen.value = false
}

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(()   => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ── Base nav ── */
.tribe-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  background: #0d0d1a;
  border-bottom: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 2px 32px rgba(0,0,0,0.55);
  transition: background 0.3s, box-shadow 0.3s;
}
/* Gradient border on bottom using pseudo element */
.tribe-nav::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #a855f7, #f59e0b, #ec4899, #6366f1);
  opacity: 0.85;
}
.tribe-nav--scrolled {
  background: #07071280;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 40px rgba(0,0,0,0.7);
}

/* ── Inner layout ── */
.tribe-nav__inner {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

/* ── Brand ── */
.tribe-nav__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
}
.tribe-nav__logo-text {
  font-family: 'Pacifico', cursive;
  font-size: 1.55rem;
  color: #fff;
  line-height: 1;
  background: linear-gradient(135deg, #e2c4ff 0%, #f8d58b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  transition: filter 0.2s;
}
.tribe-nav__brand:hover .tribe-nav__logo-text {
  filter: brightness(1.15);
}

/* ── Desktop links ── */
.tribe-nav__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
@media (max-width: 767px) {
  .tribe-nav__links { display: none; }
}

/* ── Nav item (wrapper for dropdown) ── */
.tribe-nav__item {
  position: relative;
}

/* ── Nav buttons ── */
.tribe-nav__btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: rgba(255,255,255,0.78);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
  white-space: nowrap;
}
.tribe-nav__btn:hover {
  color: #fff;
  background: rgba(255,255,255,0.09);
}
.tribe-nav__btn--active {
  color: #fff !important;
  background: rgba(168,85,247,0.22) !important;
  box-shadow: 0 0 0 1px rgba(168,85,247,0.45);
}


/* ── Dots ── */
.tribe-nav__dot {
  display: inline-block;
  width: 7px; height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.tribe-nav__dot--rose { background: #fda4af; }
.tribe-nav__dot--sky  { background: #38bdf8; }

/* ── Chevron ── */
.tribe-nav__chevron {
  width: 14px; height: 14px;
  transition: transform 0.2s;
}
.tribe-nav__chevron--open { transform: rotate(180deg); }

/* ── Generic icon ── */
.tribe-nav__icon { width: 16px; height: 16px; }

/* ── Dropdown ── */
.tribe-nav__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 210px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 100;
}
.tribe-nav__dropdown--rose {
  background: rgba(45, 7, 7, 0.95);
  backdrop-filter: blur(24px);
}
.tribe-nav__dropdown--sky {
  background: rgba(4, 20, 44, 0.95);
  backdrop-filter: blur(24px);
}

.tribe-nav__drop-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  color: rgba(255,255,255,0.85);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.tribe-nav__drop-item:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}
.tribe-nav__drop-item--active {
  background: rgba(255,255,255,0.13);
  font-weight: 600;
  color: #fff;
}

/* ── Hamburger ── */
.tribe-nav__hamburger {
  display: none;
  padding: 0.5rem;
  color: #fff;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.tribe-nav__hamburger:hover { background: rgba(255,255,255,0.15); }
@media (max-width: 767px) {
  .tribe-nav__hamburger { display: flex; }
}

/* ── Mobile menu ── */
.tribe-nav__mobile {
  background: #0d0d1a;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 1rem 1.25rem;
}
.tribe-nav__mobile-label {
  font-size: 0.7rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  padding: 0 0.5rem 0.5rem;
}
.tribe-nav__mobile-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  text-align: left;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  color: rgba(255,255,255,0.78);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.tribe-nav__mobile-item:hover,
.tribe-nav__mobile-item--active {
  background: rgba(255,255,255,0.08);
  color: #fff;
}

/* ── Dropdown animation ── */
.drop-enter-active { animation: dropDown 0.2s ease-out; }
.drop-leave-active { animation: dropDown 0.15s ease-in reverse; }
@keyframes dropDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
