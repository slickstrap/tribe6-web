<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo"><span class="brand-text">Tribe6</span></div>
        <p class="footer-tagline">Build the Engine. You Drive the Growth.</p>
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link" @click.prevent="$emit('navigate', 'portfolio', 'work-section')">Services</a>
        <a href="#" class="footer-link" @click.prevent="$emit('open-contact')">Contact</a>
      </div>
      <div class="footer-copy">© 2026 <span class="brand-text" style="font-size: 0.9rem;">Tribe6</span> · All Rights Reserved</div>
    </div>
  </footer>
</template>

<script setup>
defineEmits(['navigate', 'open-contact'])
</script>

<style scoped>
.app-footer {
  background: #0a0a0f;
  border-top: 1px solid rgba(0,123,255,0.08);
  padding: 4rem 5vw;
  position: relative;
  z-index: 10;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.brand-text {
  font-family: 'Pacifico', cursive !important;
  background: linear-gradient(135deg, #e2c4ff 0%, #f8d58b 100%);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

.footer-tagline {
  font-size: 0.85rem;
  color: rgba(232,232,240,0.4);
}

.footer-links {
  display: flex;
  gap: 2.5rem;
}

.footer-link {
  color: rgba(232,232,240,0.6);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #007BFF;
}

.footer-copy {
  font-size: 0.75rem;
  color: rgba(232,232,240,0.25);
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.03);
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
