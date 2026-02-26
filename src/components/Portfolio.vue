<template>
  <div class="portfolio-root">

    <!-- ═══════════════════════════════════ HERO ═══════════════════════════════════ -->
    <section class="hero-section">
      <!-- Animated grid background -->
      <div class="hero-grid" aria-hidden="true">
        <div class="grid-lines"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>

      <div class="hero-inner">
        <!-- Eyebrow -->
        <div class="eyebrow">
          <span class="eyebrow-dot"></span>
          <span>Digital Infrastructure Studio</span>
        </div>

        <!-- Main headline -->
        <h1 class="hero-headline">
          <span class="headline-main"><span class="brand-text">Tribe6</span>:</span><br/>
          <span class="headline-accent">High-Performance</span><br/>
          <span class="headline-main">Digital Infrastructure.</span>
        </h1>

        <p class="hero-sub">
          Specializing in Landing Pages, System Integration,<br class="hidden-mobile"/>
          and Lead Generation built to convert.
        </p>

        <!-- CTA row -->
        <div class="hero-ctas">
          <button class="btn-primary" @click="openModal">
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <a href="#work-section" class="btn-ghost">See Our Work</a>
        </div>

        <!-- Trust strip -->
        <div class="trust-strip">
          <div v-for="t in trustItems" :key="t" class="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#007BFF" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            {{ t }}
          </div>
        </div>
      </div>

      <!-- Abstract tech visual -->
      <div class="hero-visual" aria-hidden="true">
        <div class="circuit-card">
          <div class="circuit-header">
            <div class="circuit-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="circuit-label">tribe6.systems</span>
          </div>
          <div class="circuit-body">
            <div v-for="(line, i) in codeLines" :key="i" class="code-line" :style="{ animationDelay: `${i * 0.15}s` }">
              <span class="code-indent" v-for="d in line.depth" :key="d"></span>
              <span :class="`code-${line.type}`">{{ line.text }}</span>
            </div>
          </div>
          <div class="circuit-footer">
            <span class="status-dot"></span>
            <span class="status-text">Systems live · 99.9% uptime</span>
          </div>
        </div>
        <!-- Floating metric cards -->
        <div class="metric-card metric-top">
          <div class="metric-value">3.2x</div>
          <div class="metric-label">Lead Conversion</div>
        </div>
        <div class="metric-card metric-bottom">
          <div class="metric-value">~40hrs</div>
          <div class="metric-label">Saved per Month</div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ STATS ═══════════════════════════════════ -->
    <div class="stats-bar">
      <div class="stats-inner">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════ SERVICES BENTO ═══════════════════════════════════ -->
    <section id="work-section" class="services-section">
      <div class="section-inner">
        <div class="section-label">What I Build</div>
        <h2 class="section-headline">
          The Full Stack of<br/>
          <span class="text-accent">Digital Growth.</span>
        </h2>
        <p class="section-sub">Five core disciplines. One focused studio. The <span class="brand-text text-white">Tribe6</span> Advantage.</p>

        <div class="bento-grid">
          <div v-for="(svc, i) in services" :key="svc.title"
               class="bento-card"
               :class="[`bento-card--${svc.size}`, i === 0 ? 'bento-card--featured' : '']">
            <div class="bento-icon">{{ svc.icon }}</div>
            <h3 class="bento-title">{{ svc.title }}</h3>
            <p class="bento-desc">{{ svc.desc }}</p>
            <div v-if="svc.tags" class="bento-tags">
              <span v-for="tag in svc.tags" :key="tag" class="bento-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ ABOUT ═══════════════════════════════════ -->
    <section class="about-section">
      <div class="section-inner">
        <div class="about-layout">
          <div class="about-left">
            <div class="section-label">The Studio</div>
            <h2 class="section-headline">
              Build the Engine.<br/>
              <span class="text-accent">You Drive the Growth.</span>
            </h2>
            <p class="about-body">
              At <span class="brand-text">Tribe6</span>, we don't just build websites — we build <strong>business tools</strong>. <span class="brand-text">Tribe6</span> is a specialized studio for digital infrastructure. We bridge the gap between "having a website" and "having a high-performing lead machine."
            </p>
            <p class="about-body">
              We help businesses stop losing leads and start automating their growth. Whether you're a startup looking for your first landing page or an established company needing complex system integration — <span class="brand-text">Tribe6</span> delivers measurable results, not just deliverables.
            </p>
            <div class="about-pillars">
              <div v-for="pillar in pillars" :key="pillar.label" class="pillar">
                <div class="pillar-icon">{{ pillar.icon }}</div>
                <div>
                  <div class="pillar-label">{{ pillar.label }}</div>
                  <div class="pillar-desc">{{ pillar.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="about-right">
            <!-- Abstract identity card -->
            <div class="identity-card">
              <div class="id-header">
                <div class="id-logo">T6</div>
                <div>
                  <div class="id-name"><span class="brand-text">Tribe6</span> Studio</div>
                  <div class="id-role"><span class="brand-text text-[0.7rem] opacity-70">Tribe6</span> Systems · Principal Consultant</div>
                </div>
              </div>
              <div class="id-divider"></div>
              <div class="id-skills">
                <div v-for="skill in skillBars" :key="skill.name" class="skill-row">
                  <div class="skill-header">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-pct">{{ skill.pct }}%</span>
                  </div>
                  <div class="skill-track">
                    <div class="skill-bar" :style="{ width: skill.pct + '%', transitionDelay: skill.delay }"></div>
                  </div>
                </div>
              </div>
              <div class="id-divider"></div>
              <div class="id-footer">
                <div class="id-badge">
                  <span class="id-dot"></span>
                  Available for new projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════ WORK WITH ME ═══════════════════════════════════ -->
    <section class="wwm-section">
      <div class="section-inner">
        <div class="section-label">Engagement Models</div>
        <h2 class="section-headline centered">Ready to build your own growth engine?</h2>
        <p class="section-sub centered">Choose the model that fits your stage and needs.</p>

        <div class="wwm-grid">
          <!-- Sprint card -->
          <div class="wwm-card wwm-card--sprint">
            <div class="wwm-badge">Sprint</div>
            <div class="wwm-icon">⚡</div>
            <h3 class="wwm-title">Project-Based Sprints</h3>
            <p class="wwm-desc">
              Got a specific problem? I solve it fast. Sprint-based engagements are ideal for targeted deliverables — a landing page, a system integration, a dashboard — delivered on timeline and on budget.
            </p>
            <ul class="wwm-list">
              <li v-for="item in sprintFeatures" :key="item">{{ item }}</li>
            </ul>
            <button class="btn-primary wwm-btn" @click="openModal">Start a Sprint →</button>
          </div>

          <!-- Partnership card -->
          <div class="wwm-card wwm-card--partner">
            <div class="wwm-badge wwm-badge--partner">Partnership</div>
            <div class="wwm-icon">🤝</div>
            <h3 class="wwm-title">Technical Partnership</h3>
            <p class="wwm-desc">
              Need a dedicated technical arm without the overhead of a full-time hire? I embed into your team, keep your systems evolving, and act as your strategic tech partner — month after month.
            </p>
            <ul class="wwm-list">
              <li v-for="item in partnerFeatures" :key="item">{{ item }}</li>
            </ul>
            <button class="btn-outline wwm-btn" @click="openModal">Discuss Partnership →</button>
          </div>
        </div>
      </div>
    </section>



  </div>
</template>

<script setup>
import { ref } from 'vue'

// ── Data ──────────────────────────────────────────────────────────────────────
const trustItems = ['No agency fluff', 'Sprint or retainer', 'Built for ROI']

const codeLines = [
  { depth: 0, type: 'keyword', text: 'const tribe6 = {' },
  { depth: 1, type: 'key',     text: 'consultant:' },
  { depth: 2, type: 'string',  text: '"Berns",' },
  { depth: 1, type: 'key',     text: 'stack:' },
  { depth: 2, type: 'string',  text: '["Vue", "GHL", "Vite", "Node"],' },
  { depth: 1, type: 'key',     text: 'leadConversion:' },
  { depth: 2, type: 'number',  text: '3.2,' },
  { depth: 1, type: 'key',     text: 'status:' },
  { depth: 2, type: 'green',   text: '"creating a dent in the universe"' },
  { depth: 0, type: 'keyword', text: '}' },
]

const stats = [
  { value: 'Fixed', label: 'Project Pricing' },
  { value: '3.2x', label: 'Avg Lead Lift' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '~40h', label: 'Saved / Month' },
]

const services = [
  {
    icon: '🚀',
    title: 'High-Converting Landing Pages',
    desc: 'Designed for one goal — turning visitors into customers. Every pixel earns its place.',
    tags: ['CRO', 'A/B Testing', 'GHL'],
    size: 'wide',
  },
  {
    icon: '⚙️',
    title: 'WebApps & System Integration',
    desc: 'Making your tools talk to each other so you don\'t do manual work.',
    tags: ['API', 'Zapier', 'Make'],
    size: 'normal',
  },
  {
    icon: '📊',
    title: 'Data & Analytics',
    desc: 'I don\'t guess. I use analytics to show you exactly what\'s working.',
    tags: ['GA4', 'Looker'],
    size: 'normal',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Clean, intuitive interfaces your customers actually enjoy using.',
    tags: ['Figma', 'Design Systems'],
    size: 'normal',
  },
  {
    icon: '🔧',
    title: 'Process Improvement',
    desc: 'Finding bottlenecks in your current setup and fixing them to save time and money.',
    tags: ['Automation', 'Workflow'],
    size: 'normal',
  },
]

const pillars = [
  { icon: '🎯', label: 'Results Over Deliverables', desc: 'Every project is measured by business impact, not just completion.' },
  { icon: '🔌', label: 'Integrated Systems', desc: 'I connect your tools so data flows without manual effort.' },
  { icon: '📈', label: 'Growth-First Thinking', desc: 'Everything I build is designed to scale with your business.' },
]

const skillBars = [
  { name: 'Landing Page CRO', pct: 97, delay: '0.1s' },
  { name: 'System Integration', pct: 92, delay: '0.2s' },
  { name: 'UI/UX Design', pct: 88, delay: '0.3s' },
  { name: 'Data Analytics', pct: 84, delay: '0.4s' },
]

const sprintFeatures = [
  'Fixed scope, fixed budget',
  'Delivered in 1–4 weeks',
  'Clear milestones & handoff',
  'No retainer required',
]

const partnerFeatures = [
  'Dedicated monthly bandwidth',
  'Ongoing iterations & support',
  'Priority response SLA',
  'Quarterly strategy sessions',
]

const projectTypes = [
  'Landing Page',
  'WebApp / System Integration',
  'Process Improvement',
  'UI/UX Design',
  'Data & Analytics',
  'Long-Term Partnership',
  'Other',
]

// ── Modal & Form ───────────────────────────────────────────────────────────────
const emit = defineEmits(['open-contact'])
function openModal() { emit('open-contact') }
</script>

<style scoped>
/* ══════════ Root & Reset ══════════ */
.portfolio-root {
  background: #0a0a0f;
  color: #e8e8f0;
  font-family: 'Inter', 'Manrope', system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ══════════ HERO ══════════ */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 5vw 80px;
  gap: 4rem;
  overflow: hidden;
}
.hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,123,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,123,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}
.orb-1 {
  width: 600px; height: 600px;
  top: -15%; left: -10%;
  background: radial-gradient(circle, rgba(0,123,255,0.12) 0%, transparent 70%);
}
.orb-2 {
  width: 400px; height: 400px;
  bottom: -10%; right: -5%;
  background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
}

.hero-inner {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,123,255,0.08);
  border: 1px solid rgba(0,123,255,0.2);
  border-radius: 100px;
  padding: 0.4rem 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 2rem;
}
.eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #007BFF;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero-headline {
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}
.headline-main { color: #f0f0ff; }
.headline-accent {
  background: linear-gradient(90deg, #007BFF, #60a5fa, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-sub {
  font-size: 1.15rem;
  color: rgba(232,232,240,0.55);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2.5rem;
}

.hero-ctas {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.trust-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(232,232,240,0.45);
  letter-spacing: 0.02em;
}

/* ── Hero Visual ── */
.hero-visual {
  flex: 0 0 440px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1023px) {
  .hero-section { flex-direction: column; padding-top: 120px; }
  .hero-visual { flex: none; width: 100%; max-width: 440px; }
}

.circuit-card {
  background: rgba(18,18,28,0.9);
  border: 1px solid rgba(0,123,255,0.15);
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
}
.circuit-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}
.circuit-dots { display: flex; gap: 6px; }
.dot { width: 11px; height: 11px; border-radius: 50%; }
.dot-red    { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green  { background: #28ca41; }
.circuit-label {
  margin-left: auto;
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.05em;
  font-family: 'JetBrains Mono', monospace;
}
.circuit-body {
  padding: 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.82rem;
  line-height: 1.9;
}
.code-line {
  display: flex;
  animation: fadeCodeLine 0.4s ease both;
}
@keyframes fadeCodeLine {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
.code-indent { display: inline-block; width: 1.5em; flex-shrink: 0; }
.code-keyword { color: #818cf8; font-weight: 700; }
.code-key     { color: #60a5fa; }
.code-string  { color: #34d399; }
.code-number  { color: #fb923c; }
.code-green   { color: #4ade80; }

.circuit-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,123,255,0.04);
}
.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #28ca41;
  animation: pulse 2s infinite;
}
.status-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Floating metric cards */
.metric-card {
  position: absolute;
  background: rgba(12,12,22,0.9);
  border: 1px solid rgba(0,123,255,0.18);
  border-radius: 14px;
  padding: 0.9rem 1.2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5);
}
.metric-top    { top: -20px; right: -24px; }
.metric-bottom { bottom: -20px; left: -24px; }
.metric-value  { font-size: 1.5rem; font-weight: 900; color: #007BFF; letter-spacing: -0.03em; }
.metric-label  { font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }

/* ══════════ STATS BAR ══════════ */
.stats-bar {
  background: rgba(0,123,255,0.04);
  border-top: 1px solid rgba(0,123,255,0.08);
  border-bottom: 1px solid rgba(0,123,255,0.08);
  padding: 2.5rem 5vw;
}
.stats-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  text-align: center;
}
.stat-value {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #fff 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}
.stat-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(232,232,240,0.35);
  margin-top: 0.3rem;
}

/* ══════════ SECTION COMMONS ══════════ */
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 5vw;
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
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #f0f0ff;
  margin-bottom: 1rem;
}
.section-headline.centered { text-align: center; }
.section-sub {
  font-size: 1.05rem;
  color: rgba(232,232,240,0.45);
  margin-bottom: 3.5rem;
  max-width: 520px;
}
.section-sub.centered { text-align: center; margin-left: auto; margin-right: auto; }
.text-accent {
  background: linear-gradient(90deg, #007BFF, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

/* ══════════ SERVICES BENTO ══════════ */
.services-section { background: #0d0d18; }
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; }
}
@media (min-width: 901px) and (max-width: 1100px) {
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
}

.bento-card {
  background: rgba(18,18,30,0.8);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 2rem;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  position: relative;
  overflow: hidden;
}
.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(0,123,255,0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.25s;
}
.bento-card:hover {
  border-color: rgba(0,123,255,0.2);
  transform: translateY(-3px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
}
.bento-card:hover::before { opacity: 1; }

.bento-card--featured {
  grid-column: span 2;
  background: linear-gradient(135deg, rgba(0,123,255,0.08) 0%, rgba(18,18,30,0.8) 60%);
  border-color: rgba(0,123,255,0.18);
}
@media (max-width: 900px) {
  .bento-card--featured { grid-column: span 1; }
}

.bento-icon  { font-size: 2.2rem; margin-bottom: 1.25rem; }
.bento-title { font-size: 1.1rem; font-weight: 800; color: #f0f0ff; margin-bottom: 0.6rem; letter-spacing: -0.01em; }
.bento-desc  { font-size: 0.875rem; color: rgba(232,232,240,0.5); line-height: 1.65; margin-bottom: 1.25rem; }
.bento-tags  { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.bento-tag   {
  background: rgba(0,123,255,0.08);
  border: 1px solid rgba(0,123,255,0.15);
  color: #60a5fa;
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* ══════════ ABOUT ══════════ */
.about-section { background: #0a0a0f; }
.about-layout {
  display: flex;
  gap: 5rem;
  align-items: flex-start;
}
@media (max-width: 900px) {
  .about-layout { flex-direction: column; }
}
.about-left,.about-right { flex: 1; }
.about-body {
  color: rgba(232,232,240,0.6);
  line-height: 1.75;
  font-size: 0.975rem;
  margin-bottom: 1.25rem;
  max-width: 560px;
}
.about-body strong { color: #e8e8f0; font-weight: 700; }
.about-pillars { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.pillar { display: flex; align-items: flex-start; gap: 1rem; }
.pillar-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
.pillar-label { font-size: 0.9rem; font-weight: 800; color: #f0f0ff; margin-bottom: 0.2rem; }
.pillar-desc  { font-size: 0.8rem; color: rgba(232,232,240,0.45); line-height: 1.5; }

/* Identity card */
.identity-card {
  background: rgba(15,15,28,0.95);
  border: 1px solid rgba(0,123,255,0.14);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5);
}
.id-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.id-logo {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #007BFF, #818cf8);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.1rem; font-weight: 900; color: white; letter-spacing: -0.02em;
  flex-shrink: 0;
}
.id-name { font-weight: 800; font-size: 1rem; color: #f0f0ff; }
.id-role { font-size: 0.72rem; font-weight: 600; color: rgba(232,232,240,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }
.id-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 1.5rem 0; }
.id-skills  { display: flex; flex-direction: column; gap: 1.1rem; }

.skill-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
.skill-name   { font-size: 0.78rem; font-weight: 700; color: rgba(232,232,240,0.65); }
.skill-pct    { font-size: 0.78rem; font-weight: 800; color: #60a5fa; }
.skill-track  { height: 5px; background: rgba(255,255,255,0.05); border-radius: 100px; overflow: hidden; }
.skill-bar    {
  height: 100%; border-radius: 100px;
  background: linear-gradient(90deg, #007BFF, #818cf8);
  transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
}

.id-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(40,202,65,0.08);
  border: 1px solid rgba(40,202,65,0.18);
  border-radius: 100px;
  padding: 0.4rem 0.9rem;
  font-size: 0.72rem; font-weight: 700; color: #4ade80;
  letter-spacing: 0.04em;
}
.id-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }

/* ══════════ WORK WITH ME ══════════ */
.wwm-section { background: #0d0d18; }
.wwm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
@media (max-width: 760px) { .wwm-grid { grid-template-columns: 1fr; } }

.wwm-card {
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  padding: 2.5rem;
  background: rgba(18,18,30,0.7);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.25s, transform 0.25s;
}
.wwm-card--sprint  { border-color: rgba(0,123,255,0.15); }
.wwm-card--partner { border-color: rgba(129,140,248,0.15); }
.wwm-card:hover { transform: translateY(-4px); }
.wwm-card--sprint:hover  { border-color: rgba(0,123,255,0.35); box-shadow: 0 20px 50px rgba(0,123,255,0.08); }
.wwm-card--partner:hover { border-color: rgba(129,140,248,0.35); box-shadow: 0 20px 50px rgba(129,140,248,0.08); }

.wwm-badge {
  display: inline-block;
  background: rgba(0,123,255,0.1);
  color: #60a5fa;
  border: 1px solid rgba(0,123,255,0.2);
  padding: 0.25rem 0.8rem;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  width: fit-content;
}
.wwm-badge--partner {
  background: rgba(129,140,248,0.1);
  color: #a5b4fc;
  border-color: rgba(129,140,248,0.2);
}
.wwm-icon  { font-size: 2.5rem; }
.wwm-title { font-size: 1.3rem; font-weight: 800; color: #f0f0ff; letter-spacing: -0.02em; line-height: 1.2; }
.wwm-desc  { font-size: 0.875rem; color: rgba(232,232,240,0.5); line-height: 1.7; }
.wwm-list  {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.5rem;
  flex: 1;
}
.wwm-list li {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.82rem; font-weight: 600; color: rgba(232,232,240,0.6);
}
.wwm-list li::before { content: '→'; color: #007BFF; font-weight: 900; font-size: 0.75rem; }
.wwm-card--partner .wwm-list li::before { color: #818cf8; }
.wwm-btn { width: 100%; margin-top: 0.5rem; justify-content: center; }

/* ══════════ FOOTER ══════════ */
.portfolio-footer {
  background: #070710;
  border-top: 1px solid rgba(255,255,255,0.04);
  padding: 3rem 5vw;
}
.footer-inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;
}
.footer-logo { font-size: 1.4rem; font-weight: 900; letter-spacing: -0.03em; color: #f0f0ff; }
.footer-tagline { font-size: 0.75rem; color: rgba(232,232,240,0.3); margin-top: 4px; font-weight: 600; }
.footer-links { display: flex; gap: 2rem; }
.footer-link { color: rgba(232,232,240,0.4); font-size: 0.85rem; font-weight: 600; text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #60a5fa; }
.footer-copy { font-size: 0.72rem; color: rgba(232,232,240,0.2); font-weight: 600; letter-spacing: 0.05em; }

/* ══════════ BUTTONS ══════════ */
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: #007BFF;
  color: #fff;
  font-size: 0.875rem; font-weight: 800; letter-spacing: 0.02em;
  padding: 0.85rem 1.8rem;
  border-radius: 100px;
  border: none; cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 24px rgba(0,123,255,0.25);
  font-family: inherit;
}
.btn-primary:hover {
  background: #0066d6;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0,123,255,0.4);
}
.btn-ghost {
  display: inline-flex; align-items: center;
  color: rgba(232,232,240,0.6);
  font-size: 0.875rem; font-weight: 700;
  padding: 0.85rem 1.4rem;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  font-family: inherit;
  text-decoration: none;
}
.btn-ghost:hover { color: #e8e8f0; border-color: rgba(255,255,255,0.25); }
.btn-outline {
  display: inline-flex; align-items: center; gap: 0.6rem;
  background: transparent;
  color: #a5b4fc;
  font-size: 0.875rem; font-weight: 800; letter-spacing: 0.02em;
  padding: 0.85rem 1.8rem;
  border-radius: 100px;
  border: 1.5px solid rgba(129,140,248,0.35);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  font-family: inherit;
}
.btn-outline:hover {
  background: rgba(129,140,248,0.08);
  border-color: rgba(129,140,248,0.6);
  transform: translateY(-2px);
}

/* ══════════ FAB ══════════ */
.fab {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 58px; height: 58px;
  border-radius: 50%;
  background: #007BFF;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 30px rgba(0,123,255,0.45);
  z-index: 150;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.fab:hover {
  background: #0066d6;
  transform: scale(1.08);
  box-shadow: 0 16px 40px rgba(0,123,255,0.55);
}
.fab-ping {
  position: absolute;
  top: 6px; right: 6px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #4ade80;
  border: 2px solid #0a0a0f;
  animation: ping 2s infinite;
}
@keyframes ping {
  0%    { transform: scale(1); opacity: 1; }
  70%   { transform: scale(1.8); opacity: 0; }
  100%  { transform: scale(1); opacity: 0; }
}

/* ══════════ MODAL ══════════ */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9000;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.modal-box {
  background: #0f0f1e;
  border: 1px solid rgba(0,123,255,0.18);
  border-radius: 24px;
  width: 100%; max-width: 580px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03);
  max-height: 90vh;
  overflow-y: auto;
}
.modal-close {
  position: absolute; top: 1.25rem; right: 1.25rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5);
  width: 36px; height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }
.modal-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.modal-logo {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #007BFF, #818cf8);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 900; color: white; flex-shrink: 0;
}
.modal-title { font-size: 1.2rem; font-weight: 800; color: #f0f0ff; }
.modal-sub    { font-size: 0.78rem; color: rgba(232,232,240,0.4); margin-top: 2px; }

/* Form */
.modal-form  { display: flex; flex-direction: column; gap: 1.25rem; }
.form-row    { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
.form-group  { display: flex; flex-direction: column; gap: 0.4rem; }
.form-label  { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(232,232,240,0.4); }
.form-input  {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #e8e8f0;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.form-input:focus {
  border-color: rgba(0,123,255,0.5);
  background: rgba(0,123,255,0.04);
}
.form-input::placeholder { color: rgba(232,232,240,0.2); }
.form-select  { cursor: pointer; appearance: none; }
.form-select option { background: #0f0f1e; color: #e8e8f0; }
.form-textarea { resize: vertical; min-height: 100px; }
.form-error   { font-size: 0.68rem; font-weight: 700; color: #f87171; letter-spacing: 0.04em; }
.form-submit  {
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  font-family: inherit;
  letter-spacing: 0.02em;
  box-shadow: 0 8px 24px rgba(0,123,255,0.25);
  margin-top: 0.25rem;
}
.form-submit:hover {
  background: #0066d6;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(0,123,255,0.4);
}
.form-submit--loading { opacity: 0.7; pointer-events: none; }
.form-privacy { font-size: 0.68rem; color: rgba(232,232,240,0.25); text-align: center; font-weight: 600; }
.loading-dots span {
  display: inline-block;
  animation: dotBounce 1.2s infinite;
}
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes dotBounce {
  0%,80%,100% { transform: translateY(0); }
  40%          { transform: translateY(-6px); }
}

/* Success */
.modal-success { text-align: center; padding: 2rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.success-icon  {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: rgba(74,222,128,0.12);
  border: 2px solid rgba(74,222,128,0.3);
  font-size: 1.8rem;
  display: flex; align-items: center; justify-content: center;
  color: #4ade80;
}
.success-title { font-size: 1.4rem; font-weight: 800; color: #f0f0ff; }
.success-sub   { font-size: 0.875rem; color: rgba(232,232,240,0.5); }

/* Modal transitions */
.modal-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.modal-enter-from   { opacity: 0; }
.modal-leave-to     { opacity: 0; }
.modal-enter-from .modal-box { transform: scale(0.96) translateY(12px); }
.modal-leave-to   .modal-box { transform: scale(0.96) translateY(12px); }

/* Utilities */
.hidden-mobile { display: none; }
@media (min-width: 768px) { .hidden-mobile { display: inline; } }
</style>
