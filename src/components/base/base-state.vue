<script setup>
const props = defineProps({
  title: {
    type: null,
    required: true,
  },
  text: {
    type: null,
    required: true,
  },
});
</script>

<template>
  <div class="h-40 text-center flex items-center justify-center">
    <div>
      <h1 class="text-2xl font-bold mb-2">{{ props.title }}</h1>
      <p class="leading-loose">{{ props.text }}</p>
    </div>
  </div>
</template>
