<script setup lang="ts">
import PageView from '@/views/PageView.vue'
import Players from '@/components/Players.vue'
</script>

<template>
  <PageView>
    <Players :page="+$route.params.page" />
  </PageView>
</template>
