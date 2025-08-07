<script setup lang="ts">
import ImageWaterfall from './components/ImageWaterfall.vue'
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});
</script>

<template>
  <header class="pt-15">
    <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
  </header>

  <main class="h-screen">
    <div class="container mx-auto px-4">
      <!-- 传入本地 JSON 文件路径（必须是 public 路径或远程） -->
      <ImageWaterfall path="/imageList.json" />
    </div>
  </main>
</template>
