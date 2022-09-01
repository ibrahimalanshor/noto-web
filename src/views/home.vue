<script setup>
import { reactive, onMounted } from 'vue';
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
import { NoteItem } from '@/components/note';
import { BaseState, BaseSkeleton } from '@/components/base';
import { debounce } from '@/utils';
import { setupTitle } from '@/helpers';

import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useGetNote } from '@/compose/note';

const { t } = useI18n();
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

    if (filter.order === null) {
      filter.order = 'desc';
    }

    await getNote();
  } catch (err) {
    errorState.visible = true;
    errorState.title = t('error.client');
    errorState.text = t('error.fetch-data');
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

setupTitle(t('page.home'));
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        :create-label="t('note.create.title')"
        :filter="filter"
        v-on:search="handleSearch"
        v-on:filter="handleFilter"
        v-on:create="handleCreate"
      />
      <h1 class="font-bold text-3xl text-gray-900">
        {{ t('note.list.title') }}
      </h1>
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
          :title="t('error.empty', { name: 'Note' })"
          :text="t('note.list.text.empty')"
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
