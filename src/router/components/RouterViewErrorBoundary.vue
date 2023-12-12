<script setup lang="ts">
import { NotFoundError, UnauthorizedError } from "@/router/error";
import { ref, onErrorCaptured } from "vue";
import { useRouter } from "vue-router/auto";

type RouteError = UnauthorizedError | NotFoundError;

const error = ref<RouteError | undefined>();

onErrorCaptured((e) => {
    if (e instanceof UnauthorizedError || e instanceof NotFoundError) {
        error.value = e;
        return false;
    }

    return true;
});

useRouter().afterEach(() => {
    error.value = undefined;
});
</script>
<template>
    <RouterView v-if="!error" v-slot="{ Component }">
        <slot name="default" :component="Component">
            <component :is="Component" />
        </slot>
    </RouterView>
    <slot v-if="error" name="error" :error="error" />
</template>
