<script setup>
import { BaseToast } from '@/components/base';
import { TheProgress } from '@/components/layouts';

import { useToast } from '@/store';

const toast = useToast();
</script>

<template>
  <div>
    <the-progress />
    <base-toast
      :text="toast.message"
      :type="toast.type"
      v-model="toast.visible"
    />
    <router-view />
  </div>
</template>
