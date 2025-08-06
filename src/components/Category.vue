<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image?: string
}>()
</script>

<template>
  <div class="p-6 bg-base-200 rounded-box">
    <img v-if="image" :src="image" :alt="title" class="w-full h-48 object-cover mb-4 rounded-box">
    <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>
