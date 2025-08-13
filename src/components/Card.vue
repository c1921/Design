<template>
  <div
    class="cursor-pointer relative rounded-box my-150 bg-base-100/80 group hover:bg-base-100/50 transition duration-500"
    aria-haspopup="dialog"
    aria-expanded="false"
    :aria-controls="modalId"
    :data-overlay="`#${modalId}`"
    @mouseenter="handleCardHover">
    
    <CardGradientBackground />
    
    <!-- 视差图标容器，使用绝对定位 -->
    <div class="absolute left-5 top-1/2 -translate-y-1/2 z-20 overflow-visible">
      <VideoPlayer
        ref="videoPlayerRef"
        :video-src="videoSrc"
        :fallback-src="fallbackSrc"
        :class-name="videoClassName"
      />
    </div>
    
    <!-- 卡片内容，不受图标影响 -->
    <div class="flex items-center z-10 relative p-6 min-h-[100px]">
      <!-- 为图标预留空间 -->
      
      <div class="flex flex-col items-center w-full">
        <h2 class="card-title text-center">{{ title }}</h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardGradientBackground from './CardGradientBackground.vue';
import VideoPlayer from './VideoPlayer.vue';
import { ref } from 'vue';
import cubeVideo from '../assets/cube.webm';

interface CardProps {
  title?: string;
  modalId: string;
  videoSrc?: string;
  fallbackSrc?: string;
  videoClassName?: string;
}

withDefaults(defineProps<CardProps>(), {
  videoSrc: cubeVideo,
  videoClassName: 'parallax-icon'
});

// VideoPlayer 组件引用
const videoPlayerRef = ref<InstanceType<typeof VideoPlayer> | null>(null);

// 处理卡片悬浮事件
const handleCardHover = () => {
  // 委托给 VideoPlayer 组件处理
  if (videoPlayerRef.value) {
    videoPlayerRef.value.play();
  }
};
</script>

<style scoped>
/* 卡片特定样式 */
</style>