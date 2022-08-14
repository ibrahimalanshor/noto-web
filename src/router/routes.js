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
];
