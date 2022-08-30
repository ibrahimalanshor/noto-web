<script setup>
import { reactive } from 'vue';
import { LayoutApp } from '@/layouts';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import { BaseButton, BaseAlert } from '@/components/base';
import { NoteForm } from '@/components/note';

import { redirectHelper } from '@/helpers';

import { useRouter, useRoute } from 'vue-router';
import { useToast } from '@/store';
import { useCreateNote } from '@/compose/note';
import { HandledError } from '@/interfaces';

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { body, validation, loading, createNote } = useCreateNote();

const alert = reactive({
  visible: false,
  text: '',
});

const goBack = () =>
  router.push(redirectHelper(route.query.source, { tagId: route.query.tagId }));

const handleSubmit = async () => {
  alert.visible = false;

  try {
    const res = await createNote();

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
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center space-x-4">
      <button class="flex items-center" v-on:click="handleClickBack">
        <icon size="20">
          <back-icon />
        </icon>
      </button>
      <h1 class="font-bold text-2xl">New Note</h1>
    </div>
    <div class="p-5">
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
          <base-button type="submit" :loading="loading" :disabled="loading"
            >Save</base-button
          >
        </div>
      </form>
    </div>
  </layout-app>
</template>
