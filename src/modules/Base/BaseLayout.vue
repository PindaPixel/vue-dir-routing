<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import RouterViewErrorBoundary from '../../router/components/RouterViewErrorBoundary.vue';
</script>

<template>
    <header>
        <img alt="Vue logo" :class="$style.logo" src="@/assets/logo.svg" width="125" height="125" />

        <div :class="$style.wrapper">
            <HelloWorld msg="You did it!" />

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/account/login">Login</RouterLink>
                <RouterLink to="/notfound">404</RouterLink>
                <RouterLink to="/check/reports/capacity">Unauthorized</RouterLink>
            </nav>
        </div>
    </header>
    <main :class="$style.main">
        <RouterViewErrorBoundary>
            <template #error="{ error }">
                {{ error.message }}
            </template>
            <template #default="{ component }">
                <Suspense>
                    <component :is="component" />
                </Suspense>
            </template>
        </RouterViewErrorBoundary>
    </main>
</template>

<style module>
.main {
    view-transition-name: page-transition;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
}

@keyframes fade-out {
    to {
        opacity: 0;
    }
}

@keyframes slide-from-right {
    from {
        transform: translateX(30px);
    }
}

@keyframes slide-to-left {
    to {
        transform: translateX(-30px);
    }
}


::view-transition-old(page-transition) {
    animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
    
}

::view-transition-new(page-transition) {
    animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
    
}

header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}</style>