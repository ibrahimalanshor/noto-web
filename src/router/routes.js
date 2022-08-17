import { RouterView } from 'vue-router';

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/note',
    component: RouterView,
    children: [
      {
        path: '',
        redirect: {
          name: 'Home',
        },
      },
      {
        path: 'create',
        name: 'NoteCreate',
        component: () => import('@/views/note/note-create.vue'),
      },
      {
        path: ':id',
        component: RouterView,
        children: [
          {
            path: '',
            name: 'NoteDetail',
            component: () => import('@/views/note/note-detail.vue'),
          },
          {
            path: 'edit',
            name: 'NoteEdit',
            component: () => import('@/views/note/note-edit.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import('@/views/favorite.vue'),
  },
  {
    path: '/tag',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Tag',
        component: () => import('@/views/tag/tag-list.vue'),
      },
      {
        path: ':id',
        name: 'TagDetail',
        component: () => import('@/views/tag/tag-detail.vue'),
      },
    ],
  },
  {
    path: '/trash',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Trash',
        component: () => import('@/views/trash.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/register.vue'),
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'NotFound',
    },
  },
];
