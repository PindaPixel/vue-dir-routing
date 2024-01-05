<script setup lang="ts">
import RouterViewErrorBoundary from '@/router/components/RouterViewErrorBoundary.vue';
</script>

<template>
    Hello from reports layout
    <RouterViewErrorBoundary>
        <template #error="{ error }">
            {{ error.message }}
        </template>
        <template #default="{ component }">
            <Suspense>
                <component :is="component" />
                <template #fallback>
                    <p>Loading cat facts...</p>
                </template>
            </Suspense>
        </template>
    </RouterViewErrorBoundary>
</template>
