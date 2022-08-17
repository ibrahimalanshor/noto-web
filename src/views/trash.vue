<script setup>
import { ref } from 'vue';
import { LayoutApp } from '@/layouts';
import { BaseButton } from '@/components/base';
import { HeaderMenu } from '@/components/layouts/headers';
import { TrashDeleteConfirm } from '@/components/trash';
import { NoteItem } from '@/components/note';
import { useRouter } from 'vue-router';

const router = useRouter();

const trashDeleteConfirmVisible = ref(false);

const notes = [
  {
    id: 1,
    tag: {
      color: 'primary',
      name: 'Diary',
    },
    isFavorite: false,
    createdAt: null,
    title: 'Tailwind CSS Badges - Flowbite',
    content:
      'The badge component can be used to complement other elements such as buttons or text elements as a label or to show the count of a given data, such as the number of comments for an article or how much time has passed by since a comment has been made.',
  },
  {
    id: 2,
    tag: null,
    isFavorite: false,
    createdAt: new Date(),
    title: 'Feature preview',
    content:
      'Quickly navigate and jump between your organizations or repositories and search recent issues, pull requests, projects and more with the new command palette. You can also execute time saving commands all without lifting your fingers off the keyboard!',
  },
  {
    id: 3,
    tag: {
      color: 'danger',
      name: 'Logs',
    },
    isFavorite: false,
    createdAt: new Date(),
    title: 'Reactivity for Arrays & Objects in Vue vs. Svelte',
    content:
      'Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.Teleport is a new feature introduced in Vue 3. Teleport provides better control to developers on where exactly an element is rendered. Get Teleporting Let us create a new Vue 3 app to start playing around with teleport. We will use Vite, because it is 2021. 1 npm init @vitejs/app Provide a project name (teleport) and select vue as the template.',
  },
];

const handleDeleteAll = () => {
  trashDeleteConfirmVisible.value = true;
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        search-placeholder="Search in Trash"
        :filterable="false"
        :creatable="false"
      />
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-3xl text-gray-900">Trash</h1>
        <base-button
          color="danger"
          label="Delete All"
          v-on:click="handleDeleteAll"
        />
      </div>
    </div>
    <div>
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note="note"
        back-route="/trash"
      />
    </div>
    <trash-delete-confirm
      text="Are you sure you want to delete all trash?"
      v-model="trashDeleteConfirmVisible"
    />
  </layout-app>
</template>
