<script setup lang="ts">
import { UnauthorizedError } from '@/router/error';

throw new UnauthorizedError('Access denied');
</script>

<template>
    Account page
</template>
