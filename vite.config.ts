import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { RouteRecordRaw } from "vue-router";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: [
                {
                    src: "src/views",
                    extensions: [".vue"],
                    filePatterns: "**/*.layout",
                    path(filepath) {
                        return filepath
                            .slice(
                                filepath.lastIndexOf("src/views") +
                                    "src/views".length
                            )
                            .replace(/\/?_\w+\.layout\.vue/g, ".vue");
                    },
                },
                {
                    src: "src/views",
                    extensions: [".vue"],
                    filePatterns: "**/*View",
                    path(filepath) {
                        return filepath
                            .slice(
                                filepath.lastIndexOf("src/views") +
                                    "src/views".length
                            )
                            .replace("View.vue", "/index.vue")
                            .toLowerCase()
                            .replace("/home", "");
                    },
                },
                {
                    src: "src/views",
                    extensions: [".vue"],
                    filePatterns: "**/*.layout",
                    path(filepath) {
                        return filepath
                            .slice(
                                filepath.lastIndexOf("src/views") +
                                    "src/views".length
                            )
                            .replace(/\/?_\w+\.layout\.vue/g, "/[...index]");
                    },
                },
            ],
            importMode(filepath) {
                return filepath.indexOf(".layout.vue") > -1 ||
                    filepath === "@/components/NotFound.vue"
                    ? "sync"
                    : "async";
            },
            extendRoute(route) {
                if (route.path !== ":index(.*)") return;

                route.components.set("default", "@/components/NotFound.vue");
            },
        }),
        vue(),
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
