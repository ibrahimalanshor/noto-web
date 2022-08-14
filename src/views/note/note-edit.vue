<script setup>
import { LayoutApp } from '@/layouts';
import { BaseForm, BaseTextarea, BaseButton } from '@/components/base';
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center justify-between">
      <h1 class="font-bold text-3xl text-gray-900">Edit Note</h1>
      <router-link
        :to="{ name: 'NoteDetail', params: { id: 1 } }"
        v-slot="{ navigate }"
      >
        <base-button color="light" v-on:click="navigate">Back</base-button>
      </router-link>
    </div>
    <div class="p-5">
      <base-form type="text" placeholder="Title" label="Title" />
      <base-form type="text" placeholder="Tags" label="Tags" />
      <base-form label="Content">
        <base-textarea placeholder="Content" />
      </base-form>
      <div class="space-x-2">
        <base-button color="light">Save as Draft</base-button>
        <base-button>Save</base-button>
      </div>
    </div>
  </layout-app>
</template>
