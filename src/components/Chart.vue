<script setup lang="ts">
import { ref } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { ChartData } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{
  legend: string
  labels: string[]
  data: number[]
}>()

const testData = ref<ChartData<'bar'>>({
  labels: props.labels,
  datasets: [
    {
      label: props.legend,
      data: props.data,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B']
    }
  ]
})
</script>

<template>
  <div
    class="col-span-full sm:col-span-6 xl:col-span-3 p-5 bg-white shadow-lg rounded-sm border border-gray-200"
  >
    <BarChart :chart-data="testData" />
  </div>
</template>
