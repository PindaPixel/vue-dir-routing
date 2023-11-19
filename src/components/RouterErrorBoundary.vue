<script setup lang="ts">
import { NotFoundError, UnauthorizedError } from "@/router/error";
import { ref, onErrorCaptured } from "vue";
import { useRouter } from "vue-router/auto";

type RouteError = UnauthorizedError | NotFoundError;

const caughtError = ref<RouteError | undefined>();

onErrorCaptured((e) => {
    if (e instanceof UnauthorizedError || e instanceof NotFoundError) {
        caughtError.value = e;
        return false;
    }

    return true;
});

useRouter().afterEach(() => {
    caughtError.value = undefined;
});

</script>
<template>
    <RouterView  v-if="!caughtError" />
    <slot v-if="!!caughtError" name="error" :error="caughtError"></slot>
</template>
