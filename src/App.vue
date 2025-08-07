<script setup lang="ts">
import { ref } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

// 从本地 JSON 文件导入图片 URL 列表
import imageUrls from './assets/imageList.json'

// 定义类型（可选，但推荐）
interface ImageItem {
  url: string
  alt: string
}

// 将字符串数组映射为 Waterfall 需要的格式
const list = ref<ImageItem[]>(
  imageUrls.map((url: string) => ({
    url,
    alt: 'image'
  }))
)
</script>


<template>
  <header class="pt-15">
    <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
  </header>

  <main class="h-screen">
    <div class="container mx-auto px-4">

      <Waterfall :list="list" :column="4" :gap="16">
        <template #item="{ item }">
          <div class="item-box">
            <img :src="item.url" :alt="item.alt" style="width: 100%" />
          </div>
        </template>
      </Waterfall>

    </div>
  </main>
</template>
