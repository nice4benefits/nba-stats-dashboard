<script setup lang="ts">
import PageView from '@/views/PageView.vue'
import PlayerStats from '@/components/PlayerStats.vue'
</script>

<template>
  <PageView>
    <PlayerStats :id="+$route.params.id" />
  </PageView>
</template>
