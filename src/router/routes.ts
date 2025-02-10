import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/CameraPage.vue')
      },
      {
        path: '/dictionary',
        name: 'dictionary',
        component: () => import('pages/DictionaryPage.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/SettingsPage.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('pages/AboutUsPage.vue'),
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: () => import('pages/PrivacyPolicyPage.vue'),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
