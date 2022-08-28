<script setup>
import { LayoutApp } from '@/layouts';
import { Icon } from '@vicons/utils';
import { ArrowLeft as BackIcon } from '@vicons/carbon';
import { BaseForm, BaseTextarea, BaseButton } from '@/components/base';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const handleBack = () => {
  router.push(route.query.back || '/');
};
</script>

<template>
  <layout-app>
    <div class="p-5 border-b flex items-center space-x-4">
      <button class="flex items-center" v-on:click="handleBack">
        <icon size="20">
          <back-icon />
        </icon>
      </button>
      <h1 class="font-bold text-2xl">New Todo</h1>
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
