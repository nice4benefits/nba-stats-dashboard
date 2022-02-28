<script setup lang="ts">
import { globalConfig } from '@/symbols'
import type { Averages } from '@/types'
import { computed, inject } from 'vue'
import { useFetch } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { useTopPlayersAveragesStore } from '@/stores/topPlayersAverages'
import Chart from '@/components/Chart.vue'
import LoaderView from '@/views/LoaderView.vue'
import ErrorView from '@/views/ErrorView.vue'

const props = defineProps<{
  id: number
}>()

const playersURL = inject(globalConfig)?.playersURL
const seasonAveragesURL = inject(globalConfig)?.seasonAveragesURL

const playerURL = computed(() => `${playersURL}/${props.id}`)
const playerAveragesURL = computed(
  () => `${seasonAveragesURL}?player_ids[]=${props.id}`
)

const {
  data: playerData,
  error: playerError,
  isFetching: isPlayerFetching
} = useFetch(playerURL, { refetch: true }).json()

const {
  data: averageData,
  error: averageError,
  isFetching: isAverageFetching
} = useFetch(playerAveragesURL, { refetch: true }).json()

const isLoading = computed(
  () => isPlayerFetching.value || isAverageFetching.value
)

const isError = computed(() => playerError.value || averageError.value)

const hasPlayerData = computed(
  () => playerData.value && !isPlayerFetching.value
)

const hasAverageData = computed(
  () => averageData.value && !isAverageFetching.value
)

const playerFullName = computed(
  () => `${playerData.value.first_name} ${playerData.value.last_name}`
)

const labels = computed(() => [
  playerFullName.value,
  'M. Jordan (1996)',
  'L. James (2017)'
])

const averagesStore = useTopPlayersAveragesStore()

const getDataOfField = (field: keyof Averages): number[] => [
  averageData.value.data[0][field],
  averagesStore.mjordan[field],
  averagesStore.ljames[field]
]
</script>

<template>
  <LoaderView v-if="isLoading" />

  <ErrorView v-if="isError">
    <template v-if="playerData.error">
      {{ playerData.error.message }}
    </template>
    <template v-else>
      {{ averageData.error.message }}
    </template>
  </ErrorView>

  <template v-if="hasPlayerData && hasAverageData">
    <h4
      class="col-span-full px-4 sm:px-6 uppercase text-gray-600 font-semibold"
    >
      {{ playerData.first_name }} {{ playerData.last_name }} &mdash;
      {{ playerData.team.full_name }}
    </h4>

    <template v-if="averageData.data.length">
      <template
        v-for="{ legend, abbr } in [
          { legend: 'Points', abbr: 'pts' },
          { legend: 'Assists', abbr: 'ast' },
          { legend: 'Field Goals Made', abbr: 'fgm' },
          { legend: 'Three-Point Goals Made', abbr: 'fg3m' }
        ]"
        :key="abbr"
      >
        <Chart :legend="legend" :labels="labels" :data="getDataOfField(abbr)" />
      </template>
    </template>

    <LoaderView v-else>
      <p>No data for this player for season 2021.</p>
      <p>Choose different player.</p>
      <p class="mt-2">
        <RouterLink
          :to="{
            name: 'player',
            params: { firstName: 'Stephen', lastName: 'Curry', id: 115 }
          }"
          class="bg-gray-800 p-2 border border-gray-200 text-white text-sm"
        >
          Show me
        </RouterLink>
      </p>
    </LoaderView>
  </template>
</template>
