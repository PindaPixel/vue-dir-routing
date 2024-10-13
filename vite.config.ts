import { URL, fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import Macros from 'unplugin-macros/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { type Plugin, defineConfig } from 'vite';

import { configDefaults } from 'vitest/config';

import routerOptions from './config/routing';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        Macros(),
        VueRouter(routerOptions) as Plugin<any>,
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        manifest: true,
    },
});
