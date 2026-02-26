import { supabase } from '../supabase'

export function useAnalytics() {
    /**
     * Tracks a custom user click event
     * 
     * @param {string} eventName - Description of what was clicked
     * @param {object} additionalData - Any extra payload to store
     */
    const trackClick = async (eventName, additionalData = {}) => {
        try {
            // In a real scenario, we might use a separate 'events' table, 
            // but according to the plan, we just append to 'clicks'.
            // If we don't grab full request headers here from the client (since it's not the edge function),
            // we log what we can.

            const { error } = await supabase
                .from('clicks')
                .insert({
                    ip: 'client-side-event', // Client doesn't naturally know its own IP unless we fetch it
                    path: eventName,         // Reusing 'path' column to store event name
                    device: navigator.userAgent.includes('Mobi') ? 'mobile' : 'desktop',
                    browser: 'client',
                    is_blocked: false
                })

            if (error) {
                console.error('Error tracking click:', error)
            }
        } catch (err) {
            console.error('Failed to log analytics:', err)
        }
    }

    return { trackClick }
}
