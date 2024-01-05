<script setup lang="ts">
const { text } = defineProps<{ text: string }>();
</script>

<template>
    <div>
        {{ text }}
    </div>
</template>
