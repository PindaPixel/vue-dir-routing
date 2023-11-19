import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";

let i = 0;

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
            getRouteName(node) {
                const { components, path, pathSegment, rawSegment } = node.value;
                console.log({
                    components, path, pathSegment, rawSegment
                })

                const defaultComponent = components.get("default");

                if (defaultComponent && defaultComponent.indexOf(".layout.vue") > -1) {
                    if (path === "/") return "root-layout";
                    // remove leading slash
                    return path.slice(1) + "-layout"
                }

                if (path === "/") return "home";
                
                return path.slice(1).replace(":index(.*)", "catch-all");
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
