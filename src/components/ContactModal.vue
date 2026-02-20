<template>
  <div>
    <!-- FAB -->
    <button class="fab" @click="openModal" aria-label="Contact Berns">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
      <span class="fab-ping"></span>
    </button>

    <!-- CONTACT MODAL -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-box" role="dialog" aria-modal="true" aria-label="Contact Berns">
            <!-- Close -->
            <button class="modal-close" @click="closeModal" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <!-- Header -->
            <div class="modal-header">
              <div class="modal-logo">T6</div>
              <div>
                <h3 class="modal-title">Start a Conversation</h3>
                <p class="modal-sub">I respond within 24 hours.</p>
              </div>
            </div>

            <!-- Success -->
            <div v-if="formSent" class="modal-success">
              <div class="success-icon">✓</div>
              <h4 class="success-title">Message Sent!</h4>
              <p class="success-sub">Berns will be in touch shortly. Check your inbox.</p>
              <button class="btn-ghost" @click="closeModal">Close</button>
            </div>

            <!-- Form -->
            <form v-show="!formSent" @submit.prevent="submitForm" class="modal-form">
              <input type="hidden" name="access_key" value="d2066a85-2957-4628-86ef-6c4d9142a393">
              <input type="hidden" name="subject" :value="`New Project Inquiry: ${contactForm.type || 'Tribe6'}`">
              <input type="hidden" name="from_name" value="Tribe6 Portfolio">

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-name">Full Name *</label>
                  <input id="contact-name" v-model="contactForm.name" name="name" type="text" placeholder="Your name" class="form-input" required/>
                  <span v-if="formErrors.name" class="form-error">{{ formErrors.name }}</span>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">Email Address *</label>
                  <input id="contact-email" v-model="contactForm.email" name="email" type="email" placeholder="you@company.com" class="form-input" required/>
                  <span v-if="formErrors.email" class="form-error">{{ formErrors.email }}</span>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-type">Project Type</label>
                <select id="contact-type" v-model="contactForm.type" name="project_type" class="form-input form-select">
                  <option value="" disabled>Select a service…</option>
                  <option v-for="opt in projectTypes" :key="opt" :value="opt">{{ opt }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-msg">Message *</label>
                <textarea id="contact-msg" v-model="contactForm.message" name="message" placeholder="Tell us about your project, goals, and timeline…" class="form-input form-textarea" rows="4" required></textarea>
                <span v-if="formErrors.message" class="form-error">{{ formErrors.message }}</span>
              </div>
              
              <button type="submit" class="form-submit" :disabled="formLoading">
                <span v-if="!formLoading">Send Message →</span>
                <span v-else class="loading-dots"><span>.</span><span>.</span><span>.</span></span>
              </button>
              <p class="form-privacy">No spam. No sharing. Direct communication with Tribe6.</p>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modalOpen   = ref(false)
const formSent    = ref(false)
const formLoading = ref(false)
const formErrors  = ref({})

const contactForm = ref({ name: '', email: '', type: '', message: '' })

const projectTypes = [
  'Landing Page',
  'WebApp / System Integration',
  'Process Improvement',
  'UI/UX Design',
  'Data & Analytics',
  'Long-Term Partnership',
  'Other',
]

function openModal()  { modalOpen.value = true; document.body.style.overflow = 'hidden' }
function closeModal() { modalOpen.value = false; document.body.style.overflow = ''; formSent.value = false; formLoading.value = false }

defineExpose({ openModal })

async function submitForm() {
  formErrors.value = {}
  if (!contactForm.value.name.trim())    formErrors.value.name = 'Name is required'
  if (!contactForm.value.email.includes('@')) formErrors.value.email = 'Valid email required'
  if (!contactForm.value.message.trim()) formErrors.value.message = 'Message is required'
  
  if (Object.keys(formErrors.value).length) return
  formLoading.value = true
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "d2066a85-2957-4628-86ef-6c4d9142a393",
        name: contactForm.value.name,
        email: contactForm.value.email,
        project_type: contactForm.value.type || 'Not specified',
        message: contactForm.value.message,
        subject: `New Tribe6 Inquiry: ${contactForm.value.type || 'Project'}`,
        from_name: 'Tribe6 Studio Portfolio',
      }),
    });
    const result = await response.json();
    if (result.success) formSent.value = true;
    else throw new Error(result.message || 'Submission failed');
  } catch (err) {
    console.error('Web3Forms Error:', err);
    formErrors.value.message = 'Send failed — please email us directly.';
  } finally {
    formLoading.value = false
  }
}
</script>

<style scoped>
/* Copying styles from Portfolio.vue */
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  background: #007BFF;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0,123,255,0.4), 0 0 0 1px rgba(255,255,255,0.1);
  cursor: pointer;
  z-index: 100;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.2s;
}
.fab:hover { transform: scale(1.1) rotate(5deg); background: #0069d9; }
.fab-ping {
  position: absolute;
  top: 0; right: 0;
  width: 14px; height: 14px;
  background: #28ca41;
  border: 2px solid #007BFF;
  border-radius: 50%;
  animation: ping 2s infinite;
}
@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,8,14,0.85);
  backdrop-filter: blur(14px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-box {
  background: #14141f;
  border: 1px solid rgba(0,123,255,0.2);
  border-radius: 32px;
  width: 100%;
  max-width: 520px;
  padding: 3rem;
  position: relative;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8);
}
.modal-close {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.03);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

.modal-header { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 2.5rem; }
.modal-logo {
  width: 48px; height: 48px;
  background: #007BFF;
  color: #fff;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  border-radius: 14px;
  font-size: 1.25rem;
}
.modal-title { font-size: 1.75rem; font-weight: 900; color: #fff; margin-bottom: 0.25rem; letter-spacing: -0.02em; }
.modal-sub { font-size: 0.95rem; color: rgba(255,255,255,0.35); }

.modal-form { display: flex; flex-direction: column; gap: 1.5rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
@media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

.form-group { display: flex; flex-direction: column; gap: 0.6rem; }
.form-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.2); }
.form-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 0.9rem 1.1rem;
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.form-input:focus { outline: none; border-color: #007BFF; background: rgba(0,123,255,0.05); box-shadow: 0 0 0 4px rgba(0,123,255,0.15); }
.form-select { appearance: none; cursor: pointer; }
.form-textarea { resize: none; }
.form-error { font-size: 0.75rem; color: #ff5f57; font-weight: 600; }

.form-submit {
  margin-top: 1rem;
  background: #007BFF;
  color: #fff;
  border: none;
  font-weight: 800;
  font-size: 1rem;
  padding: 1.1rem;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.form-submit:hover:not(:disabled) { background: #0069d9; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,123,255,0.3); }
.form-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.form-privacy { font-size: 0.72rem; color: rgba(255,255,255,0.2); text-align: center; }

.modal-success { text-align: center; padding: 2rem 0; }
.success-icon { width: 64px; height: 64px; background: #28ca41; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem; }
.success-title { font-size: 1.75rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
.success-sub { color: rgba(255,255,255,0.4); margin-bottom: 1.5rem; }

.btn-ghost {
  background: transparent;
  color: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box { transform: scale(0.9) translateY(20px); }
</style>
