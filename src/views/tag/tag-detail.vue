<script setup>
import { ref, reactive, onMounted } from 'vue';
import { LayoutApp } from '@/layouts';
import { BaseButton, BaseState, BaseSkeleton } from '@/components/base';
import { Icon } from '@vicons/utils';
import {
  Edit as EditIcon,
  TrashCan as TrashIcon,
  ArrowLeft as BackIcon,
} from '@vicons/carbon';
import { HeaderMenu } from '@/components/layouts/headers';
import { TagEditModal, TagDeleteConfirm } from '@/components/tag';
import { NoteItem } from '@/components/note';

import { debounce } from '@/utils';
import { HandledError } from '@/interfaces';

import { useRouter, useRoute } from 'vue-router';
import { useFindTag } from '@/compose/tag';
import { useGetNote } from '@/compose/note';

const router = useRouter();
const route = useRoute();
const { tag, loading: loadingFindTag, findTag } = useFindTag();
const {
  note: noteData,
  loading: loadingGetNote,
  filter: filterGetNote,
  getNote,
} = useGetNote();

const tagEditModalVisible = ref(false);
const tagDeleteConfirmVisible = ref(false);
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setNote = async () => {
  try {
    filterGetNote.tagId = tag.value.id;
    filterGetNote.isTrash = false;

    if (filterGetNote.order === null) {
      filterGetNote.order = 'desc';
    }

    await getNote();
  } catch (err) {
    errorState.visible = true;
    errorState.title = 'Something Error';
    errorState.text = 'Something error when displaying data';
  }
};

const setNoteDebounce = debounce(setNote);

const setTag = async () => {
  try {
    await findTag(route.params.id);
    await setNote();
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

const handleCreateNote = () => {
  router.push({
    name: 'NoteCreate',
    query: { source: tag.value ? route.path : '/tag' },
  });
};
const handleEdit = () => {
  tagEditModalVisible.value = true;
};
const handleDelete = () => {
  tagDeleteConfirmVisible.value = true;
};
const handleUpdated = () => {
  setTag();
};
const handleSearch = (val) => {
  filterGetNote.name = val;

  setNoteDebounce();
};
const handleFilter = ({ name, sort, order }) => {
  filterGetNote.name = name;
  filterGetNote.sort = sort;
  filterGetNote.order = order;

  setNote();
};

onMounted(() => {
  setTag();
});
</script>

<template>
  <layout-app>
    <div class="p-5 border-b">
      <header-menu
        class="mb-6"
        create-label="New Note"
        :filter="filterGetNote"
        v-on:search="handleSearch"
        v-on:filter="handleFilter"
        v-on:create="handleCreateNote"
      />
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link :to="{ name: 'Tag' }" custom v-slot="{ navigate }">
            <button class="flex items-center mt-1" v-on:click="navigate">
              <icon size="20">
                <back-icon />
              </icon>
            </button>
          </router-link>
          <h1 class="font-bold text-3xl text-gray-900" v-if="tag">
            Tags: {{ tag.name }}
          </h1>
        </div>
        <div class="flex space-x-2" v-if="tag">
          <base-button
            color="primary"
            class="flex items-center"
            v-on:click="handleEdit"
          >
            <icon size="16">
              <edit-icon />
            </icon>
          </base-button>
          <base-button
            color="danger"
            class="flex items-center"
            v-on:click="handleDelete"
          >
            <icon size="16">
              <trash-icon />
            </icon>
          </base-button>
        </div>
      </div>
    </div>
    <div>
      <div class="p-5" v-if="loadingFindTag || loadingGetNote">
        <base-skeleton />
      </div>
      <template v-else>
        <base-state
          :title="errorState.title"
          :text="errorState.text"
          v-if="errorState.visible"
        />
        <base-state
          title="Note empty"
          text="Crate New Empty"
          v-else-if="noteData.count === 0"
        ></base-state>
        <note-item
          v-for="note in noteData.rows"
          :key="note.id"
          :note="note"
          :source="route.path"
          v-else
        />
      </template>
    </div>
    <tag-edit-modal
      :tag="tag"
      v-on:updated="handleUpdated"
      v-model="tagEditModalVisible"
    />
    <tag-delete-confirm :tag="tag" v-model="tagDeleteConfirmVisible" />
  </layout-app>
</template>
