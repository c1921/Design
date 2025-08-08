<template>
  <div>
    <Card :modalId="modalId" :title="title" />

    <FullscreenModal :id="modalId" :tabs="tabs">
      <template #tabs="{ activeTab }">
        <div :id="`tabs-${tabs[0].id}`" role="tabpanel" :aria-labelledby="`tabs-item-${tabs[0].id}`"
          :class="{ 'hidden': activeTab !== tabs[0].id }">
          <ImageWaterfall path="/3c-images.json" />
        </div>
        <div :id="`tabs-${tabs[1].id}`" role="tabpanel" :aria-labelledby="`tabs-item-${tabs[1].id}`"
          :class="{ 'hidden': activeTab !== tabs[1].id }">
          <ImageWaterfall path="/indoor-images.json" />
        </div>
        <div :id="`tabs-${tabs[2].id}`" role="tabpanel" :aria-labelledby="`tabs-item-${tabs[2].id}`"
          :class="{ 'hidden': activeTab !== tabs[2].id }">
          <ImageWaterfall path="/other-images.json" />
        </div>
      </template>
    </FullscreenModal>
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue';
import FullscreenModal from './FullscreenModal.vue';
import ImageWaterfall from './ImageWaterfall.vue';

// 直接使用defineProps，不需要额外的变量
const { 
  modalId = 'fullscreen-modal', 
  title = 'Images'
} = defineProps<{
  modalId?: string;
  title?: string;
}>();

const tabs = [
  { id: '3c', icon: 'device-laptop', title: '3C' },
  { id: 'indoor', icon: 'home', title: '室内' },
  { id: 'others', icon: 'dots', title: '其他' }
];
</script> 