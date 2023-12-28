import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import routerOptions from "./config/routing";
import Macros from "unplugin-macros/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter(routerOptions),
        vue(),
        // Macros(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        manifest: true,
    },
    test: {
        environment: "jsdom",
        exclude: [...configDefaults.exclude, "e2e/*"],
        root: fileURLToPath(new URL("./", import.meta.url)),
    },
});
