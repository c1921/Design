<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { TabItem } from '../types/global'

// 泛型接口，允许接受任何扩展了 TabItem 的类型
interface FullscreenModalProps<T extends TabItem = TabItem> {
  id: string
  title?: string
  tabs?: T[]
}

const props = defineProps<FullscreenModalProps>()

const activeTab = ref(props.tabs && props.tabs.length > 0 ? props.tabs[0].id : '')
</script>

<template>
  <div :id="id" class="overlay modal overlay-open:opacity-100 overlay-open:duration-300 hidden" role="dialog" tabindex="-1">
    <div class="modal-dialog max-w-none">
      <div class="modal-content h-full max-h-none justify-between">
        <div class="modal-header">
          <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close"
            :data-overlay="`#${id}`">
            <span class="icon-[tabler--x] size-4"></span>
          </button>
        </div>
        <div class="modal-body h-1 overflow-y-auto grow">
          <div class="container mx-auto px-4">
            <template v-if="tabs && tabs.length > 0">
              <nav class="tabs tabs-bordered overflow-x-auto" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id" 
                  type="button" 
                  class="tab active-tab:tab-active" 
                  :class="{ 'active': activeTab === tab.id }"
                  :id="`tabs-item-${tab.id}`" 
                  :data-tab="`#tabs-${tab.id}`" 
                  :aria-controls="`tabs-${tab.id}`" 
                  role="tab" 
                  :aria-selected="activeTab === tab.id"
                  @click="activeTab = tab.id"
                >
                  <span :class="`icon-[tabler--${tab.icon}] size-5 shrink-0 me-2`"></span>
                  {{ tab.title }}
                </button>
              </nav>

              <div class="mt-3">
                <slot name="tabs" :activeTab="activeTab"></slot>
              </div>
            </template>
            <slot v-else></slot>
          </div>
        </div>
        <div class="modal-footer pt-4">
          <button type="button" class="btn" aria-label="Close" :data-overlay="`#${id}`">Close</button>
        </div>
      </div>
    </div>
  </div>
</template> 