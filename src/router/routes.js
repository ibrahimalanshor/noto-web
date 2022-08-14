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
        path: 'create',
        name: 'NoteCreate',
        component: () => import('@/views/note/note-create.vue'),
      },
      {
        path: ':id',
        name: 'NoteDetail',
        component: () => import('@/views/note/note-detail.vue'),
      },
    ],
  },
];
