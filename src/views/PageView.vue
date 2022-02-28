<script setup lang="ts">
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { globalConfig } from '@/symbols'
import SidebarView from '@/views/SidebarView.vue'
import HeaderView from '@/views/HeaderView.vue'

const props = defineProps<{
  pageTitle?: string
}>()

const routeTitle = useRoute()?.meta?.pageTitle || ''
const defaultTitle = inject(globalConfig)?.defaultPageTitle || ''
const title = routeTitle || props.pageTitle || defaultTitle

const sidebarOpen = ref(false)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarView
      :sidebar-open="sidebarOpen"
      @close-sidebar="sidebarOpen = false"
    />

    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <HeaderView
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      >
        🏀 {{ defaultTitle }}
      </HeaderView>

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
          <h2 class="text-md font-semibold text-gray-800 mb-4 px-4 sm:px-6">
            {{ title }}
          </h2>
          <div class="grid grid-cols-12 gap-6">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
