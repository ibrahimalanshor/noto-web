<script setup>
import { TheSidebar } from '@/components/layouts';
</script>

<template>
  <div>
    <the-sidebar />
    <main class="ml-0 md:ml-64">
      <slot />
    </main>
  </div>
</template>
