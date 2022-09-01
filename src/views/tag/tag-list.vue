<script setup>
import { ref, onMounted, reactive } from 'vue';
import { LayoutApp } from '@/layouts';
import { HeaderMenu } from '@/components/layouts/headers';
import { BaseButton, BaseState, BaseSkeleton } from '@/components/base';
import { TagCreateModal } from '@/components/tag';
import { debounce } from '@/utils';

import { useI18n } from 'vue-i18n';
import { useGetTag } from '@/compose/tag';

const { t } = useI18n();
const {
  loading: tagGetLoading,
  tag: tagData,
  filter,
  resetFilter,
  getTag,
} = useGetTag();

const tagCreateModalVisible = ref(false);
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setTag = async () => {
  try {
    if (filter.order === null) {
      filter.order = 'desc';
    }

    await getTag();
  } catch (err) {
    errorState.visible = true;
    errorState.title = t('error.client');
    errorState.text = t('error.fetch-data');
  }
};

const setTagDebounce = debounce(setTag);

const handleCreate = () => {
  tagCreateModalVisible.value = true;
};
const handleCreated = () => {
  resetFilter();
  setTag();
};
const handleSearch = (val) => {
  filter.name = val;

  setTagDebounce();
};
const handleFilter = ({ name, sort, order }) => {
  filter.name = name;
  filter.sort = sort;
  filter.order = order;

  setTag();
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
        :search-placeholder="t('tag.list.search')"
        :create-label="t('tag.create.title')"
        :filter="filter"
        v-on:search="handleSearch"
        v-on:filter="handleFilter"
        v-on:create="handleCreate"
      />
      <h1 class="font-bold text-3xl text-gray-900">
        {{ t('tag.list.title') }}
      </h1>
    </div>
    <div class="p-5">
      <base-skeleton v-if="tagGetLoading" />
      <template v-else>
        <base-state
          :title="errorState.title"
          :text="errorState.message"
          v-if="errorState.visible"
        />
        <template v-else>
          <base-state
            :title="t('error.empty', { name: 'Tag' })"
            :text="t('tag.list.text.empty')"
            v-if="tagData.count === 0"
          />
          <div class="flex flex-wrap gap-2" v-else>
            <router-link
              :to="{ name: 'TagDetail', params: { id: tag.id } }"
              v-for="tag in tagData.rows"
              :key="tag.id"
              custom
              v-slot="{ navigate }"
            >
              <base-button
                :label="tag.name"
                :badge="tag.notesCount"
                :color="tag.color"
                v-on:click="navigate"
              />
            </router-link>
          </div>
        </template>
      </template>
    </div>
    <tag-create-modal
      v-model="tagCreateModalVisible"
      v-on:created="handleCreated"
    />
  </layout-app>
</template>
