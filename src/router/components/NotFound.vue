<script setup lang="ts">
import { NotFoundError } from '@/router/error';

throw new NotFoundError('Page does not exist.');
</script>

<template>
    I should never be rendered
</template>
