<template>
  <div
    class="cursor-pointer relative rounded-box p-2.5 bg-base-100/80 group hover:bg-base-100/50 transition duration-500"
    aria-haspopup="dialog" aria-expanded="false" :aria-controls="modalId" :data-overlay="`#${modalId}`"
    @mouseenter="handleMouseEnter">
    
    <CardGradientBackground />
    
    <div class="flex items-center gap-3 z-10 relative p-2">
      <!-- 动态图标 -->
      <div class="flex-shrink-0 overflow-visible">
        <video 
          ref="videoRef"
          class="object-contain"
          muted playsinline>
          <source src="../assets/cube.webm" type="video/webm">
        </video>
      </div>
      
      <div class="flex flex-col">
        <h2 class="card-title">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardGradientBackground from './CardGradientBackground.vue';
import { ref, onMounted } from 'vue';

defineProps<{
  title?: string;
  modalId: string;
}>();

// 视频引用
const videoRef = ref<HTMLVideoElement | null>(null);
// 视频是否已经加载
const isVideoLoaded = ref(false);
// 视频是否已经开始播放过
const hasStartedPlaying = ref(false);

// 处理鼠标悬浮事件
const handleMouseEnter = () => {
  if (!videoRef.value || !isVideoLoaded.value) return;
  
  // 如果视频尚未开始播放过，或者已经播放完毕，则开始播放
  if (!hasStartedPlaying.value || videoRef.value.ended) {
    // 重置到开始位置
    videoRef.value.currentTime = 0;
    videoRef.value.play();
    hasStartedPlaying.value = true;
  }
  // 如果视频正在播放中，不做任何处理，让它继续播放
};

// 视频播放结束处理
const handleVideoEnded = () => {
  if (!videoRef.value) return;
  // 播放结束时，停在最后一帧
  videoRef.value.currentTime = videoRef.value.duration;
};

onMounted(() => {
  if (videoRef.value) {
    // 监听视频加载完成事件
    videoRef.value.addEventListener('loadeddata', () => {
      isVideoLoaded.value = true;
      // 初始化时暂停在第一帧
      videoRef.value!.currentTime = 0;
      videoRef.value!.pause();
    });
    
    // 监听视频播放结束事件
    videoRef.value.addEventListener('ended', handleVideoEnded);
  }
});
</script>

<style scoped>
/* 自定义样式 */
</style> 