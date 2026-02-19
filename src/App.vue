<template>
  <div class="min-h-screen">
    <Navbar
      :active-niche="activeNiche"
      :active-sample="activeSample"
      @switch="handleSwitch"
    />

    <Transition name="fade" mode="out-in">
      <component :is="currentComponent" :key="`${activeNiche}-${activeSample}`" />
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from './components/Navbar.vue'

// Cosmetics
import CosmeticsOne from './components/cosmetics/SampleOne.vue'
import CosmeticsTwo from './components/cosmetics/SampleTwo.vue'
import CosmeticsThree from './components/cosmetics/SampleThree.vue'

// Cleaning
import CleaningOne from './components/cleaning/SampleOne.vue'
import CleaningTwo from './components/cleaning/SampleTwo.vue'
import CleaningThree from './components/cleaning/SampleThree.vue'

const activeNiche = ref('cosmetics')
const activeSample = ref(1)

const componentMap = {
  cosmetics: [CosmeticsOne, CosmeticsTwo, CosmeticsThree],
  cleaning: [CleaningOne, CleaningTwo, CleaningThree],
}

const currentComponent = computed(
  () => componentMap[activeNiche.value][activeSample.value - 1]
)

function handleSwitch({ niche, sample }) {
  activeNiche.value = niche
  activeSample.value = sample
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
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
