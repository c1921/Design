<script setup lang="ts">
import ImageWaterfall from './components/ImageWaterfall.vue'
import FullscreenModal from './components/FullscreenModal.vue'
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});

const tabs = [
  { id: '3c', icon: 'device-laptop', title: '3C' },
  { id: 'indoor', icon: 'home', title: '室内' },
  { id: 'others', icon: 'dots', title: '其他' }
]
</script>

<template>

  <main class="h-screen overflow-y-auto">
    <div class="pt-15">
      <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
    </div>
    <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false"
      aria-controls="fullscreen-modal" data-overlay="#fullscreen-modal">Fullscreen modal</button>

    <FullscreenModal id="fullscreen-modal" :tabs="tabs">
      <template #tabs="{ activeTab }">
        <div id="tabs-3c" role="tabpanel" aria-labelledby="tabs-item-3c" :class="{ 'hidden': activeTab !== '3c' }">
          <ImageWaterfall path="/3c-images.json" />
        </div>
        <div id="tabs-indoor" role="tabpanel" aria-labelledby="tabs-item-indoor"
          :class="{ 'hidden': activeTab !== 'indoor' }">
          <ImageWaterfall path="/indoor-images.json" />
        </div>
        <div id="tabs-others" role="tabpanel" aria-labelledby="tabs-item-others"
          :class="{ 'hidden': activeTab !== 'others' }">
          <ImageWaterfall path="/other-images.json" />
        </div>
      </template>
    </FullscreenModal>

  </main>

</template>
