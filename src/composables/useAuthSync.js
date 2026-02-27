import { ref, readonly } from 'vue'
import { supabase } from '../supabase'

/**
 * useAuthSync: v1.3.3
 * Centralized, Lock-Safe initialization for Tribe6 Auth.
 */

const user = ref(null)
const session = ref(null)
const profile = ref(null)
const initialized = ref(false)
let initPromise = null

async function fetchProfile(authUser) {
    if (!authUser) return
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single()

        if (error && error.code === 'PGRST116') {
            const recoveryData = {
                id: authUser.id,
                email: authUser.email,
                full_name: authUser.user_metadata?.full_name || '',
                company: authUser.user_metadata?.company || '',
                username: authUser.user_metadata?.username || authUser.email.split('@')[0],
                role: 'user'
            }
            const { data: newProfile } = await supabase.from('profiles').insert(recoveryData).select().single()
            profile.value = newProfile
        } else {
            profile.value = data
        }
    } catch (err) {
        console.error('AuthSync: Profile fetch error:', err)
    }
}

async function initializeAuth() {
    if (initialized.value) return { user: user.value, session: session.value, profile: profile.value }
    if (initPromise) return initPromise

    initPromise = (async () => {
        try {
            // getSession is the core of the deadlock, but custom storage in supabase.js should fix it
            const { data: { session: initialSession }, error } = await supabase.auth.getSession()
            if (error) throw error

            session.value = initialSession
            user.value = initialSession?.user ?? null
            if (user.value) await fetchProfile(user.value)

            // Register listener AFTER initial check to avoid race conditions
            supabase.auth.onAuthStateChange(async (event, newSession) => {
                session.value = newSession
                user.value = newSession?.user ?? null
                if (user.value) await fetchProfile(user.value)
                else profile.value = null
            })

            initialized.value = true
            return { user: user.value, session: session.value, profile: profile.value }
        } catch (err) {
            console.error('AuthSync: Critical initialization error:', err)
            initialized.value = true
            return { user: null, session: null, profile: null }
        } finally {
            initPromise = null
        }
    })()

    return initPromise
}

export function useAuth() {
    return {
        user: readonly(user),
        session: readonly(session),
        profile: readonly(profile),
        initialized: readonly(initialized),
        checkSession: initializeAuth
    }
}
