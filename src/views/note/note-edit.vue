<script setup>
import { reactive, onMounted } from 'vue';
import { LayoutApp } from '@/layouts';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import {
  BaseButton,
  BaseAlert,
  BaseSkeleton,
  BaseState,
} from '@/components/base';
import { NoteForm } from '@/components/note';

import { useRouter, useRoute } from 'vue-router';
import { useToast } from '@/store';
import { useFindNote, useUpdateNote } from '@/compose/note';

import { redirectHelper } from '@/helpers';
import { HandledError } from '@/interfaces';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const {
  body,
  validation,
  loading: loadingUpdateNote,
  setBody,
  updateNote,
} = useUpdateNote();
const { note, loading: loadingFindNote, findNote } = useFindNote();

const alert = reactive({
  visible: false,
  text: '',
});
const errorState = reactive({
  visible: false,
  title: null,
  text: null,
});

const setNote = async () => {
  try {
    await findNote(route.params.id);

    if (note.value.isTrash) {
      throw new Error();
    }

    setBody({
      name: note.value.name,
      content: note.value.content,
      tagId: note.value.tag,
    });
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
const goBack = () =>
  router.push(redirectHelper(route.query.source, { tagId: route.query.tagId }));

const handleSubmit = async () => {
  alert.visible = false;

  try {
    const res = await updateNote(note.value.id);

    toast.show(res.message, 'success');
    goBack();
  } catch (err) {
    if (!(err instanceof HandledError)) {
      alert.visible = true;
      alert.text = 'Something Error';
    }
  }
};
const handleClickBack = () => {
  goBack();
};

onMounted(() => {
  setNote();
});
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center space-x-4">
      <button class="flex items-center" v-on:click="handleClickBack">
        <icon size="20">
          <back-icon />
        </icon>
      </button>
      <h1 class="font-bold text-2xl">Edit Note</h1>
    </div>
    <div class="p-5">
      <base-skeleton v-if="loadingFindNote" />
      <template v-else>
        <base-state
          :title="errorState.title"
          :text="errorState.text"
          v-if="errorState.visible"
        />
        <template v-else-if="note">
          <base-alert
            class="mb-4"
            color="danger"
            :text="alert.text"
            v-model="alert.visible"
          />
          <form v-on:submit.prevent="handleSubmit">
            <note-form v-model="body" :validation="validation" />
            <div class="space-x-2">
              <base-button color="light" v-on:click="handleClickBack"
                >Cancel</base-button
              >
              <base-button
                type="submit"
                :loading="loadingUpdateNote"
                :disabled="loadingUpdateNote"
                >Save</base-button
              >
            </div>
          </form>
        </template>
      </template>
    </div>
  </layout-app>
</template>
