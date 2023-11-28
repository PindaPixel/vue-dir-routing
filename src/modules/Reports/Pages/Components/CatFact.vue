<script setup lang="ts">
const { text } = defineProps<{
    status: {
        verified: boolean;
    }
    user: string;
    text: string;
    source: string;
    updatedAt: string;
    type: string;
    createdAt: string;
    deleted: boolean;
    used: boolean;
}>()
</script>
<template>
    <div>
        {{ text }}
    </div>
</template>