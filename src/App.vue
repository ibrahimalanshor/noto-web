<script setup>
import { BaseToast } from '@/components/base';

import { useToast } from '@/store';

const toast = useToast();
</script>

<template>
  <div>
    <base-toast
      :text="toast.message"
      :type="toast.type"
      v-model="toast.visible"
    />
    <router-view />
  </div>
</template>
