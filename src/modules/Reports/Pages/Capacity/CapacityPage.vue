<script setup lang="ts">
import CatFact from "../Components/CatFact.vue";
import { UnauthorizedError } from '@/router/error';

throw new UnauthorizedError("Access denied");

const data = await (await fetch("https://cat-fact.herokuapp.com/facts/")).json();
</script>

<template>

    <CatFact v-bind="data[0]" />
</template>
