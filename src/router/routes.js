
const routes = [
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },
  {
    path: '/faker',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'faker', path: '', component: () => import('pages/FakerPage.vue') },
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
