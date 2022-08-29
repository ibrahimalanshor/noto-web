<script setup>
import { reactive, onMounted } from 'vue';
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
import { NoteItem } from '@/components/note';
import { BaseState, BaseSkeleton } from '@/components/base';
import { debounce } from '@/utils';

import { useRouter } from 'vue-router';
import { useGetNote } from '@/compose/note';

const router = useRouter();
const { note, loading, filter, getNote } = useGetNote();

const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setNote = async () => {
  try {
    filter.isTrash = false;
    filter.isFavorite = true;
    filter.order = 'desc';

    await getNote();
  } catch (err) {
    errorState.visible = true;
    errorState.title = 'Something Error';
    errorState.text = 'Something error when displaying data';
  }
};
const setNoteDebounce = debounce(setNote);

const handleCreate = () => {
  router.push({ name: 'NoteCreate' });
};
const handleSearch = (val) => {
  filter.name = val;

  setNoteDebounce();
};
const handleFilter = ({ name, sort, order }) => {
  filter.name = name;
  filter.sort = sort;
  filter.order = order;

  setNote();
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
        create-label="New Note"
        :filter="filter"
        v-on:search="handleSearch"
        v-on:filter="handleFilter"
        v-on:create="handleCreate"
      />
      <h1 class="font-bold text-3xl text-gray-900">Favorite</h1>
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
          title="Favorite Note empty"
          text="Crate New Empty"
          v-else-if="note.count === 0"
        ></base-state>
        <note-item
          v-for="note in note.rows"
          :key="note.id"
          :note="note"
          v-else
        />
      </template>
    </div>
  </layout-app>
</template>
