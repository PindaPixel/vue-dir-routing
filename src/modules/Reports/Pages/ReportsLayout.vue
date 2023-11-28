<script setup lang="ts">
import RouterViewErrorBoundary from "@/router/components/RouterViewErrorBoundary.vue";
</script>

<template>
    Hello from reports layout
    <RouterViewErrorBoundary>
    <template #error="{error}">
        {{ error.message }}
    </template>
  </RouterViewErrorBoundary>
</template>
