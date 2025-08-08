<template>
  <div
    class="h-16 cursor-pointer relative rounded-box p-2.5 bg-base-100 group hover:bg-base-100/50 transition duration-500"
    aria-haspopup="dialog" aria-expanded="false" :aria-controls="modalId" :data-overlay="`#${modalId}`">
    <CardGradientBackground />
    <div class="flex gap-3 z-1 relative">
      <slot>
        <h2 class="card-title">{{ title }}</h2>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardGradientBackground from './CardGradientBackground.vue';

defineProps<{
  title?: string;
  modalId: string;
}>();
</script> 