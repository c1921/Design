<script setup lang="ts">
import ImageGallery from './components/ImageGallery.vue'
import { ref, onMounted } from 'vue';

// 开发模式标志，可以通过环境变量控制
const isDevelopment = import.meta.env.DEV; // Vite提供的环境变量
const useDevMode = ref(isDevelopment);

// 应用状态
const isResourcesLoading = ref(false); // 资源加载状态
const loadingProgress = ref(0); // 加载进度

// 初始化应用
onMounted(() => {
  // 首页加载完成后初始化必要功能
  setTimeout(() => window.HSStaticMethods.autoInit(), 100);
  
  // 延迟开始预加载资源
  setTimeout(() => {
    startBackgroundLoading();
  }, 1000); // 延迟1秒后开始加载，让首页有时间渲染
  
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

// 后台预加载资源
const startBackgroundLoading = async () => {
  if (isResourcesLoading.value) return;
  isResourcesLoading.value = true;
  
  console.log('开始后台加载资源...');
  
  try {
    // 优先加载第一个标签页（3C）的图片
    console.log('加载3C图片...');
    await preloadJsonImages('/3c-images.json', 0, 40);
    
    // 然后加载其他标签页的图片
    console.log('加载室内图片...');
    await preloadJsonImages('/indoor-images.json', 40, 70);
    
    console.log('加载其他图片...');
    await preloadJsonImages('/other-images.json', 70, 100);
    
    console.log('所有资源加载完成！');
  } catch (error) {
    console.error('资源加载错误:', error);
  } finally {
    isResourcesLoading.value = false;
    loadingProgress.value = 100;
  }
};

// 预加载JSON文件中的图片
const preloadJsonImages = async (jsonUrl: string, progressStart: number, progressEnd: number) => {
  try {
    const response = await fetch(jsonUrl);
    const urls = await response.json();
    await preloadImages(urls, progressStart, progressEnd);
  } catch (error) {
    console.error(`Failed to load images from ${jsonUrl}:`, error);
  }
};

// 预加载图片
const preloadImages = async (urls: string[], progressStart: number, progressEnd: number) => {
  const total = urls.length;
  let loaded = 0;
  let lastLoggedProgress = 0;

  const promises = urls.map(url => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        // 更新加载进度
        const progress = progressStart + (progressEnd - progressStart) * (loaded / total);
        loadingProgress.value = Math.round(progress);
        
        // 每10%记录一次进度
        const currentProgress = Math.floor(progress / 10) * 10;
        if (currentProgress > lastLoggedProgress) {
          console.log(`资源加载进度: ${currentProgress}%`);
          lastLoggedProgress = currentProgress;
        }
        
        resolve();
      };
      img.onerror = () => {
        loaded++;
        // 即使加载失败也更新进度
        const progress = progressStart + (progressEnd - progressStart) * (loaded / total);
        loadingProgress.value = Math.round(progress);
        resolve(); // 即使加载失败也继续
      };
      img.src = url;
    });
  });

  await Promise.all(promises);
};
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
