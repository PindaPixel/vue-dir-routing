<script setup lang="ts">
import { useRoute } from 'vue-router/auto';

const { name } = useRoute("//[name]/greeting/").params;
</script>
<template>
    Hello {{ name }}
</template>