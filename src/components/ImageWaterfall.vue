<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

interface ImageItem {
  url: string
  alt: string
}

const props = defineProps<{
  path: string
}>()

const list = ref<ImageItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const abortController = ref<AbortController | null>(null)

// 加载 JSON 并转换格式
const loadJson = async () => {
  loading.value = true
  error.value = null
  
  // 取消之前的请求
  if (abortController.value) {
    abortController.value.abort()
  }
  
  abortController.value = new AbortController()

  try {
    const res = await fetch(props.path, {
      signal: abortController.value.signal,
      headers: { 'Cache-Control': 'max-age=300' } // 5分钟缓存
    })
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    
    const urls: string[] = await res.json()
    
    if (!Array.isArray(urls)) {
      throw new Error('Invalid JSON format: expected array')
    }
    
    list.value = urls.map(url => ({
      url,
      alt: url.split('/').pop()?.split('.')[0] || 'image' // 更好的alt文本
    }))
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      error.value = `加载失败: ${err.message}`
      console.error('Failed to load JSON:', err)
    }
  } finally {
    loading.value = false
    abortController.value = null
  }
}

// 组件加载时或路径变化时重新加载
onMounted(loadJson)
watch(() => props.path, loadJson)

// 组件卸载时取消请求
onUnmounted(() => {
  if (abortController.value) {
    abortController.value.abort()
  }
})
</script>

<template>
  <div v-if="loading" class="flex justify-center py-8">
    <div class="loading loading-spinner loading-lg"></div>
  </div>
  
  <div v-else-if="error" class="alert alert-error">
    <span>{{ error }}</span>
    <button @click="loadJson" class="btn btn-sm">重试</button>
  </div>
  
  <div v-else-if="list.length === 0" class="text-center py-8 text-base-content/60">
    暂无图片数据
  </div>
  
  <Waterfall
    v-else
    :list="list"
    :gutter="10"
    :backgroundColor="'(0,0,0,0)'"
    :lazyload="true"
    :animationDelay="200"
    imgSelector="url"
    :crossOrigin="false">
    <template #item="{ item }">
      <div class="item-box">
        <LazyImg :url="item.url" :alt="item.alt" />
      </div>
    </template>
  </Waterfall>
</template>

<style scoped>
.item-box {
    border-radius: 8px;
    overflow: hidden;
}
</style>
