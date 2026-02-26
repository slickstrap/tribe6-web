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
        // 1. Authentication Check
        const { checkSession } = useAuth()
        const { session } = await checkSession()
        const isAuthenticated = !!session

        // 2. Edge Function IP Check (Global Geo-Block)
        // Run this now that session/auth is stable
        supabase.functions.invoke('process-traffic', {
            body: { path: to.fullPath }
        }).then(({ data }) => {
            if (data && data.blocked) {
                window.location.href = 'https://google.com'
            }
        }).catch(err => console.error('Traffic process error:', err))

        if (to.meta.requiresAuth && !isAuthenticated) {
            return '/login'
        }

        // 3. Admin Role Check
        let isAdmin = false
        if (isAuthenticated) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single()

            isAdmin = profile?.role === 'admin'

            if (to.meta.requiresAdmin && !isAdmin) {
                return '/profile' // Redirect non-admins trying to access /admin
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
                return '/profile' // Redirect if no explicit access granted
            }
        }

        // Pass along safely
        return true
    } catch (err) {
        console.error('Router navigation error:', err)
        return true
    }
})

export default router
