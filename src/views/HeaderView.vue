<script setup lang="ts">
defineProps<{
  sidebarOpen: boolean
}>()
</script>

<template>
  <header class="sticky top-0 bg-white border-b border-gray-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <!-- Left side -->
        <div class="flex">
          <!-- Hamburger button -->
          <button
            class="text-gray-500 hover:text-gray-600 lg:hidden"
            @click.stop="$emit('toggle-sidebar')"
            aria-controls="sidebar"
            :aria-expanded="sidebarOpen"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-3">
          <h1 class="text-lg md:text-xl text-gray-800 font-bold mb-1">
            <slot />
          </h1>
        </div>
      </div>
    </div>
  </header>
</template>
