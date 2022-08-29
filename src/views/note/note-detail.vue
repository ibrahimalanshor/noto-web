<script setup>
import { ref, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import { LayoutApp } from '@/layouts';
import {
  BaseForm,
  BaseTextarea,
  BaseButton,
  BaseDot,
  BaseState,
  BaseSkeleton,
} from '@/components/base';
import { NoteDeleteConfirm } from '@/components/note';
import { Icon } from '@vicons/utils';
import {
  Star as FavoriteIcon,
  Edit as EditIcon,
  TrashCan as TrashIcon,
  ArrowLeft as BackIcon,
} from '@vicons/carbon';

import { noteHelper } from '@/helpers';
import { HandledError } from '@/interfaces';

import { useRouter, useRoute } from 'vue-router';
import { useFindNote } from '@/compose/note';

const router = useRouter();
const route = useRoute();
const { note, loading, findNote } = useFindNote();

const noteDeleteConfirmVisible = ref(false);
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setNote = async () => {
  try {
    await findNote(route.params.id);
  } catch (err) {
    if (!(err instanceof HandledError)) {
      errorState.visible = true;
      errorState.title = 'Something Error';
      errorState.text = 'Something error when displaying data';
    } else {
      errorState.visible = true;
      errorState.title = err.errors.name;
      errorState.text = err.errors.message;
    }
  }
};

const handleDelete = () => {
  noteDeleteConfirmVisible.value = true;
};
const handleBack = () => {
  router.push(route.query.back || '/');
};

onMounted(() => {
  setNote();
});
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center justify-between">
      <div class="text-gray-600 flex">
        <button class="flex items-center" v-on:click="handleBack">
          <icon size="20">
            <back-icon />
          </icon>
        </button>
      </div>
      <div class="flex space-x-2" v-if="note">
        <base-button class="flex items-center" color="warning">
          <icon size="16">
            <favorite-icon />
          </icon>
        </base-button>
        <router-link
          :to="{ name: 'NoteEdit', params: { id: route.params.id } }"
          v-slot="{ navigate }"
        >
          <base-button
            class="flex items-center h-full"
            color="primary"
            v-on:click="navigate"
          >
            <icon size="16">
              <edit-icon />
            </icon>
          </base-button>
        </router-link>
        <base-button
          class="flex items-center"
          color="danger"
          v-on:click="handleDelete"
        >
          <icon size="16">
            <trash-icon />
          </icon>
        </base-button>
      </div>
    </div>
    <div class="px-5 py-6">
      <base-skeleton v-if="loading" />
      <template v-else>
        <base-state
          :title="errorState.title"
          :text="errorState.text"
          v-if="errorState.visible"
        />
        <div class="leading-loose text-gray-900" v-else-if="note">
          <div class="flex items-center justify-between text-gray-600">
            <div class="flex items-center space-x-2 mb-4">
              <base-dot :color="note.tag?.color" />
              <span>{{ note.tag?.name ?? 'No Tag' }}</span>
            </div>
            {{ noteHelper.formatDate(note.createdAt) }}
          </div>
          <h1 class="font-bold text-3xl text-gray-900 mb-5">{{ note.name }}</h1>
          {{ note.content }}
        </div>
      </template>
    </div>
    <note-delete-confirm v-model="noteDeleteConfirmVisible" />
  </layout-app>
</template>
