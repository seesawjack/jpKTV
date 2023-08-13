import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/Home/Index.vue';

import SongEdit from './pages/Song/SongEdit.vue';
import SongList from './pages/Song/SongList.vue';
import SongItem from './pages/Song/SongItem.vue';

import AuthPage from './pages/Auth/Index.vue';
import OnboardingPage from './pages/Auth/OnboardingPage.vue';
import PasswordForget from './pages/Auth/PasswordForget.vue';
import PasswordUpdate from './pages/Auth/PasswordUpdate.vue';

import AboutPage from './pages/about/Index.vue';

import FeedBackPage from './pages/FeedBack/Index.vue';

// import NotFound from './pages/NotFound.vue';

import useSupabase from './stores/supabase';
const { supabase } = useSupabase();
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/song/search' },
        {
            path: '/song',
            children: [
                { path: 'search', component: HomePage },
                { path: 'upload', component: SongEdit },
                { path: 'personal/list', component: SongList },
                { path: 'recommend/list', component: SongList },
                { path: 'item', component: SongItem }
            ]
        },
        { path: '/login', component: AuthPage },
        { path: '/signup', component: AuthPage },
        { path: '/onboarding', component: OnboardingPage },
        {
            path: '/account',
            children: [
                {
                    path: 'forget-password',
                    component: PasswordForget
                },
                {
                    path: 'update-password',
                    component: PasswordUpdate
                },
            ]
        },
        { path: '/about', component: AboutPage },
        { path: '/feedback', component: FeedBackPage },
        { path: '/:notFound(.*)', redirect: '/song/search' }
    ],
});

router.beforeEach(async (to, from) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (to.fullPath === '/login' || to.fullPath === '/signup') {
        if (session?.user) {
            return '/song/search'
        }
    }
    return true
})

export default router;