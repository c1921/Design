<template>
  <div>
    <Card :modalId="modalId" :title="title" />

    <FullscreenModal :id="modalId" :tabs="tabs">
      <template #tabs="{ activeTab }">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :id="`tabs-${tab.id}`"
          role="tabpanel"
          :aria-labelledby="`tabs-item-${tab.id}`"
          :class="{ 'hidden': activeTab !== tab.id }">
          <ImageWaterfall :path="tab.path" />
        </div>
      </template>
    </FullscreenModal>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';
import FullscreenModal from './FullscreenModal.vue';
import ImageWaterfall from './ImageWaterfall.vue';
import type { GalleryTabItem } from '../types/global';

interface ImageGalleryProps {
  modalId?: string;
  title?: string;
  tabs?: GalleryTabItem[];
}

const props = withDefaults(defineProps<ImageGalleryProps>(), {
  modalId: 'fullscreen-modal',
  title: 'Images',
  tabs: () => [
    { id: '3c', icon: 'device-laptop', title: '3C', path: '/3c-images.json' },
    { id: 'indoor', icon: 'home', title: '室内', path: '/indoor-images.json' },
    { id: 'others', icon: 'dots', title: '其他', path: '/other-images.json' }
  ]
});

// 解构 props
const { modalId, title, tabs } = props;
</script>