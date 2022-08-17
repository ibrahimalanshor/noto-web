<script setup>
import { BaseButton } from '@/components/base';
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center text-center">
    <div class="px-4">
      <h1 class="font-bold text-4xl mb-2">404 Not Found</h1>
      <p class="leading-loose text-lg mb-4">
        The page you are looking for could not be found
      </p>
      <router-link :to="{ name: 'Home' }" custom v-slot="{ navigate }">
        <base-button v-on:click="navigate" label="Go Home" color="light" />
      </router-link>
    </div>
  </div>
</template>
