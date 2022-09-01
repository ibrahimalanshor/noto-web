<script setup>
import { BaseButton } from '@/components/base';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center text-center">
    <div class="px-4">
      <h1 class="font-bold text-4xl mb-2">{{ t('not-found.title') }}</h1>
      <p class="leading-loose text-lg mb-4">
        {{ t('not-found.message') }}
      </p>
      <router-link :to="{ name: 'Home' }" custom v-slot="{ navigate }">
        <base-button
          v-on:click="navigate"
          :label="t('not-found.redirect-home')"
          color="light"
        />
      </router-link>
    </div>
  </div>
</template>
