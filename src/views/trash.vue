<script setup>
import { ref, reactive, onMounted } from 'vue';
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
import { NoteItem } from '@/components/note';
import { BaseButton, BaseState, BaseSkeleton } from '@/components/base';
import { TrashDeleteConfirm } from '@/components/trash';
import { debounce } from '@/utils';

import { useRouter, useRoute } from 'vue-router';
import { useGetNote } from '@/compose/note';

const router = useRouter();
const route = useRoute();
const { note, loading, filter, getNote } = useGetNote();

const trashDeleteConfirmVisible = ref(false);
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setNote = async () => {
  try {
    filter.isTrash = true;

    if (filter.order === null) {
      filter.order = 'desc';
    }

    await getNote();
  } catch (err) {
    errorState.visible = true;
    errorState.title = 'Something Error';
    errorState.text = 'Something error when displaying data';
  }
};
const setNoteDebounce = debounce(setNote);

const handleDeleteAll = () => {
  trashDeleteConfirmVisible.value = true;
};
const handleSearch = (val) => {
  filter.name = val;

  setNoteDebounce();
};

onMounted(() => {
  setNote();
});
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        search-placeholder="Search in Trash"
        v-on:search="handleSearch"
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
      <div class="p-5" v-if="loading">
        <base-skeleton />
      </div>
      <template v-else>
        <base-state
          :title="errorState.title"
          :text="errorState.text"
          v-if="errorState.visible"
        />
        <base-state
          title="Trash Note empty"
          text="Crate New Empty"
          v-else-if="note.count === 0"
        ></base-state>
        <note-item
          v-for="note in note.rows"
          :key="note.id"
          :note="note"
          :source="route.path"
          v-else
        />
      </template>
    </div>
    <trash-delete-confirm
      text="Are you sure you want to delete all trash?"
      v-model="trashDeleteConfirmVisible"
    />
  </layout-app>
</template>
