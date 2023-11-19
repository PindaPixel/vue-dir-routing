<script setup lang="ts">
import { useRoute } from 'vue-router/auto';

const { name } = useRoute("//[[name]]/").params;
</script>
<template>
    Hello {{ name || "Unnamed" }}
</template>