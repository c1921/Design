<template>
  <video
    ref="videoRef"
    :class="props.className"
    muted
    playsinline
    disablePictureInPicture
    disableRemotePlayback
    webkit-playsinline
    :autoplay="props.autoPlay">
    <source :src="props.videoSrc" type="video/webm">
    <source :src="props.fallbackSrc" type="video/mp4">
  </video>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface VideoPlayerProps {
  videoSrc: string;
  fallbackSrc?: string;
  className?: string;
  autoPlay?: boolean;
}

const props = withDefaults(defineProps<VideoPlayerProps>(), {
  className: 'parallax-icon',
  autoPlay: false
});

// 视频引用
const videoRef = ref<HTMLVideoElement | null>(null);
// 视频是否已经加载
const isVideoLoaded = ref(false);
// 视频是否已经开始播放过
const hasStartedPlaying = ref(false);
// 存储事件监听器引用
let loadedDataHandler: (() => void) | null = null;

// 处理视频播放
const handlePlay = () => {
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
    // 创建事件监听器函数
    loadedDataHandler = () => {
      isVideoLoaded.value = true;
      // 初始化时暂停在第一帧
      videoRef.value!.currentTime = 0;
      videoRef.value!.pause();
    };
    
    // 监听视频加载完成事件
    videoRef.value.addEventListener('loadeddata', loadedDataHandler);
    
    // 监听视频播放结束事件
    videoRef.value.addEventListener('ended', handleVideoEnded);
  }
});

// 清理事件监听器，防止内存泄漏
onUnmounted(() => {
  if (videoRef.value) {
    if (loadedDataHandler) {
      videoRef.value.removeEventListener('loadeddata', loadedDataHandler);
    }
    videoRef.value.removeEventListener('ended', handleVideoEnded);
  }
});

// 暴露方法给父组件使用
defineExpose({
  play: handlePlay,
  videoRef
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