<script setup lang="ts">
import ImageGallery from './components/ImageGallery.vue'
import { ref, onMounted } from 'vue';

// 开发模式标志，可以通过环境变量控制
const isDevelopment = import.meta.env.DEV; // Vite提供的环境变量
const useDevMode = ref(isDevelopment);

// 初始化应用
onMounted(() => {
  // 首页加载完成后初始化必要功能
  setTimeout(() => window.HSStaticMethods.autoInit(), 100);
  
  // 开发环境下的快捷键切换开发模式
  if (isDevelopment) {
    window.addEventListener('keydown', (e) => {
      // 按下Ctrl+D切换开发模式
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        useDevMode.value = !useDevMode.value;
        console.log('开发模式:', useDevMode.value ? '开启' : '关闭');
      }
    });
  }
});
</script>

<template>
  <!-- 主应用内容，直接显示 -->
  <main class="h-screen overflow-y-auto">
    <div class="pt-15">
      <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
    </div>
    
    <div class="container mx-auto px-4 py-8">
      <ImageGallery />
    </div>

    <!-- 开发模式切换按钮 -->
    <div v-if="isDevelopment" class="fixed bottom-4 right-4">
      <button @click="useDevMode = !useDevMode" class="btn btn-circle btn-sm">
        <span class="icon-[tabler--code]"></span>
      </button>
    </div>
  </main>
</template>

<style scoped>
/* 确保Tailwind的group-hover类正常工作 */
</style>
