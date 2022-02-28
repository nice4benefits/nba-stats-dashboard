<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const prevPage = computed(() => props.currentPage - 1)
const nextPage = computed(() => props.currentPage + 1)

const prevLabel = '← prev'
const nextLabel = 'next →'
</script>

<template>
  <nav class="col-span-full px-4 sm:px-6">
    <ul
      class="grid grid-flow-col sm:auto-cols-max items-center justify-start gap-2"
    >
      <li>
        <RouterLink
          v-if="prevPage > 0"
          :to="{ name: 'players', params: { page: prevPage } }"
          class="bg-gray-800 p-2 border border-gray-200 text-white text-sm"
        >
          {{ prevLabel }}
        </RouterLink>
        <span v-else class="text-gray-400 text-sm">{{ prevLabel }}</span>
      </li>
      <li class="px-4">{{ currentPage }} / {{ totalPages }}</li>
      <li>
        <RouterLink
          v-if="nextPage < totalPages"
          :to="{ name: 'players', params: { page: nextPage } }"
          class="bg-gray-800 p-2 border border-gray-200 text-white text-sm"
        >
          {{ nextLabel }}
        </RouterLink>
        <span v-else class="text-gray-400 text-sm">{{ prevLabel }}</span>
      </li>
    </ul>
  </nav>
</template>
