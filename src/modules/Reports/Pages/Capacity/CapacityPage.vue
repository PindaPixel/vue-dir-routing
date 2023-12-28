<script setup lang="ts">
import CatFact from "../../Components/CatFact.vue";
import useCatFact from "../../Composables/CatFact";
const fact = await useCatFact();
</script>

<template>
    <CatFact v-bind="fact" />
</template>
