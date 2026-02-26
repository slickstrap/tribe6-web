<template>
  <div class="casestudy-root">
    
    <!-- ═══════════════════════════════════ HERO ═══════════════════════════════════ -->
    <section class="hero-section">
      <div class="hero-grid" aria-hidden="true">
        <div class="grid-lines"></div>
      </div>
      
      <div class="section-inner">
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          <span>GoHighLevel Success Story</span>
        </div>
        
        <h1 class="hero-headline">
          Case Study: <span class="text-accent">Automating Growth</span><br/>
          for a Service-Based Business.
        </h1>
        
        <p class="hero-sub">
          How <span class="brand-text">Tribe6</span> built a high-converting funnel and integrated a custom GoHighLevel CRM backend to increase lead quality by 40%.
        </p>

        <!-- Stats Bar -->
        <div class="stats-row">
          <div class="stat-highlight">
            <div class="stat-h-val">+12%</div>
            <div class="stat-h-lab">Conversion Rate</div>
          </div>
          <div class="stat-h-divider"></div>
          <div class="stat-highlight">
            <div class="stat-h-val">&lt; 2 mins</div>
            <div class="stat-h-lab">Response Time</div>
          </div>
          <div class="stat-h-divider"></div>
          <div class="stat-highlight">
            <div class="stat-h-val">100%</div>
            <div class="stat-h-lab">Hands-free</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ SIPOC ═══════════════════════════════════ -->
    <section class="sipoc-section">
      <div class="section-inner">
        <div class="section-label">Visual Process Mapping</div>
        <h2 class="section-headline">The High-Level Architecture (SIPOC).</h2>
        
        <div class="sipoc-container">
          <div class="sipoc-grid">
            <div v-for="item in sipocData" :key="item.title" class="sipoc-column">
              <div class="sipoc-header">{{ item.letter }}</div>
              <div class="sipoc-title">{{ item.title }}</div>
              <div class="sipoc-card">
                <ul class="sipoc-list">
                  <li v-for="point in item.points" :key="point">{{ point }}</li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Connecting arrows (desktop) -->
          <div class="sipoc-arrows hidden-mobile">
            <div class="arrow-path" v-for="n in 4" :key="n">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ DMAIC ═══════════════════════════════════ -->
    <section class="dmaic-section">
      <div class="section-inner">
        <div class="section-label">Optimization Methodology</div>
        <h2 class="section-headline">Our Methodology (DMAIC).</h2>
        
        <div class="dmaic-grid">
          <div v-for="(step, i) in dmaicSteps" :key="step.title" 
               class="dmaic-item" 
               :class="{ 'dmaic-item--active': activeDmaic === i }"
               @click="activeDmaic = i">
            <div class="dmaic-header">
              <div class="dmaic-icon">{{ step.icon }}</div>
              <div class="dmaic-name">{{ step.title }}</div>
              <div class="dmaic-chevron">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
            <Transition name="expand">
              <div v-if="activeDmaic === i" class="dmaic-content">
                <p>{{ step.desc }}</p>
                <div class="dmaic-badge">{{ step.action }}</div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ TECH STACK ═══════════════════════════════════ -->
    <section class="tech-section">
      <div class="section-inner">
        <div class="tech-layout">
          <div class="tech-content">
            <div class="section-label">The Integration Stack</div>
            <h2 class="section-headline">The "Invisible Work".</h2>
            <p class="tech-sub">What happens under the hood of a high-performance growth engine.</p>
            
            <ul class="tech-list">
              <li v-for="t in techPoints" :key="t">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
                {{ t }}
              </li>
            </ul>
          </div>
          <div class="tech-visual">
            <div class="stack-card">
              <div class="stack-logo">GHL</div>
              <div class="stack-nodes">
                <div class="node">Webhooks</div>
                <div class="node">API</div>
                <div class="node">Workflows</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ CTA ═══════════════════════════════════ -->
    <section class="cta-section">
      <div class="section-inner centered">
        <h2 class="cta-headline">Ready to build your own growth engine?</h2>
        <p class="cta-sub">Let's audit your current funnel and find the leaks.</p>
        <button class="btn-primary btn-large" @click="openModal">
          Start a Conversation
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>



  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['open-contact'])
function openModal() { emit('open-contact') }

const activeDmaic = ref(0)

const sipocData = [
  { letter: 'S', title: 'Suppliers', points: ['Social Media Ads', 'FB / IG / TikTok', 'Inbound Traffic'] },
  { letter: 'I', title: 'Inputs',    points: ['Lead Data', 'Name / Email / Phone', 'Service Interest'] },
  { letter: 'P', title: 'Process',   points: ['Landing Page', 'GHL Trigger', 'SMS/Email Nurture', 'Calendar Booking'] },
  { letter: 'O', title: 'Outputs',   points: ['Qualified Leads', 'Appointments', 'CRM Growth'] },
  { letter: 'C', title: 'Customers', points: ['Client Sales Team', 'Business Owners', 'Follow-up Reps'] }
]

const dmaicSteps = [
  { icon: '🎯', title: 'Define', desc: 'Identify the client’s drop-off points in their current funnel.', action: 'Goal: Map leak points' },
  { icon: '📏', title: 'Measure', desc: 'Tracking current CPA (Cost Per Acquisition) and landing page bounce rates.', action: 'Baseline Analytics' },
  { icon: '🔍', title: 'Analyze', desc: 'Heatmapping user behavior to see where people stop scrolling.', action: 'Behavioral Audit' },
  { icon: '⚡', title: 'Improve', desc: 'Building the GHL landing page with "Fast-Load" tech and "Instant-SMS" triggers.', action: 'Funnel Buildout' },
  { icon: '🛡️', title: 'Control', desc: 'Setting up GHL Dashboards to monitor lead flow in real-time.', action: 'Post-launch Monitoring' }
]

const techPoints = [
  'Custom Webhooks for data routing',
  'API Integrations (Stripe, Slack, GSheets)',
  'Multi-Step Form Logic & Validation',
  'Automated SMS/Email Workflows',
  'Custom GHL Dashboarding & Reporting'
]
</script>

<style scoped>
.casestudy-root {
  background: #0a0a0f;
  color: #e8e8f0;
  font-family: 'Manrope', system-ui, sans-serif;
  min-height: 100vh;
}

.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}

.section-inner.centered { text-align: center; }

/* ── Typography & Brand ── */
.brand-text {
  font-size: 1.1em; /* Slight adjustment if needed, but the global one will handle the rest */
}

.text-accent {
  background: linear-gradient(90deg, #007BFF, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #007BFF;
  margin-bottom: 1rem;
}

.section-headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

.hero-headline {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
}

.hero-sub {
  font-size: 1.25rem;
  color: rgba(255,255,255,0.6);
  max-width: 700px;
  line-height: 1.6;
  margin-bottom: 3rem;
}

/* ── Hero ── */
.hero-section {
  position: relative;
  background: #0d0d12;
  padding-top: 100px;
}

.grid-lines {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(0,123,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,123,255,0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,123,255,0.1);
  border: 1px solid rgba(0,123,255,0.2);
  border-radius: 100px;
  padding: 0.4rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 800;
  color: #60a5fa;
  margin-bottom: 2rem;
}

.eyebrow-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #007BFF;
  box-shadow: 0 0 10px #007BFF;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.stat-highlight {
  display: flex;
  flex-direction: column;
}

.stat-h-val {
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.03em;
}

.stat-h-lab {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #007BFF;
  letter-spacing: 0.05em;
}

.stat-h-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.1);
}

/* ── SIPOC ── */
.sipoc-section { background: #0a0a0f; }

.sipoc-container {
  position: relative;
  margin-top: 4rem;
}

.sipoc-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  position: relative;
  z-index: 2;
}

.sipoc-column {
  text-align: center;
}

.sipoc-header {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(255,255,255,0.05);
  line-height: 1;
  margin-bottom: -1rem;
}

.sipoc-title {
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
}

.sipoc-card {
  background: #12121c;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 1.5rem;
  min-height: 180px;
  text-align: left;
  transition: border-color 0.3s, transform 0.3s;
}

.sipoc-card:hover {
  border-color: rgba(0,123,255,0.3);
  transform: translateY(-5px);
}

.sipoc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sipoc-list li {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}

.sipoc-list li:last-child { border: none; }

.sipoc-arrows {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  pointer-events: none;
  opacity: 0.2;
}

.arrow-path { font-size: 1.5rem; color: #007BFF; }

/* ── DMAIC ── */
.dmaic-section { background: #0d0d12; }

.dmaic-grid {
  max-width: 800px;
  margin: 0 auto;
}

.dmaic-item {
  background: #12121c;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  margin-bottom: 1rem;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.3s;
}

.dmaic-item:hover { border-color: rgba(0,123,255,0.3); }

.dmaic-header {
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.dmaic-icon { font-size: 1.5rem; }
.dmaic-name { font-size: 1.1rem; font-weight: 700; color: #fff; flex: 1; }
.dmaic-chevron { transition: transform 0.3s; color: rgba(255,255,255,0.3); }

.dmaic-item--active .dmaic-chevron { transform: rotate(180deg); color: #007BFF; }

.dmaic-content {
  padding: 0 2rem 1.5rem 2rem;
  padding-left: 5rem;
}

.dmaic-content p {
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.dmaic-badge {
  display: inline-block;
  padding: 0.35rem 1rem;
  background: rgba(0,123,255,0.1);
  border: 1px solid rgba(0,123,255,0.2);
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  color: #60a5fa;
  text-transform: uppercase;
}

/* ── Tech Section ── */
.tech-section { background: #0a0a0f; }

.tech-layout {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.tech-content { flex: 1; }
.tech-visual { flex: 1; display: flex; justify-content: center; }

.tech-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.tech-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
}

.stack-card {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at center, rgba(0,123,255,0.1) 0%, transparent 70%);
  border: 1px solid rgba(0,123,255,0.2);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.stack-logo {
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  background: #007BFF;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,123,255,0.4);
}

.stack-nodes {
  display: flex;
  gap: 1rem;
}

.node {
  padding: 0.5rem 1rem;
  background: #12121c;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
}

/* ── CTA ── */
.cta-section {
  background: linear-gradient(rgba(10,10,15,1), rgba(0,123,255,0.05));
  padding-bottom: 10rem;
}

.cta-headline {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.cta-sub {
  font-size: 1.1rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 3rem;
}

/* ── Buttons ── */
.btn-primary {
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.75rem;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  background: #0069d9;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,123,255,0.3);
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 16px;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-box {
  background: #12121c;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-header { margin-bottom: 2rem; }
.modal-title { font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; }
.modal-sub { font-size: 0.9rem; color: #666; }

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.modal-form input, .modal-form textarea {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 1rem;
  color: #fff;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.modal-form input:focus, .modal-form textarea:focus {
  border-color: #007BFF;
}

.modal-success {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #28ca41;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem auto;
}

/* ── Transitions ── */
.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; max-height: 200px; opacity: 1; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.3s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

/* ── Mobile ── */
@media (max-width: 1023px) {
  .tech-layout { flex-direction: column; text-align: center; }
  .tech-list li { justify-content: center; }
  .sipoc-grid { grid-template-columns: 1fr; }
  .sipoc-arrows { display: none; }
  .stats-row { gap: 1.5rem; justify-content: center; }
  .stat-h-divider { display: none; }
}
</style>
