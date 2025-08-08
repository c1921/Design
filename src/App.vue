<script setup lang="ts">
import ImageWaterfall from './components/ImageWaterfall.vue'
import { onMounted } from 'vue';
onMounted(() => {
  setTimeout(() => window.HSStaticMethods.autoInit(), 100)
});
</script>

<template>

  <main class="h-screen overflow-y-auto">
    <div class="pt-15">
      <h1 class="text-center text-7xl font-bold">MAIN TITLE</h1>
    </div>
    <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false"
      aria-controls="fullscreen-modal" data-overlay="#fullscreen-modal">Fullscreen modal</button>

    <div id="fullscreen-modal" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden"
      role="dialog" tabindex="-1">
      <div class="modal-dialog max-w-none">
        <div class="modal-content h-full max-h-none justify-between">
          <div class="modal-header">
            <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
              data-overlay="#fullscreen-modal">
              <span class="icon-[tabler--x] size-4"></span>
            </button>
          </div>
          <div class="modal-body h-1 overflow-y-auto grow">
            <div class="container mx-auto px-4">
              <!-- 传入本地 JSON 文件路径（必须是 public 路径或远程） -->
              <ImageWaterfall path="/imageList.json" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" aria-label="Close" data-overlay="#fullscreen-modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </main>

</template>
