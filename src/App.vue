<script setup lang="ts">
import ImageGallery from './components/ImageGallery.vue'
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});
</script>

<template>
  <main class="h-screen overflow-y-auto">
    <div class="pt-15">
      <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
    </div>
    
    <div class="container mx-auto px-4 py-8">
      <ImageGallery />
    </div>
  </main>
</template>

<style scoped>
/* 确保Tailwind的group-hover类正常工作 */
</style>
