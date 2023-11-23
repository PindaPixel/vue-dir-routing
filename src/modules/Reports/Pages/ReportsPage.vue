<script setup lang="ts">
import { usei18nModule } from "@/Composables/Locale";

const translations = usei18nModule("Reports");
</script>

<template>
    <div v-if="translations">
        {{ translations.adminReports }}
    </div>
    <div v-if="!translations">Loading</div>
</template>
