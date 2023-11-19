<script setup lang="ts">
import { UnauthorizedError } from '@/router/error';

    throw new UnauthorizedError("Access denied.");
</script>
<template>
    I should never be rendered
</template>