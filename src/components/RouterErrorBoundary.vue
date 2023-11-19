<script setup lang="ts">
import { NotFoundError, UnauthorizedError } from "@/router/error";
import { ref, onErrorCaptured } from "vue";
import { useRoute } from "vue-router";

const error = ref<[UnauthorizedError, string] | null>(null);
const route =useRoute();

onErrorCaptured((e) => {
    if (e instanceof UnauthorizedError || e instanceof NotFoundError) {
        error.value = [e, route.path];
        console.log(error.value);
        return false;
    }

    return true;
});
</script>
<template>
    <RouterView  v-if="!error || error[1] !== route.path" />
    <slot v-if="error && error[1] === route.path" name="error" :error="error[0]"></slot>
</template>
