<template>
  <div
    class="cursor-pointer relative rounded-box p-2.5 bg-base-100 group hover:bg-base-100/50 transition duration-500"
    aria-haspopup="dialog" aria-expanded="false" :aria-controls="modalId" :data-overlay="`#${modalId}`">
    <CardGradientBackground />
    <div class="flex flex-col gap-2 z-1 relative p-2">
      <h2 class="card-title">{{ title }}</h2>
      <slot></slot>
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