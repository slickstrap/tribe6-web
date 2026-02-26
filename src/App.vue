<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <CookieConsent />
  </div>
</template>

<script setup>
import CookieConsent from './components/ui/CookieConsent.vue'
</script>

<style>
/* We moved the fade styling to MainLayout.vue, but can keep it here for global page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
