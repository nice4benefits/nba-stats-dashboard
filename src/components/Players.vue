<script setup lang="ts">
import { computed, inject } from 'vue'
import { useFetch } from '@vueuse/core'
import { globalConfig } from '@/symbols'
import LoaderView from '@/views/LoaderView.vue'
import ErrorView from '@/views/ErrorView.vue'
import Pagination from '@/components/Pagination.vue'
import PlayersView from '@/views/PlayersView.vue'

const props = defineProps<{
  page: number
}>()

const playersURL = inject(globalConfig)?.playersURL

const pageNumber = computed(() => (props.page === 0 ? 1 : props.page))
const pagedURL = computed(() => `${playersURL}?page=${pageNumber.value}`)

const { data, error, isFetching } = useFetch(pagedURL, { refetch: true }).json()
</script>

<template>
  <LoaderView v-if="isFetching" />

  <LoaderView v-else-if="data && data.data.length === 0">
    No data found.
  </LoaderView>

  <ErrorView v-if="error">{{ error.message }}</ErrorView>

  <Pagination
    v-if="data && data.data.length && !isFetching"
    :current-page="+data.meta.current_page"
    :total-pages="+data.meta.total_pages"
  />

  <PlayersView
    v-if="data && data.data.length && !isFetching"
    :players="data.data"
  />

  <Pagination
    v-if="data && data.data.length && !isFetching"
    :current-page="+data.meta.current_page"
    :total-pages="+data.meta.total_pages"
  />
</template>
