<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

interface ImageItem {
    url: string
    alt: string
}

// 接收 JSON 文件路径作为 props
const props = defineProps<{
    path: string
}>()

const list = ref<ImageItem[]>([])

// 加载 JSON 并转换格式
const loadJson = async () => {
    try {
        const res = await fetch(props.path)
        const urls: string[] = await res.json()
        list.value = urls.map(url => ({
            url,
            alt: 'image'
        }))
    } catch (error) {
        console.error('Failed to load JSON:', error)
        list.value = []
    }
}

// 组件加载时或路径变化时重新加载
onMounted(loadJson)
watch(() => props.path, loadJson)
</script>

<template>
    <Waterfall :list="list" :gutter="10" :backgroundColor="'(0,0,0,0)'">
        <template #item="{ item }">
            <div class="item-box">
                <img :src="item.url" :alt="item.alt" style="width: 100%" />
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
