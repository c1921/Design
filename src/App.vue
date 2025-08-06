<script setup lang="ts">
import { onMounted } from 'vue';
import Category from './components/Category.vue';
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
      <div class="grid grid-cols-1 gap-4">
        <Category title="Category 1" description="Description for category 1"
          image="https://dummyimage.com/600x400/000000/fff" />
        <Category title="Category 2" description="Description for category 2"
          image="https://dummyimage.com/600x400/000000/fff" />
        <Category title="Category 3" description="Description for category 3"
          image="https://dummyimage.com/600x400/000000/fff" />
      </div>

    </div>
  </main>
</template>
