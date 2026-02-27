import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase'
import { useAuth } from '../composables/useAuthSync'

import MainLayout from '../views/MainLayout.vue'
import CommandCenter from '../views/admin/CommandCenter.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Profile from '../views/public/Profile.vue'
import AdminAccess from '../views/admin/AdminAccess.vue'
import AdminFields from '../views/admin/AdminFields.vue'
import AdminGeo from '../views/admin/AdminGeo.vue'
import AdminKnowledge from '../views/admin/AdminKnowledge.vue'
import AdminChangelog from '../views/admin/AdminChangelog.vue'
import AdminSEO from '../views/admin/AdminSEO.vue'
import AdminRegistrations from '../views/admin/AdminRegistrations.vue'
import KnowledgeBase from '../views/public/KnowledgeBase.vue'
import Changelog from '../views/public/Changelog.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainLayout
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/command-center',
        name: 'CommandCenter',
        component: CommandCenter,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/security',
        name: 'AdminAccess',
        component: AdminAccess,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/schema',
        name: 'AdminFields',
        component: AdminFields,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/firewall',
        name: 'AdminGeo',
        component: AdminGeo,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/content',
        name: 'AdminKnowledge',
        component: AdminKnowledge,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/updates',
        name: 'AdminChangelog',
        component: AdminChangelog,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/seo',
        name: 'AdminSEO',
        component: AdminSEO,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/command-center/registrations',
        name: 'AdminRegistrations',
        component: AdminRegistrations,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/knowledge',
        name: 'KnowledgeBase',
        component: KnowledgeBase,
        meta: { requiresAuth: true, requiresAccess: true }
    },
    {
        path: '/changelog',
        name: 'Changelog',
        component: Changelog,
        meta: { requiresAuth: true, requiresAccess: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    try {
        // 1. Authentication Check — use cached composable state
        const { checkSession, profile: cachedProfile } = useAuth()
        const { session } = await checkSession()
        const isAuthenticated = !!session

        // 2. Edge Function IP Check (Global Geo-Block)
        // Non-blocking — runs in background so it doesn't slow navigation
        supabase.functions.invoke('process-traffic', {
            body: { path: to.fullPath }
        }).then(({ data }) => {
            if (data && data.blocked) {
                window.location.href = 'https://google.com'
            }
        }).catch(() => { })

        if (to.meta.requiresAuth && !isAuthenticated) {
            return '/login'
        }

        // 3. Admin Role Check — use cached profile from composable (no extra DB call)
        let isAdmin = false
        if (isAuthenticated) {
            isAdmin = cachedProfile.value?.role === 'admin'

            if (to.meta.requiresAdmin && !isAdmin) {
                return '/profile'
            }
        }

        // 4. Granular Page Access Check
        if (to.meta.requiresAccess && isAuthenticated && !isAdmin) {
            const { data: access } = await supabase
                .from('page_access')
                .select('id')
                .eq('user_id', session.user.id)
                .eq('page_identifier', to.path)
                .single()

            if (!access) {
                return '/profile'
            }
        }

        return true
    } catch (err) {
        // SECURITY: On any error, redirect to login — never grant access silently
        return '/login'
    }
})

export default router
