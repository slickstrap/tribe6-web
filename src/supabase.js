// Supabase: v1.3.3 - DEFINITIVE LOCK BYPASS
import { createClient } from '@supabase/supabase-js'

console.log('Supabase: v1.3.3 Client Initializing with Lock Bypass...')

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * DEFINITIVE FIX: Custom Storage Wrapper
 * This bypasses Supabase's internal 'SupportedStorage' class that attempts to utilize
 * the 'Navigator LockManager', which is currently deadlocking in the user's browser.
 */
const customStorage = {
    getItem: (key) => {
        return window.localStorage.getItem(key)
    },
    setItem: (key, value) => {
        window.localStorage.setItem(key, value)
    },
    removeItem: (key) => {
        window.localStorage.removeItem(key)
    },
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: customStorage // Definitive bypass of Lock Manager
    }
})
