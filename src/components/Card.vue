<template>
  <div
    class="cursor-pointer relative rounded-box my-150 bg-base-100/80 group hover:bg-base-100/50 transition duration-500"
    aria-haspopup="dialog" aria-expanded="false" :aria-controls="modalId" :data-overlay="`#${modalId}`"
    @mouseenter="handleMouseEnter">
    
    <CardGradientBackground />
    
    <!-- 视差图标容器，使用绝对定位 -->
    <div class="absolute left-5 top-1/2 -translate-y-1/2 z-20 overflow-visible">
      <video 
        ref="videoRef"
        class="parallax-icon"
        muted 
        playsinline
        disablePictureInPicture
        disableRemotePlayback
        webkit-playsinline>
        <source src="../assets/cube.webm" type="video/webm">
      </video>
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
/**
 * 视差图标动画关键帧定义
 * from: 动画起始状态
 * to: 动画结束状态
 * 这里定义了图标从初始状态到结束状态的变化
 */
@keyframes icon-parallax {
  from { 
    transform: translateY(200px); /* 初始位置 */
  }
  to { 
    transform: translateY(-200px); /* 最终位置 */
  }
}

/**
 * CSS Scroll-Driven Animations 应用于图标
 * 这是一种新的CSS功能，允许动画由页面滚动或元素可见性驱动
 * 而不是由时间驱动
 */
.parallax-icon {
  /* 基本样式设置 */
  position: relative;
  transform-origin: center; /* 变换原点设置为中心点 */
  will-change: transform, opacity; /* 提示浏览器这些属性将会变化，优化性能 */
  z-index: 30; /* 确保显示在其他元素上方 */
  
  /* === CSS Scroll-Driven Animations 核心设置 === */
  
  /* 1. 应用我们定义的动画 */
  animation: icon-parallax linear; /* linear表示动画进度与滚动进度线性对应 */
  
  /* 2. 设置动画时间线为view()
   * view(): 基于元素在视口中的可见性
   * 与传统的scroll()不同，view()考虑元素本身在视口中的位置
   * 而不是页面的绝对滚动位置
   */
  animation-timeline: view();
  
  /* 3. 设置动画范围
   * entry: 元素进入视口的时刻
   * exit: 元素离开视口的时刻
   * 
   * entry 10%: 当元素进入视口并向上滚动了10%的可视区域高度时开始动画
   * exit 60%: 当元素还有40%即将离开视口时结束动画
   * 
   * 这样设置可以让动画在元素可见期间的大部分时间内平滑进行
   * 避免了突然的跳变
   */
  animation-range: entry 0% exit 100%;
}
</style> 