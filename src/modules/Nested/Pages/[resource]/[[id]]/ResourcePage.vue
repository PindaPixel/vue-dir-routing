<script setup lang="ts">
import { useRoute } from 'vue-router/auto';

const route = useRoute('nested/:resource/:id?');
</script>

<template>
    <RouterLink
        :to="{ name: 'nested/:resource/:id?', params: { resource: 'One', id: null } }"
    >
        /One
    </RouterLink>
    <RouterLink
        :to="{ name: 'nested/:resource/:id?', params: { resource: 'Two', id: null } }"
    >
        /Two
    </RouterLink>
    <RouterLink
        :to="{ name: 'nested/:resource/:id?', params: { resource: 'One', id: 1 } }"
    >
        /One/1
    </RouterLink>

    <div>{{ route.params.resource }}</div>
    <div>{{ route.params.id }}</div>
</template>
