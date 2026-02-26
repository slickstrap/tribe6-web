<template>
  <div class="min-h-screen">
    <Navbar
      :active-niche="activeNiche"
      :active-sample="activeSample"
      :currentPage="currentPage"
      @switch="handleSwitch"
      @go-home="goHome"
      @go-case-study="goCaseStudy"
    />

    <Transition name="fade" mode="out-in">
      <Portfolio v-if="currentPage === 'portfolio'" key="portfolio" @open-contact="handleOpenContact" />
      <CaseStudy v-else-if="currentPage === 'case-study'" key="case-study" @open-contact="handleOpenContact" />
      <component
        v-else
        :is="currentComponent"
        :key="`${activeNiche}-${activeSample}`"
      />
    </Transition>

    <AppFooter 
      v-if="currentPage === 'portfolio' || currentPage === 'case-study'" 
      @navigate="handleNavigate"
      @open-contact="handleOpenContact"
    />

    <ContactModal 
      v-if="currentPage === 'portfolio' || currentPage === 'case-study'"
      ref="contactModalRef"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar    from '../components/Navbar.vue'
import Portfolio from '../components/Portfolio.vue'
import CaseStudy from '../components/CaseStudy.vue'
import AppFooter from '../components/AppFooter.vue'
import ContactModal from '../components/ContactModal.vue'

// Cosmetics
import CosmeticsOne   from '../components/cosmetics/SampleOne.vue'
import CosmeticsTwo   from '../components/cosmetics/SampleTwo.vue'
import CosmeticsThree from '../components/cosmetics/SampleThree.vue'

// Cleaning
import CleaningOne   from '../components/cleaning/SampleOne.vue'
import CleaningTwo   from '../components/cleaning/SampleTwo.vue'
import CleaningThree from '../components/cleaning/SampleThree.vue'

const currentPage = ref('portfolio')
const activeNiche   = ref('cosmetics')
const activeSample  = ref(1)
const contactModalRef = ref(null)

const componentMap = {
  cosmetics: [CosmeticsOne, CosmeticsTwo, CosmeticsThree],
  cleaning:  [CleaningOne,  CleaningTwo,  CleaningThree],
}

const currentComponent = computed(
  () => componentMap[activeNiche.value][activeSample.value - 1]
)

function handleSwitch({ niche, sample }) {
  activeNiche.value   = niche
  activeSample.value  = sample
  currentPage.value = 'sample'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goHome() {
  currentPage.value = 'portfolio'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goCaseStudy() {
  currentPage.value = 'case-study'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleNavigate(page, elementId) {
  if (page === 'portfolio') {
    currentPage.value = 'portfolio'
    // Delay to allow component to mount if it wasn't
    setTimeout(() => {
      const el = document.getElementById(elementId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }
}

function handleOpenContact() {
  contactModalRef.value?.openModal()
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
